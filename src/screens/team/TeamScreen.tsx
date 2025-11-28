import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Text, Button, Snackbar, Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { SNACKBAR_COLORS } from "../../constants";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { GeolocationData } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONFIG, STORAGE_KEYS } from "../../constants";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useTeamMembers } from "../../hooks/useTeamMembers";

const TeamScreen = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null,
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const { user } = useCurrentUser();
  const { data: teamMembersData, refetch } = useTeamMembers();

  const filteredTeamMembers =
    teamMembersData?.filter((member) => {
      if (!searchQuery) return true;
      const fullName = member.user.fullName?.toLowerCase() || "";
      const staffId = member.user.staffId?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return fullName.includes(query) || staffId.includes(query);
    }) || [];

  React.useEffect(() => {
    requestPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const requestPermissions = async () => {
    try {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus.granted);

      if (!cameraStatus.granted) {
        console.warn("Camera permission not granted");
      }
    } catch (error) {
      console.warn("Error requesting permissions:", error);
    }
  };

  const getCurrentLocation = useCallback(async (): Promise<GeolocationData> => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy || undefined,
      timestamp: location.timestamp,
    };
  }, []);

  const getLocationForVerification =
    useCallback(async (): Promise<GeolocationData | null> => {
      try {
        const location = await getCurrentLocation();
        setGeolocation(location);
        return location;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to get location";
        console.warn("Geolocation error:", errorMessage);
        return null;
      }
    }, [getCurrentLocation]);

  const openCamera = useCallback(async (memberId: string) => {
    try {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraStatus.granted) {
        setSnackbarMessage("Camera permission is required to take photos");
        setSnackbarType("error");
        setSnackbarVisible(true);
        return false;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
        allowsEditing: false,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets?.[0]) {
        setSelectedMemberId(memberId);
        setCapturedImage(result.assets[0].uri);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error taking picture:", error);
      setSnackbarMessage("Failed to capture image");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return false;
    }
  }, []);

  const handleMemberPress = useCallback(
    async (memberId: string) => {
      await openCamera(memberId);
    },
    [openCamera],
  );

  const retakePhoto = useCallback(async () => {
    if (selectedMemberId) {
      await openCamera(selectedMemberId);
    }
  }, [selectedMemberId, openCamera]);

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Profile" as never);
  }, [navigation]);

  const verifyFace = useCallback(async () => {
    if (!capturedImage || !selectedMemberId) return;

    setIsVerifying(true);

    try {
      if (!locationPermission) {
        const locationStatus =
          await Location.requestForegroundPermissionsAsync();
        setLocationPermission(locationStatus.granted);
        if (!locationStatus.granted) {
          setSnackbarMessage("Location permission is required.");
          setSnackbarType("error");
          setSnackbarVisible(true);
          setIsVerifying(false);
          return;
        }
      }

      const locationData = await getLocationForVerification();

      if (!locationData) {
        setSnackbarMessage("Unable to get location. Please try again.");
        setSnackbarType("error");
        setSnackbarVisible(true);
        setIsVerifying(false);
        return;
      }
      const token = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);

      const formData = new FormData();
      formData.append("picture", {
        uri: capturedImage,
        type: "image/jpeg",
        name: "face_verification.jpg",
      } as unknown as Blob);
      formData.append("latitude", locationData.latitude.toString());
      formData.append("longitude", locationData.longitude.toString());
      if (locationData.accuracy) {
        formData.append("accuracy", locationData.accuracy.toString());
      }
      if (locationData.timestamp) {
        formData.append("timestamp", locationData.timestamp.toString());
      }

      const response = await fetch(
        `${CONFIG.REST_API_URL}/posting/${selectedMemberId}/verify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            client_id: CONFIG.CLIENT_ID,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSnackbarMessage("Face verified successfully");
        setSnackbarType("success");
        setSelectedMemberId("");
        setCapturedImage(null);
        setGeolocation(null);
        refetch();
      } else {
        console.log(data);
        setSnackbarMessage(
          data.detail || data.message || "Verification failed",
        );
        setSnackbarType("error");
      }
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Verification error:", error);
      setSnackbarMessage("Verification failed. Please try again.");
      setSnackbarType("error");
      setSnackbarVisible(true);
    } finally {
      setIsVerifying(false);
    }
  }, [
    capturedImage,
    selectedMemberId,
    locationPermission,
    getLocationForVerification,
    geolocation,
  ]);

  const renderTeamMember = ({
    item,
  }: {
    item: (typeof filteredTeamMembers)[0];
  }) => (
    <TouchableOpacity
      style={styles.memberCard}
      onPress={() => handleMemberPress(item.id)}
      disabled={isVerifying}
    >
      {item.user.picture?.uri ? (
        <Image
          source={{ uri: item.user.picture.uri }}
          style={styles.memberImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.memberAvatarFallback}>
          <Text style={styles.memberAvatarText}>
            {item.user.fullName?.[0]?.toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.memberInfo}>
        <Text style={styles.memberName} numberOfLines={1}>
          {item.user.fullName}
        </Text>
        <Text style={styles.memberId} numberOfLines={1}>
          {item.user.staffId}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#666" />
            </TouchableOpacity>
            <Text variant="headlineSmall" style={styles.titleText}>
              Add Attendance
            </Text>
            <View style={styles.headerActions}>
              {user?.picture?.uri ? (
                <Avatar.Image
                  size={50}
                  source={{
                    uri: user.picture.uri,
                  }}
                  style={styles.profileAvatar}
                  onTouchEnd={handleProfilePress}
                />
              ) : (
                <TouchableOpacity
                  style={styles.avatarFallback}
                  onPress={handleProfilePress}
                >
                  <Text style={styles.avatarText}>
                    {user?.fullName?.[0]?.toUpperCase() || "?"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {!capturedImage && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search team members..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          )}

          {capturedImage && (
            <View style={styles.photoSection}>
              <Text variant="titleLarge" style={styles.photoTitle}>
                Captured Photo
              </Text>
              <Image
                source={{ uri: capturedImage }}
                style={styles.capturedImage}
                resizeMode="cover"
              />

              <View style={styles.verifyButtons}>
                <Button
                  mode="contained"
                  onPress={verifyFace}
                  loading={isVerifying}
                  disabled={isVerifying || !selectedMemberId}
                  style={styles.verifyButton}
                >
                  {isVerifying ? "Verifying..." : "Verify Face"}
                </Button>
                <Button
                  mode="outlined"
                  onPress={retakePhoto}
                  disabled={isVerifying}
                  style={styles.retakeButton}
                >
                  Retake Photo
                </Button>
              </View>
            </View>
          )}

          {!capturedImage && (
            <FlatList
              data={filteredTeamMembers}
              keyExtractor={(item) => item.id}
              renderItem={renderTeamMember}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.gridContainer}
              style={styles.membersGrid}
              ListEmptyComponent={
                searchQuery.trim() ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No Results Found</Text>
                    <Text style={styles.emptySubtitle}>
                      No team members match &quot;{searchQuery}&quot;
                    </Text>
                  </View>
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No Team Members</Text>
                    <Text style={styles.emptySubtitle}>
                      Your team members will appear here once assigned
                    </Text>
                  </View>
                )
              }
            />
          )}
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={{
          backgroundColor:
            snackbarType === "success"
              ? SNACKBAR_COLORS.SUCCESS.background
              : SNACKBAR_COLORS.ERROR.background,
        }}
      >
        <Text
          style={{
            color:
              snackbarType === "success"
                ? SNACKBAR_COLORS.SUCCESS.text
                : SNACKBAR_COLORS.ERROR.text,
          }}
        >
          {snackbarMessage}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  centerContainer: {
    alignItems: "center",
    maxWidth: 800,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  reportButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  profileAvatar: {
    backgroundColor: "#f0f0f0",
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },

  photoSection: {
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  photoTitle: {
    marginBottom: 16,
    color: "#000",
  },
  capturedImage: {
    width: 400,
    height: 400,
    marginBottom: 16,
  },
  verifyButtons: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
  },
  verifyButton: {
    maxWidth: 150,
  },
  retakeButton: {
    maxWidth: 150,
  },
  gridContainer: {
    paddingVertical: 16,
  },
  membersGrid: {
    width: "100%",
  },
  memberCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    alignItems: "center",
  },
  memberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  memberAvatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  memberAvatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  memberInfo: {
    alignItems: "center",
  },
  memberName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  memberId: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },

  titleText: {
    textAlign: "center",
    color: "#000",
  },
});

export default TeamScreen;

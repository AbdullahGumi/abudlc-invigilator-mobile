import React, { useState, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Snackbar, FAB, Avatar } from "react-native-paper";
import { Camera, CameraView } from "expo-camera";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

import { GeolocationData } from "../../types";
import SelectTeamMember from "../../components/SelectTeamMember";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONFIG, STORAGE_KEYS } from "../../constants";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useTeamMembers } from "../../hooks/useTeamMembers";

const VerificationScreen: React.FC = () => {
  const [postingId, setPostingId] = useState<string>("");
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null,
  );
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success",
  );
  const [attendanceExpanded, setAttendanceExpanded] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation();
  const { user } = useCurrentUser();
  const {
    data: teamMembersData,
    loading: teamMembersLoading,
    refetch,
  } = useTeamMembers();
  const teamMembers = teamMembersData;

  React.useEffect(() => {
    requestPermissions();
  }, []);

  React.useEffect(() => {
    if (postingId && !isCameraActive && !capturedImage) {
      startCameraImmediately();
    }
  }, [postingId]);

  React.useEffect(() => {
    if (isCameraActive) {
      setAttendanceExpanded(false);
    }
  }, [isCameraActive]);

  const requestPermissions = async () => {
    try {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.granted);

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus.granted);
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

  const startCameraImmediately = useCallback(async () => {
    if (!cameraPermission) {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.granted);
      if (!cameraStatus.granted) {
        setSnackbarMessage(
          "Camera permission is required for face verification. Please grant permission and try again.",
        );
        setSnackbarType("error");
        setSnackbarVisible(true);
        return;
      }
    }

    setCapturedImage(null);
    setIsCameraActive(true);
  }, [cameraPermission]);

  const handleFabPress = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });

      if (photo?.uri) {
        setCapturedImage(photo.uri);
        setIsCameraActive(false);
      } else {
        throw new Error("Failed to capture image");
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      setSnackbarMessage("Failed to capture image");
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  }, []);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setIsCameraActive(true);
  }, []);

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Profile" as never);
  }, [navigation]);

  const verifyFace = useCallback(async () => {
    if (!capturedImage || !postingId) return;

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
        `${CONFIG.REST_API_URL}/posting/${postingId}/verify`,
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
        setPostingId("");
        setCapturedImage(null);
        setGeolocation(null);
        setResetTrigger((prev) => prev + 1);
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
    postingId,
    locationPermission,
    getLocationForVerification,
    geolocation,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContainer}>
          <View style={styles.headerContainer}>
            <Text variant="headlineLarge" style={styles.mainTitle}>
              Face Verification
            </Text>
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

          <SelectTeamMember
            key={resetTrigger}
            onChange={(value) => {
              setPostingId(value);
              if (value === "") {
                setIsCameraActive(false);
                setCapturedImage(null);
              }
            }}
            teamMembers={teamMembers}
            loading={teamMembersLoading}
            disabled={isVerifying}
          />

          {!capturedImage && isCameraActive && (
            <Text variant="bodyLarge" style={styles.instructionText}>
              {" "}
              Capture a photo of the team member’s face to verify their
              identity.
            </Text>
          )}

          {isCameraActive && (
            <View style={styles.cameraSection}>
              <View style={styles.cameraContainer}>
                <CameraView
                  ref={cameraRef}
                  style={styles.camera}
                  facing="back"
                  mode="picture"
                  responsiveOrientationWhenOrientationLocked={false}
                />
              </View>
            </View>
          )}

          {capturedImage && (
            <View style={styles.photoSection}>
              <Text variant="titleLarge" style={styles.photoTitle}>
                Captured Photo
              </Text>
              <Image
                source={{ uri: capturedImage }}
                style={styles.capturedImage}
                resizeMode="contain"
              />

              <View style={styles.verifyButtons}>
                <Button
                  mode="contained"
                  onPress={verifyFace}
                  loading={isVerifying}
                  disabled={isVerifying || !postingId}
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

          {(() => {
            const attendanceRecords =
              teamMembersData?.flatMap((member) =>
                member.attendance.map((attendance) => ({
                  member,
                  attendance,
                })),
              ) || [];

            return attendanceRecords.length > 0 ? (
              <View style={styles.attendanceSection}>
                <TouchableOpacity
                  style={styles.attendanceHeader}
                  onPress={() => setAttendanceExpanded(!attendanceExpanded)}
                >
                  <Text variant="titleMedium" style={styles.attendanceTitle}>
                    Team Attendance ({attendanceRecords.length} records)
                  </Text>
                </TouchableOpacity>

                {attendanceExpanded && (
                  <View style={styles.attendanceList}>
                    {attendanceRecords
                      .sort(
                        (a, b) =>
                          new Date(b.attendance.createdAt).getTime() -
                          new Date(a.attendance.createdAt).getTime(),
                      )
                      .map(({ member, attendance }) => (
                        <View
                          key={`${member.id}-${attendance.id}`}
                          style={styles.attendanceCard}
                        >
                          <Image
                            source={{ uri: attendance.picture?.uri }}
                            style={styles.attendanceImage}
                            resizeMode="cover"
                          />
                          <View style={styles.attendanceDetails}>
                            <Text style={styles.attendanceName}>
                              {member.user.fullName}
                            </Text>
                            <Text style={styles.attendanceInfo}>
                              {member.user.staffId} -{" "}
                              {member?.user?.userRole?.role?.displayName}
                            </Text>
                            <Text style={styles.attendanceTime}>
                              {new Date(attendance.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ) : null;
          })()}
        </View>
      </ScrollView>

      {postingId && !capturedImage && (
        <FAB
          icon="camera"
          size="large"
          color="white"
          onPress={handleFabPress}
          style={styles.fab}
        />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={{
          backgroundColor: snackbarType === "success" ? "#4CAF50" : "#F44336",
        }}
      >
        {snackbarMessage}
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
    paddingTop: 24,
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
  mainTitle: {
    textAlign: "center",
    color: "#000",
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
  instructionText: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 8,
    color: "#666",
  },
  cameraSection: {
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  cameraContainer: {
    height: 300,
    overflow: "hidden",
    marginVertical: 16,
    width: "100%",
    maxWidth: 400,
  },
  camera: {
    flex: 1,
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
    width: 300,
    height: 300,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 50,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 50,
  },
  attendanceSection: {
    marginTop: 24,
    width: "100%",
    alignItems: "center",
  },
  attendanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    paddingVertical: 12,
    borderColor: "#e0e0e0",
    marginBottom: 5,
  },
  attendanceTitle: {
    marginBottom: 0,
    color: "#000",
  },
  attendanceList: {
    width: "100%",
    gap: 12,
  },
  attendanceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  attendanceImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 12,
  },
  attendanceDetails: {
    flex: 1,
  },
  attendanceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  attendanceInfo: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  attendanceTime: {
    fontSize: 12,
    color: "#888",
  },
});

export default VerificationScreen;

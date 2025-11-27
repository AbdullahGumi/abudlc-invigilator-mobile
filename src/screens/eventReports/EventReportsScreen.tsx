import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Text, Button, TextInput, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import useEventReports, {
  CreateEventReportInput,
} from "../../hooks/useEventReports";
import { SNACKBAR_COLORS } from "../../constants";

const EventReportsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getPostingId, createEventReport, uploadImages, isLoading } =
    useEventReports();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedImages, setSelectedImages] = useState<
    Array<{ uri: string; type: string; name: string }>
  >([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success",
  );

  const requestPermissions = useCallback(async () => {
    const [cameraPermission, libraryPermission] = await Promise.all([
      ImagePicker.requestCameraPermissionsAsync(),
      ImagePicker.requestMediaLibraryPermissionsAsync(),
    ]);

    return {
      camera: cameraPermission.granted,
      library: libraryPermission.granted,
    };
  }, []);

  const showImageSourceOptions = useCallback(() => {
    Alert.alert("Add Images", "Choose how you'd like to add images", [
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Choose from Gallery",
        onPress: addImages,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }, []);

  const addImages = useCallback(async () => {
    const permissions = await requestPermissions();

    if (!permissions.library) {
      Alert.alert(
        "Permission required",
        "Gallery access is required to select images.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.type || "image/jpeg",
        name: asset.fileName || `image_${Date.now()}.jpg`,
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  }, [requestPermissions]);

  const takePhoto = useCallback(async () => {
    const permissions = await requestPermissions();

    if (!permissions.camera) {
      Alert.alert("Permission required", "Camera permissions are required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      const asset = result.assets[0];
      const newImage = {
        uri: asset.uri,
        type: asset.type || "image/jpeg",
        name: asset.fileName || `photo_${Date.now()}.jpg`,
      };
      setSelectedImages((prev) => [...prev, newImage]);
    }
  }, [requestPermissions]);

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const postingId = await getPostingId();

      if (!postingId) {
        setSnackbarMessage(
          "Unable to get posting information. Please try again.",
        );
        setSnackbarType("error");
        setSnackbarVisible(true);
        return;
      }

      const input: CreateEventReportInput = {
        postingId,
        title: title.trim(),
        body: body.trim(),
      };

      const result = await createEventReport(input);

      if (result?.success && result.item) {
        if (selectedImages.length > 0) {
          const uploadSuccess = await uploadImages(
            result.item.id,
            selectedImages,
          );
          if (!uploadSuccess) {
            setSnackbarMessage(
              "Report created but image upload failed. You can try again later.",
            );
            setSnackbarType("error");
            setSnackbarVisible(true);
          }
        }

        setTitle("");
        setBody("");
        setSelectedImages([]);

        setSnackbarMessage(result.message || "Report submitted successfully");
        setSnackbarType("success");
        setSnackbarVisible(true);
      } else {
        setSnackbarMessage(result?.message || "Failed to create report");
        setSnackbarType("error");
        setSnackbarVisible(true);
      }
    } catch {
      setSnackbarMessage("Failed to submit report");
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  }, [title, body, selectedImages, createEventReport, uploadImages]);

  const handleHistoryPress = useCallback(() => {
    navigation.navigate("EventReportsHistory" as never);
  }, [navigation]);

  const isFormValid = title.trim().length > 0 && body.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#666" />
          </TouchableOpacity>
          <Text variant="headlineSmall" style={styles.mainTitle}>
            Event Reports
          </Text>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={handleHistoryPress}
          >
            <Ionicons name="time-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <Text variant="titleMedium" style={styles.formTitle}>
            Report an Event
          </Text>

          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Description"
            value={body}
            onChangeText={setBody}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={4}
          />

          <View style={styles.imageSection}>
            <Button
              mode="outlined"
              onPress={showImageSourceOptions}
              icon="camera-plus"
            >
              Add Images
            </Button>

            {selectedImages.length > 0 && (
              <View style={styles.selectedImagesGrid}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.selectedImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading || !isFormValid}
            style={styles.submitButton}
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </Button>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  mainTitle: {
    textAlign: "center",
    color: "#000",
  },
  historyButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  formCard: {
    marginTop: 10,
  },
  formTitle: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  imageSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  imageButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  imageButton: {
    flex: 1,
  },

  selectedImagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  selectedImage: {
    width: 100,
    height: 100,
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 12,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default EventReportsScreen;

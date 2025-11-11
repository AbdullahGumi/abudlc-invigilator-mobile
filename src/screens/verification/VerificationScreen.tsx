import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, StatusBar } from "react-native";
import { Text, Button, Snackbar, FAB } from "react-native-paper";
import { Camera, CameraView } from "expo-camera";
import * as Location from "expo-location";

import { Posting, GeolocationData, VerificationResponse } from "../../types";
import SelectTeamMember from "../../components/SelectTeamMember";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const cameraRef = useRef<CameraView>(null);

  const teamMembers: Posting[] = [
    {
      id: "1",
      user: {
        id: "1",
        fullName: "John Doe",
        staffId: "STF001",
        picture: {
          id: "pic1",
          thumbnailUri: "https://via.placeholder.com/100",
          uri: "https://via.placeholder.com/400",
        },
      },
    },
    {
      id: "2",
      user: {
        id: "2",
        fullName: "Jane Smith",
        staffId: "STF002",
        picture: {
          id: "pic2",
          thumbnailUri: "https://via.placeholder.com/100",
          uri: "https://via.placeholder.com/400",
        },
      },
    },
    {
      id: "3",
      user: {
        id: "3",
        fullName: "Mike Johnson",
        staffId: "STF003",
        picture: {
          id: "pic3",
          thumbnailUri: "https://via.placeholder.com/100",
          uri: "https://via.placeholder.com/400",
        },
      },
    },
    {
      id: "4",
      user: {
        id: "4",
        fullName: "Sarah Wilson",
        staffId: "STF004",
        picture: {
          id: "pic4",
          thumbnailUri: "https://via.placeholder.com/100",
          uri: "https://via.placeholder.com/400",
        },
      },
    },
  ];

  React.useEffect(() => {
    requestPermissions();
  }, []);

  React.useEffect(() => {
    if (postingId && !isCameraActive && !capturedImage) {
      startCameraImmediately();
    }
  }, [postingId]);

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

  const getLocationForVerification = useCallback(async (): Promise<GeolocationData | null> => {

    try {
      const location = await getCurrentLocation();
      setGeolocation(location);  
      return location; 
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get location";
      console.warn("Geolocation error:", errorMessage);
      return null; 
    } finally {
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

  const verifyFace = useCallback(async () => {
    if (!capturedImage || !postingId) return;

    setIsVerifying(true);

    try {
      if (!locationPermission) {
        const locationStatus = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(locationStatus.granted);
        if (!locationStatus.granted) {
          setSnackbarMessage(
            "Location permission is required.",
          );
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

      const formData = new FormData();
      formData.append("picture", {
        uri: capturedImage,
        type: "image/jpeg",
        name: "face_verification.jpg",
      } as any);
      formData.append("latitude", locationData.latitude.toString());
      formData.append("longitude", locationData.longitude.toString());
      if (locationData.accuracy) {
        formData.append("accuracy", locationData.accuracy.toString());
      }
      if (locationData.timestamp) {
        formData.append("timestamp", locationData.timestamp.toString());
      }

      // const response = await fetch(`${API_CONFIG.REST_API_URL}/posting/${postingId}/verify`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   body: formData
      // });

      const mockResponse: VerificationResponse = {
        success: true,
        message: "Face verification successful!",
      };

      if (mockResponse.success) {
        setSnackbarMessage("Face verified successfully");
        setSnackbarType("success");
        setPostingId("");
        setCapturedImage(null);
        setGeolocation(null);
      } else {
        setSnackbarMessage(mockResponse.detail || "Verification failed");
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
  }, [capturedImage, postingId, locationPermission, getLocationForVerification, geolocation]);
 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.centerContainer}>
          <Text variant="headlineLarge" style={styles.mainTitle}>
            Face Verification
          </Text>

          <SelectTeamMember
            value={postingId}
            onChange={setPostingId}
            teamMembers={teamMembers}
            loading={false}
          />

         {!capturedImage && <Text variant="bodyLarge" style={styles.instructionText}>
            {" "}
            Capture a photo of the team member’s face to verify their identity.
          </Text>}



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
        </View>
      </ScrollView>

      {postingId && !capturedImage && (
        <FAB
          icon="camera"
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
  header: {
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 60,
    marginLeft: "auto",
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
  mainTitle: {
    textAlign: "center",
    marginBottom: 24,
    color: "#000",
  },
  instructionText: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 8,
    color: "#666",
  },
  alert: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    width: "100%",
  },
  warningAlert: {
    backgroundColor: "#fff3e0",
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  successAlert: {
    backgroundColor: "#e8f5e8",
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    width: "100%",
  },
  alertText: {
    color: "#000",
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 8,
  },
  startButton: {
    marginBottom: 8,
  },
  cameraSection: {
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  cameraContainer: {
    height: 300,
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 16,
    width: "100%",
    maxWidth: 400,
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  captureButton: {
    flex: 1,
    maxWidth: 150,
  },
  cancelButton: {
    flex: 1,
    maxWidth: 150,
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
    borderRadius: 8,
    marginBottom: 16,
  },
  locationRequired: {
    color: "#d32f2f",
    marginBottom: 16,
    textAlign: "center",
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
  title: {
    color: "#1976d2",
    fontWeight: "600",
    marginBottom: 8,
  },
  permissionText: {
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 20,
  },
  permissionButton: {
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
    width: 60,height: 60,
    justifyContent: 'center',alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 50
  },
});

export default VerificationScreen;

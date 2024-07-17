import React, { useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";

export default function CameraScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const plants = route.params?.plants || [];
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={requestPermission}
          title="Grant Permission"
          style={{ backgroundColor: "#4caf50" }}
        />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImageUri(photo.uri);
      setLoading(true);
      setLoadingMessage("Processing image...");

      // Update loading messages at intervals
      setTimeout(() => setLoadingMessage("Analyzing image..."), 2000);
      setTimeout(() => setLoadingMessage("Please wait..."), 6000);
      setTimeout(() => setLoadingMessage("Almost there..."), 6000);

      // Call Pl@ntNet API with the taken picture
      const formData = new FormData();
      formData.append("images", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      try {
        const response = await fetch(
          "https://my-api.plantnet.org/v2/identify/all?api-key=2b10XVXIHqjriKvesfSL12JPpu",
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          }
        );

        const result = await response.json();
        const matchedPlant = findMatchingPlant(result, plants);

        if (matchedPlant) {
          navigation.navigate("AddPlantForm", { plant: matchedPlant });
        } else {
          setModalType("error");
          setModalMessage("No matching plant found");
          setModalVisible(true);
        }
      } catch (error) {
        setModalType("error");
        setModalMessage("Error identifying plant");
        setModalVisible(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const findMatchingPlant = (result, plants) => {
    if (result.results && result.results.length > 0) {
      const plantName = result.results[0].species.scientificNameWithoutAuthor;
      return plants.find(
        (plant) => plant.latin_name.toLowerCase() === plantName.toLowerCase()
      );
    }
    return null;
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {capturedImageUri ? (
          <Image source={{ uri: capturedImageUri }} style={styles.camera} />
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} />
        )}
      </View>
      <View style={styles.nonCameraContainer}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#4caf50" />
            <Text style={styles.loadingText}>{loadingMessage}</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.circleButton} onPress={takePicture}>
            <Ionicons name="camera" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: "80%",
    height: "70%",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  camera: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  nonCameraContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center",
    color: "#4caf50",
  },
});

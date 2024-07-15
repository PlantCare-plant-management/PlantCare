import React, { useRef } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" style={{backgroundColor: "#4caf50"}}/>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate("ResultScreen", {
        imageUri: photo.uri,
        includeRelatedImages,
      });
      // Handle the taken picture, for example, navigate to a result screen or save the photo
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} />
        <Image
          source={{ uri: 'https://example.com/plant-mockup.png' }} // Ganti dengan URL gambar mockup tanaman
          style={styles.overlayImage}
        />
      </View>
      <View style={styles.nonCameraContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={takePicture}>
          <Ionicons name="camera" size={32} color="white" />
        </TouchableOpacity>
      </View>
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
    width: '80%',
    height: '70%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    width: '100%',
    height: '100%',
    backgroundColor: "black",
  },
  overlayImage: {
    position: 'absolute',
    top: '30%',
    left: '30%', 
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    opacity: 0.5, 
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
});

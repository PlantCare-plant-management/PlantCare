import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const TutorialScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        How to Plant Seeds from Your Starter Pack
      </Text>

      <View style={styles.section}>
        <Text style={styles.subHeader}>What's Inside Your Starter Pack:</Text>
        <Text style={styles.listItem}>- Pot</Text>
        <Text style={styles.listItem}>- Soil</Text>
        <Text style={styles.listItem}>- Seeds/Bibit</Text>
        <Text style={styles.listItem}>- Spray Bottle/Water Can</Text>
        <Text style={styles.listItem}>- Mini Shovel</Text>
        <Text style={styles.listItem}>- Hand Gloves</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Steps to Plant Your Seeds:</Text>

        <Text style={styles.step}>1. Wear Hand Gloves:</Text>
        <Text style={styles.instruction}>
          Put on the hand gloves to protect your hands from dirt and sharp
          objects.
        </Text>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721121861/gloves_zhdulo.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.step}>2. Prepare Your Pot:</Text>
        <Text style={styles.instruction}>
          Fill your pot with soil, leaving about 1 inch from the top. Make sure
          the soil is loose and not compacted.
        </Text>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721121862/soil_rs3dau.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.step}>3. Plant the Seeds:</Text>
        <Text style={styles.instruction}>
          Use the mini shovel to make small holes in the soil. Place 2-3 seeds
          in each hole, and cover them lightly with soil.
        </Text>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721121863/seed_hlka7n.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.step}>4. Water the Seeds:</Text>
        <Text style={styles.instruction}>
          Use the spray bottle or water can to lightly water the soil. Keep it
          moist but not too wet.
        </Text>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721121863/seed-watering_opj1yq.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.step}>5. Place the Pot in Sunlight:</Text>
        <Text style={styles.instruction}>
          Find a spot with adequate sunlight for your pot. Seeds need light to
          germinate and grow.
        </Text>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721159081/seed-light-01_sqvwvz.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("AddPlantForm")}
      >
        <Text style={styles.optionButtonText}>
          I have done it! click here to add the plant to my list
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e8f5e9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#388e3c",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4caf50",
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#388e3c",
  },
  step: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2e7d32",
  },
  instruction: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1b5e20",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  optionButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  optionButtonText: {
    fontSize: 18,
    color: "#4caf50",
    textAlign: "center",
  },
});

export default TutorialScreen;

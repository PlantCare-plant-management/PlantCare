import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Entypo } from "react-native-vector-icons";
import CardRecom from "../components/CardRecom";

const PlantInfoScreen = () => {
  const route = useRoute();
  const { plant } = route.params;
  console.log(plant.recommendation)

  const renderIcon = (text) => {
    switch (text.toLowerCase()) {
      case "watering":
        return <Entypo name="water" size={24} color="black" />;
      case "lighting":
        return <Entypo name="light-up" size={24} color="black" />;
      case "light":
        return <Entypo name="light-up" size={24} color="black" />;
      case "fertilizing":
        return <Entypo name="leaf" size={24} color="black" />;
      case "monitor plant health":
        return <Entypo name="eye" size={24} color="black" />;
      case "soil":
        return <Entypo name="tree" size={24} color="black" />;
      case "pruning":
        return <Entypo name="scissors" size={24} color="black" />;
      default:
        return null;
    }
  };

  const parseRecommendation = (recommendation) => {
    const [title, subtitle] = recommendation.split(": ");
    return { title, subtitle };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.judulDanImage}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{plant.name}</Text>
            <Text style={styles.latinName}>{plant.latin_name}</Text>
          </View>
          <Image source={{ uri: plant.imageUrl }} style={styles.image} />
        </View>
        <Text style={styles.deskripsiTanaman}>{plant.description}</Text>

        <View style={styles.containerDiffHarv}>
          <View style={styles.containerDiffHarv2}>
            <Text style={styles.difficulty}>Difficulty</Text>
            <Text style={styles.difficultyIsi}>{plant.difficulty}</Text>
          </View>

          <View>
            <Text style={styles.harvest}>Ready To Harvest</Text>
            <Text style={styles.harvestIsi}>
              {plant.harvest === "True" ? "Yes" : "No"}
            </Text>
          </View>
        </View>

        <View style={styles.containerRecom}>
          <Text style={styles.recom}>Recommendations</Text>
          <ScrollView horizontal={true} style={styles.recomList}>
            {plant.recommendation.map((recom, index) => {
              const parsedRecom = parseRecommendation(recom);
              return (
                <CardRecom
                  key={index}
                  data={parsedRecom}
                  renderIcon={renderIcon}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.containerMainCare}>
          <Text style={styles.mainCare}>Main Care</Text>
          {plant.main_care.map((item, index) => (
            <View key={index} style={styles.mainCareItemContainer}>
              {renderIcon(item)}
              <Text style={styles.mainCareItem}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  container2: {
    backgroundColor: "white",
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 150,
    minHeight: "100%",
  },
  judulDanImage: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  latinName: {
    fontStyle: "italic",
    marginTop: 5,
    fontSize: 18,
    color: "#888",
  },
  deskripsiTanaman: {
    marginLeft: 30,
    marginTop: 10,
    marginRight: 30,
    fontSize: 16,
  },
  containerDiffHarv: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 20,
  },
  containerDiffHarv2: {
    marginTop: 30,
  },
  difficulty: { fontWeight: "bold", fontSize: 20 },
  difficultyIsi: { marginTop: 5 },
  harvest: {
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  harvestIsi: {
    marginTop: 5,
  },
  containerRecom: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  recom: {
    fontWeight: "bold",
    fontSize: 20,
  },
  recomList: {
    flexDirection: "row",
    marginTop: 10,
  },
  containerMainCare: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  mainCare: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mainCareItem: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
  mainCareItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default PlantInfoScreen;
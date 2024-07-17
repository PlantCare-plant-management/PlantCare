import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";

const PlantInfoScreen = () => {
  const route = useRoute();
  const { plant } = route.params;
  console.log(plant.plants, "ini plants");
  const recommendations = plant.plants.recommendation || [];
  const mainCareTasks = plant.plants.main_care || [];
  console.log(recommendations, " ini recom");
  console.log(mainCareTasks, " ini main");
  const [actions, setActions] = useState(
    plant.actions.filter((action) => action.show)
  );

  const toggleTask = async (taskId) => {
    try {
      const updatedActions = actions.map((action) =>
        action.id === taskId
          ? { ...action, status: !action.status, update: new Date() }
          : action
      );
      setActions(updatedActions);

      const plantId = plant._id;
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/myplants/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plantId,
            actions: updatedActions,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const careIcons = {
    Watering: "watering-can",
    Light: "weather-sunny",
    Lighting: "weather-sunny",
    Soil: "spa",
    Fertilizing: "leaf",
    Pruning: "content-cut",
    Repotting: "flower-tulip",
    "Monitor plant health": "monitor",
  };

  const careColors = {
    Watering: "#AED581",
    Light: "#FFD54F",
    Lighting: "#FFD54F",
    Soil: "#8D6E63",
    Fertilizing: "#8BC34A",
    Pruning: "#FFC107",
    Repotting: "#F48FB1",
    "Monitor plant health": "#2196F3",
  };
  // console.log(new Date(actions[1].update)- new Date())
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          {/* Awal Plant Title */}
          <Text style={styles.namaTanaman}>{plant.plants.name}</Text>
          {/* Akhir Plant Title */}
          {/* Awal Plant Image */}
          <Image
            source={{
              uri: plant.plants.imgUrl || "https://via.placeholder.com/100",
            }}
            style={styles.gambarTanaman}
          />
        </View>
        {/* Akhir Plant Image */}

        {/* Awal Plant Description */}
        <Text style={styles.deskripsiTanaman}>{plant.plants.description}</Text>
        {/* Akhir Plant Description */}

        {/* Awal Difficulty and Harvest */}
        <View style={styles.difficulty}>
          <View style={styles.setelahDifficulty}>
            <Text style={styles.textDifficulty}>Difficulty</Text>
            <Text style={styles.levelDifficulty}>
              {plant.plants.difficulty}
            </Text>
          </View>

          <View>
            <Text style={styles.readyToHarvest}>Ready To Harvest</Text>
            <Text style={styles.waktuHarvest}>{plant.plants.harvest}</Text>
          </View>
        </View>
        {/* Akhir Difficulty and Harvest */}

        {/* Awal Recommendations */}
        <View style={styles.reccomendation}>
          <Text style={styles.textRecommendation}>Recommendations</Text>

          <ScrollView horizontal={true} style={styles.scrollViewCardRecom}>
            {recommendations.map((rec, index) => {
              const [task, description] = rec.split(": ");
              return (
                <View key={index} style={styles.cardRecommendation}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={careIcons[task]}
                      size={30}
                      color={careColors[task]}
                    />
                  </View>
                  <View style={styles.recom}>
                    <Text style={styles.textTaskRecom}>{task}</Text>
                    <Text style={styles.descriptionTask}>{description}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/* Akhir Recommendations */}

        {/* Awal Main Care */}
        <View style={styles.mainCare}>
          <Text style={styles.textMainCare}>Main Care</Text>
          <ScrollView horizontal={true} style={styles.scrollViewCardMainCare}>
            {plant.plants.main_care.map((care, index) => (
              <View key={index} style={styles.cardMainCare}>
                <Icon
                  name={getActionIcon(care.task)}
                  size={40}
                  color="#333"
                  style={styles.careIcon}
                />
                <Text style={styles.careText}>{care.task}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Akhir Main Care */}

        <Text style={styles.sectionTitleTask}>Task Today</Text>
        <View style={styles.taskTodayContainer}>
          {actions.map((task) => (
            <View key={task.id} style={styles.taskBox}>
              <CheckBox
                checked={task.status}
                onPress={() => toggleTask(task.id)}
                disabled={task.status}
                containerStyle={styles.taskCheckbox}
              />
              <Icon
                name={getActionIcon(task.name)}
                size={30}
                color={task.status ? "#AED581" : "#333"}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const getActionIcon = (actionName) => {
  switch (actionName.toLowerCase()) {
    case "watering":
      return "watering-can";
    case "lighting":
      return "weather-sunny";
    case "fertilizing":
      return "sprout";
    case "monitor plant health":
      return "heart-pulse";
    case "pruning":
      return "content-cut";
    case "staking":
      return "content-cut";
    case "harvesting":
      return "cart-arrow-down";
    default:
      return "help-circle-outline";
  }
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 16,
    backgroundColor: "#E8F5E9",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  readMore: {
    color: "#4CAF50",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  recommendationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  recommendationBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
  },
  recommendationText: {
    fontSize: 14,
    color: "#333",
  },
  careContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  careIcon: {
    marginBottom: 8,
  },
  careText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  taskTodayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  taskBox: {
    width: "30%",
    margin: "1.66%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  taskCheckbox: {
    marginRight: 8,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  sectionTitle: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  sectionTitleTask: {
    marginLeft: 30,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  recommendationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  recommendationBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
  },
  recommendationIcon: {
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  recommendationSubText: {
    fontSize: 12,
    color: "#888",
  },
  careBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
  },
  taskCheckbox: {
    marginRight: 8,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "green",
  },
  contentContainer: {
    backgroundColor: "white",
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 150,
    minHeight: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  namaTanaman: {
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 25,
    marginLeft: 30,
    marginRight: 30,
  },
  gambarTanaman: {
    marginRight: 30,
    marginTop: 20,
    height: 100,
    width: 100,
  },
  deskripsiTanaman: {
    marginLeft: 30,
    marginTop: 10,
    marginRight: 30,
  },
  difficulty: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
    marginLeft: 30,
  },
  setelahDifficulty: {
    marginTop: 30,
  },
  textDifficulty: {
    fontWeight: "bold",
    fontSize: 20,
  },
  levelDifficulty: {
    marginTop: 5,
  },
  readyToHarvest: {
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  waktuHarvest: {
    marginTop: 5,
  },
  reccomendation: {
    marginLeft: 30,
    marginTop: 20,
  },
  textRecommendation: {
    fontWeight: "bold",
  },
  scrollViewCardRecom: {
    flexDirection: "row",
  },
  mainCare: {
    marginLeft: 30,
    marginTop: 20,
  },
  textMainCare: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  scrollViewCardMainCare: {
    flexDirection: "row",
  },
  cardMainCare: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    height: 150,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  setelahCardMainCare: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTask: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardRecommendation: {
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    height: 180,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  recom: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTaskRecom: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  descriptionTask: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },
});

export default PlantInfoScreen;

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";


const PlantInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params;
  const recommendations = plant.plants.recommendation || [];
  const mainCareTasks = plant.plants.main_care || [];
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
  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={{
          uri: plant.photo || plant.plants.imgUrl || "https://via.placeholder.com/100",
        }}
        style={styles.gambarTanaman}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.namaTanaman}>{plant.plants.name}</Text>
          <Text style={styles.deskripsiTanaman}>
            {plant.plants.description}
          </Text>
        </View>
        <View style={styles.plantInfoContainer}>
          <View style={styles.plantInfo}>
            <Text style={styles.titlePlantInfo}>Difficulty</Text>
            <Text style={styles.descPlantInfo}>
              {plant.plants.difficulty}
            </Text>
          </View>
          <View style={styles.plantInfo}>
            <Text style={styles.titlePlantInfo}>Ready To Harvest</Text>
            <Text style={styles.descPlantInfo}>{plant.plants.harvest}</Text>
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

        <View style={styles.taskToday}>
          <Text style={styles.textToday}>Task Today</Text>
          {actions.map((task) => (
            <View key={task.id} style={styles.textTodayBox}>
              <CheckBox
                checked={task.status}
                onPress={() => toggleTask(task.id)}
                disabled={task.status}
                containerStyle={styles.textTodayCheckbox}
              />
              <Icon
                name={getActionIcon(task.name)}
                size={30}
                color={task.status ? "#8BC34A" : "#333"}
              />
              <Text style={styles.textTodayText}>{task.name}</Text>
            </View>
          ))}
        </View>

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
  careIcon: {
    marginBottom: 8,
  },
  careText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  taskToday: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  textToday: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  textTodayBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  textTodayCheckbox: {
    marginRight: 10,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  textTodayText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#d3d3d3",
  },
  contentContainer: {
    backgroundColor: "white",
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 100,
    minHeight: "100%",
  },
  titleContainer: {
    width: "60%",
  },
  namaTanaman: {
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 25,
    marginLeft: 30,
    marginRight: 30,
  },
  gambarTanaman: {
    borderRadius: 30,
    position: "absolute",
    right: 0,
    marginRight: 20,
    marginTop: 33,
    height: "22%",
    width: "44%",
    zIndex: 5,
  },
  deskripsiTanaman: {
    marginLeft: 30,
    marginTop: 10,
  },
  plantInfoContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginRight: 30,
    marginLeft: 30,
  },
  plantInfo: {
    flex: 1,
    marginTop: 30,
  },
  titlePlantInfo: {
    fontWeight: "bold",
    fontSize: 15,
  },
  descPlantInfo: {
    marginTop: 5,
    color: "#333",
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
    height: 100,
    width: 100,
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
    marginVertical: 5,
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

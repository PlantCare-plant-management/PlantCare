import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";

const PlantInfoScreen = () => {
  const route = useRoute();
  const { plant } = route.params;
  const recommendations = plant.plants.recommendation || [];
  const mainCareTasks = plant.plants.main_care || [];
  console.log(recommendations, " ini recom");
  console.log(mainCareTasks, " ini main");

  const [tasks, setTasks] = useState([
    { id: 1, task: "Watering", icon: "water", completed: false },
    { id: 2, task: "Light", icon: "weather-sunny", completed: false },
    { id: 3, task: "Pruning", icon: "content-cut", completed: false },
    { id: 4, task: "Fertilizing", icon: "leaf", completed: false },
  ]);

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
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
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          {/* Plant Title */}
          <Text style={styles.namaTanaman}>{plant.plants.name}</Text>
          {/* Plant Image */}
          <Image
            source={{
              uri: plant.plants.imgUrl || "https://via.placeholder.com/100",
            }}
            style={styles.gambarTanaman}
          />
        </View>
        {/* Plant Description */}
        <Text style={styles.deskripsiTanaman}>{plant.plants.description}</Text>
        {/* Difficulty and Harvest */}
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
            {mainCareTasks.map((task, index) => (
              <View key={index} style={styles.cardMainCare}>
                <View style={styles.setelahCardMainCare}>
                  <Icon
                    name={careIcons[task]}
                    size={30}
                    color={careColors[task]}
                  />
                  <Text style={styles.textTask}>{task}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Akhir Main Care */}

        <Text style={styles.sectionTitleTask}>Task Today</Text>
        <View style={styles.taskTodayContainer}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskBox}>
              <CheckBox
                checked={task.completed}
                onPress={() => toggleTask(task.id)}
                containerStyle={styles.taskCheckbox}
              />
              <Icon
                name={task.icon}
                size={30}
                color={task.completed ? "#AED581" : "#333"}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  sectionTitleTask: {
    marginTop: 15,
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
  careContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  careBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
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
    marginTop: 16,
  },
  taskBox: {
    width: "30%",
    margin: "1.66%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
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
    height: 200,
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

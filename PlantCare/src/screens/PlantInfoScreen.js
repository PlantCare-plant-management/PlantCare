import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';

const PlantInfoScreen = () => {
  const route = useRoute();
  const { plant } = route.params;
  // console.log(plant.plants)
  const [actions, setActions] = useState(plant.actions.filter(action => action.show));

  const toggleTask = async(taskId) =>{
    try {
      const updatedActions = actions.map((action) =>
        action.id === taskId ? { ...action, status: !action.status, update:new Date() } : action
      );
      setActions(updatedActions);

      const plantId = plant._id;
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/myplants/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantId,
          actions: updatedActions 
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(new Date(actions[1].update)- new Date())
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{plant.name}</Text>
            <Text style={styles.description}>
              {plant.plants.description}
              <Text style={styles.readMore}> Read more</Text>
            </Text>
          </View>
          <Image source={{ uri: `${plant.plants.imgUrl}` }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={styles.infoValue}>Intermediate</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Ready to harvest</Text>
            <Text style={styles.infoValue}>False</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        {plant.plants.recommendation.map((rec, index) => (
          <View key={index} style={styles.recommendationBox}>
            <Text style={styles.recommendationText}>{rec}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Main care</Text>
        {plant.plants.main_care.map((care, index) => (
          <View key={index} style={styles.careBox}>
            <Icon name={getActionIcon(care.task)} size={40} color="#333" style={styles.careIcon} />
            <Text style={styles.careText}>{care.task}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Task Today</Text>
        <View style={styles.taskTodayContainer}>
          {actions.map((task) => (
            <View key={task.id} style={styles.taskBox}>
              <CheckBox
                checked={task.status}
                onPress={() => toggleTask(task.id)}
                disabled={task.status}
                containerStyle={styles.taskCheckbox}
              />
              <Icon name={getActionIcon(task.name)} size={30} color={task.status ? '#AED581' : '#333'} />
              <Text>{task.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const getActionIcon = (actionName) => {
  switch (actionName.toLowerCase()) {
    case 'watering':
      return 'watering-can';
    case 'lighting':
      return 'weather-sunny';
    case 'fertilizing':
      return 'sprout';
    case 'monitor plant health':
      return 'leaf';
    default:
      return 'help-circle-outline';
  }
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  readMore: {
    color: '#4CAF50',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  recommendationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recommendationBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
  },
  careContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  careBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  careIcon: {
    marginBottom: 8,
  },
  careText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  taskTodayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  taskBox: {
    width: '30%',
    margin: '1.66%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  taskCheckbox: {
    marginRight: 8,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default PlantInfoScreen;
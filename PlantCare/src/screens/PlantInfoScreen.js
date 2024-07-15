import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';

const PlantInfoScreen = () => {
  const route = useRoute();
  const { plant } = route.params;

  const [tasks, setTasks] = useState([
    { id: 1, task: 'Watering', icon: 'water', completed: false },
    { id: 2, task: 'Light', icon: 'weather-sunny', completed: false },
    { id: 3, task: 'Pruning', icon: 'content-cut', completed: false },
    { id: 4, task: 'Fertilizing', icon: 'leaf', completed: false },
  ]);

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Oregano</Text>
            <Text style={styles.description}>
              Oregano is a familiar herb that many people know from dishes such as pizza and...
              <Text style={styles.readMore}> Read more</Text>
            </Text>
          </View>
          <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={styles.infoValue}>Easy</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Ready to harvest</Text>
            <Text style={styles.infoValue}>In 60 - 90 days</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.recommendationsContainer}>
          <View style={styles.recommendationBox}>
            <Icon name="water" size={40} color="#AED581" style={styles.recommendationIcon} />
            <Text style={styles.recommendationText}>Watering</Text>
            <Text style={styles.recommendationSubText}>Once per day</Text>
          </View>
          <View style={styles.recommendationBox}>
            <Icon name="weather-sunny" size={40} color="#FFEE58" style={styles.recommendationIcon} />
            <Text style={styles.recommendationText}>Light</Text>
            <Text style={styles.recommendationSubText}>4h per day</Text>
          </View>
          <View style={styles.recommendationBox}>
            <Icon name="sprout" size={40} color="#8D6E63" style={styles.recommendationIcon} />
            <Text style={styles.recommendationText}>Soil</Text>
            <Text style={styles.recommendationSubText}>Draining</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Main care</Text>
        <View style={styles.careContainer}>
          <View style={styles.careBox}>
            <Icon name="watering-can" size={40} color="#AED581" style={styles.careIcon} />
            <Text style={styles.careText}>Watering</Text>
          </View>
          <View style={styles.careBox}>
            <Icon name="leaf" size={40} color="#8BC34A" style={styles.careIcon} />
            <Text style={styles.careText}>Fertilizing</Text>
          </View>
          <View style={styles.careBox}>
            <Icon name="content-cut" size={40} color="#FFC107" style={styles.careIcon} />
            <Text style={styles.careText}>Pruning</Text>
          </View>
          <View style={styles.careBox}>
            <Icon name="flower-tulip" size={40} color="#F48FB1" style={styles.careIcon} />
            <Text style={styles.careText}>Repotting</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Task Today</Text>
        <View style={styles.taskTodayContainer}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskBox}>
              <CheckBox
                checked={task.completed}
                onPress={() => toggleTask(task.id)}
                containerStyle={styles.taskCheckbox}
              />
              <Icon name={task.icon} size={30} color={task.completed ? '#AED581' : '#333'} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
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
  recommendationIcon: {
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationSubText: {
    fontSize: 12,
    color: '#888',
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
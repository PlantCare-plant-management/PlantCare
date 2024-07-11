// PreferenceScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PreferenceScreen = () => {
  const [selectedPreference, setSelectedPreference] = useState(null);
  const navigation = useNavigation();

  const preferences = ['Newbie', 'Beginner', 'Intermediate', 'Experienced'];

  const handleSelectPreference = (preference) => {
    setSelectedPreference(preference);
    // Handle saving preference logic here
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Experience Level</Text>
      {preferences.map((preference) => (
        <TouchableOpacity
          key={preference}
          style={[
            styles.preferenceButton,
            selectedPreference === preference && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleSelectPreference(preference)}
        >
          <Text style={styles.preferenceText}>{preference}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  preferenceButton: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedPreferenceButton: {
    backgroundColor: '#a0e0a0',
  },
  preferenceText: {
    fontSize: 18,
    color: '#333',
  },
});

export default PreferenceScreen;

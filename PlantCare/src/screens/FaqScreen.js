import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function FaqScreen() {
  const [expanded, setExpanded] = useState(null);

  const faqs = {
    "Apa itu aplikasi ini?":
      "Aplikasi ini adalah sebuah platform yang memungkinkan Anda untuk ...",
    "Bagaimana cara menggunakan fitur A?":
      "Untuk menggunakan fitur A, Anda harus ...",
    "Bagaimana cara mengatur profil?":
      "Anda dapat mengatur profil Anda dengan cara ...",
    "Bagaimana cara reset password?":
      "Untuk mereset password Anda, silakan ikuti langkah-langkah berikut ...",
    "Apakah aplikasi ini gratis?":
      "Ya, aplikasi ini gratis namun memiliki fitur premium yang bisa dibeli ...",
    "Bagaimana cara menghubungi support?":
      "Anda dapat menghubungi support melalui email di support@example.com atau melalui telepon di ...",
    "Apa saja fitur premium?": "Fitur premium termasuk ...",
    "Bagaimana cara menghapus akun?":
      "Untuk menghapus akun Anda, silakan pergi ke pengaturan dan pilih 'Hapus Akun' ...",
    "Bagaimana cara edit profile?":
      "Untuk mengedit profil Anda, masuk ke bagian profil dan pilih 'Edit' ...",
    "Bagaimana cara edit profile?":
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  };

  const handlePress = (faqText) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === faqText ? null : faqText);
  };

  const faqItems = Object.keys(faqs);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ alignItems: "center", gap: 2 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>FAQs</Text>
          <Text style={{ fontSize: 16, fontWeight: "100" }}>
            Your Questions Answered Here
          </Text>
        </View>
        {faqItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
            {expanded === item && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{faqs[item]}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
    height: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  itemContainer: {
    width: "90%",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  answerContainer: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  answerText: {
    fontSize: 16,
    color: "black",
  },
});

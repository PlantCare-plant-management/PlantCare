import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function NotificationSetting() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.Wrap}>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <View style={styles.menuItem}>
            <View style={styles.wrapText}>
              <Ionicons name="notifications-outline" size={20} color="#333" />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("notification")}>
          <View style={styles.menuItem}>
            <View style={styles.wrapText}>
              <Ionicons name="notifications-outline" size={20} color="#333" />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
  },
  Wrap: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 10,
  },
  itemLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  WrapMenu: {
    flex: 1,
    gap: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    margin: "auto",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  wrapText: {
    // backgroundColor: "pink",
    flexDirection: "row",
    gap: 10,
  },
});

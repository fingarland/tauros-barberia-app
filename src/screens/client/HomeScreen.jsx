import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tauros Barbería
      </Text>

      <Text style={styles.subtitle}>
        Pantalla principal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#C8962A",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 10,
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function BarberDetailScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Selecciona tu barbero
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
    fontSize: 28,
    fontWeight: "bold",
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function BarberDetailScreen({ route }) {

  const { barber } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {barber.name}
      </Text>

      <Text style={styles.specialty}>
        {barber.specialty}
      </Text>

      <Text style={styles.chair}>
        Silla #{barber.chair_number}
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
    paddingHorizontal: 20,
  },

  title: {
    color: "#C8962A",
    fontSize: 32,
    fontWeight: "bold",
  },

  specialty: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 15,
    textAlign: "center",
  },

  chair: {
    color: "#BBBBBB",
    fontSize: 16,
    marginTop: 10,
  },
});
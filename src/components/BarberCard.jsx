import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function BarberCard({
  name,
  specialty,
  onPress,
}) {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.specialty}>
        {specialty}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#2A2A40",
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  specialty: {
    color: "#CFCFCF",
    marginTop: 8,
    fontSize: 16,
  },
});
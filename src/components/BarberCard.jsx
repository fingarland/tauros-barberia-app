import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CustomButton from "./CustomButton";

export default function BarberCard({
  name,
  specialty,
  onPress,
}) {
  return (
    <View style={styles.card}>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.specialty}>
        {specialty}
      </Text>

      <CustomButton
        title="Reservar"
        onPress={onPress}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#24243E",
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  name: {
    color: "#C8962A",
    fontSize: 22,
    fontWeight: "bold",
  },

  specialty: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 8,
  },
});
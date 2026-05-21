import React from "react";
import CustomButton from "../../components/CustomButton";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function BarberDetailScreen({
  route,
  navigation,
}) {

  const { barber } = route.params;

  const handleTimeSlots = () => {
    navigation.navigate("TimeSlot", {
      barber,
    });
  };

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

      <CustomButton
        title="Ver Horarios"
        onPress={handleTimeSlots}
      />

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
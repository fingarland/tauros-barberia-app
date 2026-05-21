import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CustomButton from "../../components/CustomButton";

export default function TimeSlotScreen({
  route,
  navigation,
}) {

  const { barber } = route.params;

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "4:00 PM",
  ];

  const handleSelectTime = (time) => {
    navigation.navigate("Booking", {
      barber,
      time,
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Horarios de {barber.name}
      </Text>

      <Text style={styles.subtitle}>
        Selecciona una hora disponible
      </Text>

      {timeSlots.map((time) => (
        <CustomButton
          key={time}
          title={time}
          onPress={() => handleSelectTime(time)}
        />
      ))}

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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
});
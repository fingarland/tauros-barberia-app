import React from "react";
import useBarbers from "../../hooks/useBarbers";
import {
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import CustomButton from "../../components/CustomButton";
import BarberCard from "../../components/BarberCard";

export default function HomeScreen({ navigation }) {

  const { barbers } = useBarbers();

  const handleBooking = (barber) => {
  navigation.navigate("BarberDetail", {
    barber,
  });
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>
        Tauros Barbería
      </Text>

      <Text style={styles.subtitle}>
        Reserva tu cita fácilmente
      </Text>

      {barbers.map((barber) => (
        <BarberCard
          key={barber.id}
          name={barber.name}
          specialty={barber.specialty}
          onPress={() => handleBooking(barber)}
        />
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },

  content: {
    padding: 20,
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },

  title: {
    color: "#C8962A",
    fontSize: 34,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 12,
    textAlign: "center",
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import CustomButton from "../../components/CustomButton";
import BarberCard from "../../components/BarberCard";

export default function HomeScreen({ navigation }) {

  const handleBooking = () => {
    navigation.navigate("BarberDetail");
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

      <CustomButton
        title="Reservar Ahora"
        onPress={handleBooking}
      />

      <BarberCard
        name="Carlos Rodríguez"
        specialty="Fade y cortes clásicos"
        onPress={handleBooking}
      />

      <BarberCard
        name="Miguel Herrera"
        specialty="Barbas y estilos modernos"
        onPress={handleBooking}
      />

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
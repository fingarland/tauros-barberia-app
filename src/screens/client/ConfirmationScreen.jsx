import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function ConfirmationScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        ¡Reserva Confirmada!
      </Text>

      <Text style={styles.subtitle}>
        Tu cita fue registrada exitosamente.
      </Text>

      <Text style={styles.message}>
        Gracias por elegir Tauros Barbería.
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
    textAlign: "center",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },

  message: {
    color: "#BBBBBB",
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
});
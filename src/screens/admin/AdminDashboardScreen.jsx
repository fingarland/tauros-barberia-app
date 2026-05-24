import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CustomButton
  from "../../components/CustomButton";

import useAdminTimeout
  from "../../hooks/useAdminTimeout";

export default function
AdminDashboardScreen({
  navigation,
}) {

  const {
    resetTimer,
  } = useAdminTimeout(
    navigation
  );

  return (

    <View
      style={styles.container}
      onTouchStart={
        resetTimer
      }
    >

      <Text style={styles.title}>
        Panel Administrador
      </Text>

      <CustomButton
        title="Reservas"
        onPress={() =>
          navigation.navigate(
            "AdminBookings"
          )
        }
      />

      <CustomButton
        title="Barberos"
        onPress={() =>
          navigation.navigate(
            "AdminBarbers"
          )
        }
      />

      <CustomButton
        title="Horarios"
        onPress={() =>
          navigation.navigate(
            "AdminSchedule"
          )
        }
      />

      <CustomButton
        title="Volver al Inicio"
        onPress={() =>
          navigation.navigate(
            "Home"
          )
        }
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
    marginBottom: 40,
  },

});
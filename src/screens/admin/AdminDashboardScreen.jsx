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

      onStartShouldSetResponder={() => {

        resetTimer();

        return false;
      }}
    >

      <Text style={styles.title}>
        Panel Administrador
      </Text>

      <CustomButton
        title="Reservas"

        onPress={() => {

          resetTimer();

          navigation.navigate(
            "AdminBookings"
          );

        }}
      />

      <CustomButton
        title="Barberos"

        onPress={() => {

          resetTimer();

          navigation.navigate(
            "AdminBarbers"
          );

        }}
      />

      <CustomButton
        title="Horarios"

        onPress={() => {

          resetTimer();

          navigation.navigate(
            "AdminSchedule"
          );

        }}
      />

      <CustomButton
        title="Volver al Inicio"

        onPress={() => {

          resetTimer();

          navigation.navigate(
            "Home"
          );

        }}
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
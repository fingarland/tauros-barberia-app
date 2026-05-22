import React, { useState } from "react";
import { supabase } from "../../services/supabase";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import CustomButton from "../../components/CustomButton";

export default function BookingScreen({
  route,
  navigation,
}) {

  const {
    barber,
    time,
    appointmentDate,
  } = route.params;

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const formattedDate =
    appointmentDate || "Sin fecha";

  const handleConfirmBooking = async () => {

    if (!customerName || !phone) {
      alert("Completa todos los campos");
      return;
    }

    const { error } = await supabase
      .from("appointments")
      .insert([
        {
          customer_name: customerName,
          phone: phone,
          barber_id: barber.id,
          barber_name: barber.name,
          appointment_time: time,
          appointment_date: formattedDate,
        },
      ]);

    if (error) {

      console.log(
        "Error guardando cita:",
        error
      );

      alert("Error al guardar la reserva");
      return;
    }

    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Confirmar Reserva
      </Text>

      <Text style={styles.info}>
        Barbero:
      </Text>

      <Text style={styles.value}>
        {barber.name}
      </Text>

      <Text style={styles.info}>
        Hora:
      </Text>

      <Text style={styles.value}>
        {time}
      </Text>

      <Text style={styles.info}>
        Fecha:
      </Text>

      <Text style={styles.value}>
        {formattedDate}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        placeholderTextColor="#999"
        value={customerName}
        onChangeText={(text) => {

          const onlyLetters =
            text.replace(
              /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
              ""
            );

          setCustomerName(onlyLetters);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => {

          const onlyNumbers =
            text.replace(/[^0-9]/g, "");

          setPhone(onlyNumbers);
        }}
      />

      <CustomButton
        title="Confirmar Reserva"
        onPress={handleConfirmBooking}
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  info: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 10,
  },

  value: {
    color: "#C8962A",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  input: {
    width: "100%",
    backgroundColor: "#2A2A40",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 16,
  },
});
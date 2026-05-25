import React, {
  useState,
} from "react";

import { supabase }
  from "../../services/supabase";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import CustomButton
  from "../../components/CustomButton";

export default function
BookingScreen({
  route,
  navigation,
}) {

  const {
    barber,
    time,
    appointmentDate,
  } = route.params;

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [phone, setPhone] =
    useState("");

  const [
    phoneType,
    setPhoneType,
  ] = useState("mobile");

  const formattedDate =
    appointmentDate ||
    "Sin fecha";

  const handleConfirmBooking =
    async () => {

    // validar campos
    if (
      !customerName ||
      !phone
    ) {

      alert(
        "Completa todos los campos"
      );

      return;
    }

    // validar nombre
    if (
      customerName
        .trim()
        .length < 3
    ) {

      alert(
        "El nombre debe tener mínimo 3 letras"
      );

      return;
    }

    // validar celular
    if (
      phoneType ===
        "mobile" &&
      phone.length !== 10
    ) {

      alert(
        "El celular debe tener 10 dígitos"
      );

      return;
    }

    // validar fijo
    if (
      phoneType ===
        "fixed" &&
      phone.length < 7
    ) {

      alert(
        "El teléfono fijo debe tener mínimo 7 dígitos"
      );

      return;
    }

    // guardar reserva
    const { error } =
      await supabase
        .from("appointments")
        .insert([
          {
            customer_name:
              customerName,

            phone: phone,

            phone_type:
              phoneType,

            barber_id:
              barber.id,

            barber_name:
              barber.name,

            appointment_time:
              time,

            appointment_date:
              formattedDate,
          },
        ]);

    if (error) {

      console.log(
        "Error guardando cita:",
        error
      );

      alert(
        "Error al guardar la reserva"
      );

      return;
    }

    alert(
      "Reserva realizada correctamente"
    );

    setTimeout(() => {

      navigation.navigate(
        "Home"
      );

    }, 2000);
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

          setCustomerName(
            onlyLetters
          );
        }}
      />

      <Text style={styles.typeTitle}>
        Tipo de teléfono
      </Text>

      <View style={styles.typeContainer}>

        <CustomButton
          title="Móvil"
          onPress={() =>
            setPhoneType(
              "mobile"
            )
          }
        />

        <CustomButton
          title="Fijo"
          onPress={() =>
            setPhoneType(
              "fixed"
            )
          }
        />

      </View>

      <TextInput
        style={styles.input}
        placeholder={
          phoneType ===
          "mobile"
            ? "Celular"
            : "Teléfono fijo"
        }

        placeholderTextColor="#999"

        keyboardType="phone-pad"

        value={phone}

        onChangeText={(text) => {

          const onlyNumbers =
            text.replace(
              /[^0-9]/g,
              ""
            );

          setPhone(
            onlyNumbers
          );
        }}
      />

      <CustomButton
        title="Confirmar Reserva"
        onPress={
          handleConfirmBooking
        }
      />

    </View>
  );
}

const styles =
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      "#1A1A2E",

    justifyContent:
      "center",

    alignItems:
      "center",

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

  typeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  typeContainer: {
    width: "100%",
    marginBottom: 10,
  },

  input: {
    width: "100%",

    backgroundColor:
      "#2A2A40",

    color: "#FFFFFF",

    padding: 15,

    borderRadius: 10,

    marginTop: 15,

    fontSize: 16,
  },

});
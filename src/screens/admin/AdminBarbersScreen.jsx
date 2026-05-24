import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import { supabase }
  from "../../services/supabase";

import CustomButton
  from "../../components/CustomButton";

export default function
AdminBarbersScreen() {

  const [barbers, setBarbers] =
    useState([]);

  const [name, setName] =
    useState("");

  const [specialty,
    setSpecialty] =
      useState("");

  const [chairNumber,
    setChairNumber] =
      useState("");

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers =
    async () => {

    const {
      data,
      error,
    } = await supabase
      .from("barbers")
      .select("*")
      .order("id");

    if (error) {

      console.log(
        "Error fetching barbers:",
        error
      );

      return;
    }

    setBarbers(data);
  };

  const handleAddBarber =
    async () => {

    if (
      !name ||
      !specialty ||
      !chairNumber
    ) {

      alert(
        "Completa todos los campos"
      );

      return;
    }

    // verificar silla repetida
    const {
      data: existingChair,
      error: chairError,
    } = await supabase
      .from("barbers")
      .select("*")
      .eq(
        "chair_number",
        parseInt(chairNumber)
      );

    if (chairError) {

      alert(
        "Error verificando silla"
      );

      return;
    }

    if (
      existingChair.length > 0
    ) {

      alert(
        "Esa silla ya está asignada a otro barbero"
      );

      return;
    }

    const { error } =
      await supabase
        .from("barbers")
        .insert([
          {
            name,
            specialty,

            chair_number:
              parseInt(
                chairNumber
              ),

            is_active: true,

            start_hour: 9,

            end_hour: 17,
          },
        ]);

    if (error) {

      alert(
        "Error agregando barbero"
      );

      return;
    }

    setName("");
    setSpecialty("");
    setChairNumber("");

    fetchBarbers();
  };

  const handleDeleteBarber =
    async (id) => {

    // verificar reservas pendientes
    const {
      data: appointments,
      error: appointmentsError,
    } = await supabase
      .from("appointments")
      .select("*")
      .eq("barber_id", id)
      .or(
        "status.eq.pending,status.is.null"
      );

    if (appointmentsError) {

      alert(
        "Error verificando reservas"
      );

      return;
    }

    // si tiene reservas pendientes
    if (
      appointments.length > 0
    ) {

      alert(
        "No puedes eliminar este barbero porque tiene reservas pendientes"
      );

      return;
    }

    // eliminar barbero
    const { error } =
      await supabase
        .from("barbers")
        .delete()
        .eq("id", id);

    if (error) {

      alert(
        "Error eliminando barbero"
      );

      return;
    }

    fetchBarbers();
  };

  const handleToggleActive =
    async (
      id,
      currentStatus
    ) => {

    const { error } =
      await supabase
        .from("barbers")
        .update({
          is_active:
            !currentStatus,
        })
        .eq("id", id);

    if (error) {

      alert(
        "Error actualizando barbero"
      );

      return;
    }

    fetchBarbers();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >

      <Text style={styles.title}>
        Administrador Barberos
      </Text>

      {barbers.map((barber) => (

        <View
          key={barber.id}
          style={styles.card}
        >

          <Text style={styles.text}>

            {barber.name}
            {" - "}

            {barber.specialty}
            {" - "}

            Silla #
            {barber.chair_number}

          </Text>

          <Text style={styles.status}>

            Estado:
            {" "}

            {
              barber.is_active
                ? "Activo"
                : "Inactivo"
            }

          </Text>

          <CustomButton
            title="Eliminar"
            onPress={() =>
              handleDeleteBarber(
                barber.id
              )
            }
          />

          <CustomButton
            title={
              barber.is_active
                ? "Desactivar"
                : "Activar"
            }

            onPress={() =>
              handleToggleActive(
                barber.id,
                barber.is_active
              )
            }
          />

        </View>

      ))}

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Especialidad"
        placeholderTextColor="#999"
        value={specialty}
        onChangeText={
          setSpecialty
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Número de silla"
        placeholderTextColor="#999"
        value={chairNumber}
        onChangeText={
          setChairNumber
        }
        keyboardType="number-pad"
        style={styles.input}
      />

      <CustomButton
        title="Agregar Barbero"
        onPress={
          handleAddBarber
        }
      />

    </ScrollView>
  );
}

const styles =
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      "#1A1A2E",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    color: "#C8962A",
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor:
      "#2A2A40",

    padding: 15,

    borderRadius: 10,

    marginBottom: 15,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },

  status: {
    color: "#C8962A",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor:
      "#2A2A40",

    color: "#FFF",

    padding: 12,

    borderRadius: 10,

    marginBottom: 10,
  },

});
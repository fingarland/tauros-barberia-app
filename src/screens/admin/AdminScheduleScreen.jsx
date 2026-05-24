import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import { supabase }
  from "../../services/supabase";

import CustomButton
  from "../../components/CustomButton";

import useAdminTimeout
  from "../../hooks/useAdminTimeout";

export default function
AdminScheduleScreen({
  navigation,
}) {

  const {
    resetTimer,
  } = useAdminTimeout(
    navigation
  );

  const [barbers, setBarbers] =
    useState([]);

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
        "Error obteniendo barberos:",
        error
      );

      return;
    }

    setBarbers(data);
  };

  const handleSave =
    async (barber) => {

    // validar horas
    if (
      barber.start_hour < 6 ||
      barber.start_hour > 20
    ) {

      alert(
        "La hora inicio debe ser entre 6 y 20"
      );

      return;
    }

    if (
      barber.end_hour < 6 ||
      barber.end_hour > 20
    ) {

      alert(
        "La hora fin debe ser entre 6 y 20"
      );

      return;
    }

    if (
      barber.end_hour <=
      barber.start_hour
    ) {

      alert(
        "La hora fin debe ser mayor que la hora inicio"
      );

      return;
    }

    // obtener reservas activas
    const {
      data: appointments,
      error: appointmentsError,
    } = await supabase
      .from("appointments")
      .select("*")
      .eq("barber_id", barber.id)
      .neq("status", "completed")
      .neq("status", "cancelled");

    if (appointmentsError) {

      alert(
        "Error verificando reservas"
      );

      return;
    }

    // verificar reservas fuera del rango
    const invalidAppointments =
      appointments.filter(
        (appt) => {

          const time =
            appt.appointment_time;

          let hour =
            parseInt(
              time.split(":")[0]
            );

          // soporte reservas viejas AM/PM
          if (
            time.includes("PM") &&
            hour !== 12
          ) {

            hour += 12;
          }

          if (
            time.includes("AM") &&
            hour === 12
          ) {

            hour = 0;
          }

          return (
            hour <
              barber.start_hour ||
            hour >=
              barber.end_hour
          );
        }
      );

    // bloquear cambio
    if (
      invalidAppointments.length > 0
    ) {

      alert(
        "No puedes cambiar el horario porque existen citas pendientes fuera del nuevo rango"
      );

      return;
    }

    // guardar horarios
    const { error } =
      await supabase
        .from("barbers")
        .update({
          start_hour:
            barber.start_hour,

          end_hour:
            barber.end_hour,
        })
        .eq("id", barber.id);

    if (error) {

      alert(
        "Error guardando horarios"
      );

      return;
    }

    alert(
      "Horario actualizado"
    );
  };

  const updateBarberField =
    (
      id,
      field,
      value
    ) => {

    const updated =
      barbers.map((barber) => {

      if (
        barber.id === id
      ) {

        return {
          ...barber,

          [field]:
            parseInt(value) || 0,
        };
      }

      return barber;
    });

    setBarbers(updated);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }

      onTouchStart={
        resetTimer
      }
    >

      <Text style={styles.title}>
        Configurar Horarios
      </Text>

      {barbers.map(
        (barber) => (

        <View
          key={barber.id}
          style={styles.card}
        >

          <Text style={styles.name}>
            {barber.name}
          </Text>

          <Text style={styles.label}>
            Hora inicio
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={String(
              barber.start_hour
            )}
            onChangeText={(
              text
            ) =>
              updateBarberField(
                barber.id,
                "start_hour",
                text
              )
            }
          />

          <Text style={styles.label}>
            Hora fin
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={String(
              barber.end_hour
            )}
            onChangeText={(
              text
            ) =>
              updateBarberField(
                barber.id,
                "end_hour",
                text
              )
            }
          />

          <CustomButton
            title="Guardar Horario"
            onPress={() =>
              handleSave(
                barber
              )
            }
          />

        </View>

      ))}

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
    color: "#C8962A",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor:
      "#2A2A40",

    borderRadius: 15,

    padding: 20,

    marginBottom: 20,
  },

  name: {
    color: "#C8962A",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor:
      "#1A1A2E",

    color: "#FFFFFF",

    borderRadius: 10,

    padding: 12,

    marginBottom: 15,

    fontSize: 16,
  },

});
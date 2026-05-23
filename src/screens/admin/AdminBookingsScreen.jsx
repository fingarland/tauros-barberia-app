import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { supabase }
  from "../../services/supabase";

import CustomButton
  from "../../components/CustomButton";

export default function
AdminBookingsScreen() {

  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments =
    async () => {

    const {
      data,
      error,
    } = await supabase
      .from("appointments")
      .select("*")
      .order(
        "appointment_date",
        { ascending: true }
      );

    if (error) {

      console.log(
        "Error obteniendo reservas:",
        error
      );

      return;
    }

    setAppointments(data);
  };

  const handleCancel =
    async (id) => {

    const { error } =
      await supabase
        .from("appointments")
        .update({
          status: "cancelled",
        })
        .eq("id", id);

    if (error) {

      alert(
        "Error al cancelar la reserva"
      );

      return;
    }

    fetchAppointments();
  };

  const handleComplete =
    async (id) => {

    const { error } =
      await supabase
        .from("appointments")
        .update({
          status: "completed",
        })
        .eq("id", id);

    if (error) {

      alert(
        "Error completando reserva"
      );

      return;
    }

    fetchAppointments();
  };

  if (
    appointments.length === 0
  ) {

    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          No hay reservas todavía
        </Text>

      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >

      <Text style={styles.title}>
        Reservas
      </Text>

      {appointments.map((appt) => {

        let statusColor =
          "#C8962A";

        if (
          appt.status ===
          "completed"
        ) {

          statusColor =
            "#2ECC71";
        }

        if (
          appt.status ===
          "cancelled"
        ) {

          statusColor =
            "#E74C3C";
        }

        return (

          <View
            key={appt.id}
            style={styles.card}
          >

            <Text style={styles.text}>
              Cliente:
              {" "}
              {appt.customer_name}
            </Text>

            <Text style={styles.text}>
              Teléfono:
              {" "}
              {appt.phone}
            </Text>

            <Text style={styles.text}>
              Barbero:
              {" "}
              {appt.barber_name}
            </Text>

            <Text style={styles.text}>
              Fecha:
              {" "}
              {appt.appointment_date}
            </Text>

            <Text style={styles.text}>
              Hora:
              {" "}
              {appt.appointment_time}
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    statusColor,
                },
              ]}
            >
              Estado:
              {" "}

              {
                appt.status ||
                "pending"
              }
            </Text>

            {appt.status !==
              "cancelled" && (

              <CustomButton
                title="Cancelar Reserva"
                onPress={() =>
                  handleCancel(
                    appt.id
                  )
                }
              />

            )}

            {appt.status !==
              "completed" && (

              <CustomButton
                title="Marcar Completada"
                onPress={() =>
                  handleComplete(
                    appt.id
                  )
                }
              />

            )}

          </View>

        );
      })}

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
    alignItems: "center",
    paddingBottom: 40,
  },

  title: {
    color: "#C8962A",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor:
      "#2A2A40",

    width: "100%",

    padding: 15,

    borderRadius: 15,

    marginBottom: 20,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
  },

  status: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

});
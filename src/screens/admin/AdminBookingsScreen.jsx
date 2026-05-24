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

import useAdminTimeout
  from "../../hooks/useAdminTimeout";

export default function
AdminBookingsScreen({
  navigation,
}) {

  const {
    resetTimer,
  } = useAdminTimeout(
    navigation
  );

  const [appointments,
    setAppointments] =
      useState([]);

  const [filter,
    setFilter] =
      useState("all");

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

  // FILTROS
  const filteredAppointments =
    appointments.filter(
      (appt) => {

        const status =
          String(
            appt.status || ""
          ).toLowerCase();

        // todas
        if (
          filter === "all"
        ) {

          return true;
        }

        // pendientes
        if (
          filter === "pending"
        ) {

          return (
            status !==
              "completed" &&
            status !==
              "cancelled"
          );
        }

        // completadas
        if (
          filter ===
          "completed"
        ) {

          return (
            status ===
            "completed"
          );
        }

        // canceladas
        if (
          filter ===
          "cancelled"
        ) {

          return (
            status ===
            "cancelled"
          );
        }

        return true;
      }
    );

  if (
    appointments.length === 0
  ) {

    return (
      <View
        style={styles.container}
        onTouchStart={
          resetTimer
        }
      >

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

      onTouchStart={
        resetTimer
      }
    >

      <Text style={styles.title}>
        Reservas
      </Text>

      <View style={styles.filters}>

        <CustomButton
          title="Todas"
          onPress={() =>
            setFilter("all")
          }
        />

        <CustomButton
          title="Pendientes"
          onPress={() =>
            setFilter("pending")
          }
        />

        <CustomButton
          title="Completadas"
          onPress={() =>
            setFilter(
              "completed"
            )
          }
        />

        <CustomButton
          title="Canceladas"
          onPress={() =>
            setFilter(
              "cancelled"
            )
          }
        />

      </View>

      {filteredAppointments.map(
        (appt) => {

        const status =
          String(
            appt.status || ""
          ).toLowerCase();

        let statusColor =
          "#C8962A";

        let statusText =
          "pending";

        if (
          status ===
          "completed"
        ) {

          statusColor =
            "#2ECC71";

          statusText =
            "completed";
        }

        if (
          status ===
          "cancelled"
        ) {

          statusColor =
            "#E74C3C";

          statusText =
            "cancelled";
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
              {statusText}
            </Text>

            {status !==
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

            {status !==
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

  filters: {
    width: "100%",
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
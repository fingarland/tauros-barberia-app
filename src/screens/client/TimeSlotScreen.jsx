import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { supabase }
  from "../../services/supabase";

import CustomButton
  from "../../components/CustomButton";

export default function
TimeSlotScreen({
  route,
  navigation,
}) {

  const { barber } =
    route.params;

  const [availableSlots,
    setAvailableSlots] =
      useState([]);

  const [selectedDate,
    setSelectedDate] =
      useState(new Date());

  const formatHour =
    (hour) => {

    return hour
      .toString()
      .padStart(2, "0");
  };

  const generateTimeSlots =
    () => {

    const slots = [];

    for (
      let hour =
        barber.start_hour;

      hour <
        barber.end_hour;

      hour++
    ) {

      slots.push(
        `${formatHour(hour)}:00`
      );

      slots.push(
        `${formatHour(hour)}:30`
      );
    }

    return slots;
  };

  const allTimeSlots =
    generateTimeSlots();

  const nextDays =
    [...Array(8)].map(
      (_, index) => {

      const date =
        new Date();

      date.setDate(
        date.getDate() +
        index
      );

      return date;
    }
  );

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate]);

  const fetchAvailableSlots =
    async () => {

    const formattedDate =
      selectedDate
        .toISOString()
        .split("T")[0];

    const {
      data,
      error,
    } = await supabase
      .from("appointments")
      .select(
        "appointment_time"
      )
      .eq(
        "barber_id",
        barber.id
      )
      .eq(
        "appointment_date",
        formattedDate
      );

    if (error) {

      console.log(
        "Error obteniendo reservas:",
        error
      );

      return;
    }

    const bookedSlots =
      data.map(
        (appointment) =>
          appointment
            .appointment_time
      );

    // hora actual
    const now =
      new Date();

    const isToday =
      selectedDate
        .toISOString()
        .split("T")[0] ===
      now
        .toISOString()
        .split("T")[0];

    const currentHour =
      now.getHours();

    const currentMinute =
      now.getMinutes();

    const filteredSlots =
      allTimeSlots.filter(
        (slot) => {

          // eliminar reservadas
          if (
            bookedSlots.includes(
              slot
            )
          ) {

            return false;
          }

          // si no es hoy
          if (!isToday) {

            return true;
          }

          // separar hora y minutos
          const [
            slotHour,
            slotMinute,
          ] = slot
            .split(":")
            .map(Number);

          // bloquear horas pasadas
          if (
            slotHour <
            currentHour
          ) {

            return false;
          }

          // bloquear minutos pasados
          if (
            slotHour ===
              currentHour &&
            slotMinute <=
              currentMinute
          ) {

            return false;
          }

          return true;
        }
      );

    setAvailableSlots(
      filteredSlots
    );
  };

  const handleSelectTime =
    (time) => {

    navigation.navigate(
      "Booking",
      {
        barber,
        time,
        appointmentDate:
          selectedDate
            .toISOString()
            .split("T")[0],
      }
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >

      <Text style={styles.title}>
        Horarios de
        {" "}
        {barber.name}
      </Text>

      <Text style={styles.subtitle}>
        Selecciona un día
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        style={
          styles.daysContainer
        }
      >

        {nextDays.map(
          (date) => {

          const formatted =
            date
              .toISOString()
              .split("T")[0];

          const selected =
            formatted ===
            selectedDate
              .toISOString()
              .split("T")[0];

          return (

            <TouchableOpacity
              key={formatted}
              style={[
                styles.dayButton,

                selected &&
                styles.selectedDay,
              ]}
              onPress={() =>
                setSelectedDate(
                  date
                )
              }
            >

              <Text
                style={[
                  styles.dayText,

                  selected &&
                  styles.selectedDayText,
                ]}
              >

                {
                  date
                    .toLocaleDateString()
                }

              </Text>

            </TouchableOpacity>

          );
        })}

      </ScrollView>

      <Text style={styles.subtitle}>
        Horarios disponibles
      </Text>

      {availableSlots.length === 0 && (

        <Text
          style={styles.noSlots}
        >
          No hay horarios disponibles
        </Text>

      )}

      {availableSlots.map(
        (time) => (

        <CustomButton
          key={time}
          title={time}
          onPress={() =>
            handleSelectTime(
              time
            )
          }
        />

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
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: {
    color: "#C8962A",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },

  noSlots: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 20,
  },

  daysContainer: {
    maxHeight: 60,
  },

  dayButton: {
    backgroundColor:
      "#2A2A40",

    paddingVertical: 10,

    paddingHorizontal: 15,

    borderRadius: 10,

    marginRight: 10,
  },

  selectedDay: {
    backgroundColor:
      "#C8962A",
  },

  dayText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  selectedDayText: {
    color: "#1A1A2E",
  },

});
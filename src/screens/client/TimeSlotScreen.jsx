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

import { supabase } from "../../services/supabase";

import CustomButton from "../../components/CustomButton";

export default function TimeSlotScreen({
  route,
  navigation,
}) {

  const { barber } = route.params;

  const [availableSlots, setAvailableSlots] =
    useState([]);

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const allTimeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
  ];

  const nextDays = [...Array(8)].map(
    (_, index) => {

      const date = new Date();

      date.setDate(
        date.getDate() + index
      );

      return date;
    }
  );

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {

    const formattedDate =
      selectedDate
        .toISOString()
        .split("T")[0];

    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("barber_id", barber.id)
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
          appointment.appointment_time
      );

    const filteredSlots =
      allTimeSlots.filter(
        (slot) =>
          !bookedSlots.includes(slot)
      );

    setAvailableSlots(filteredSlots);
  };

  const handleSelectTime = (time) => {

    navigation.navigate("Booking", {
      barber,
      time,
      appointmentDate:
        selectedDate
          .toISOString()
          .split("T")[0],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >

      <Text style={styles.title}>
        Horarios de {barber.name}
      </Text>

      <Text style={styles.subtitle}>
        Selecciona un día
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        style={styles.daysContainer}
      >

        {nextDays.map((date) => {

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
                setSelectedDate(date)
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

      {availableSlots.map((time) => (
        <CustomButton
          key={time}
          title={time}
          onPress={() =>
            handleSelectTime(time)
          }
        />
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
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

  daysContainer: {
    maxHeight: 60,
  },

  dayButton: {
    backgroundColor: "#2A2A40",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },

  selectedDay: {
    backgroundColor: "#C8962A",
  },

  dayText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  selectedDayText: {
    color: "#1A1A2E",
  },
});
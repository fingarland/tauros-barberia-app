import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
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

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {

    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("barber_id", barber.id);

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
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Horarios de {barber.name}
      </Text>

      <Text style={styles.subtitle}>
        Selecciona una hora disponible
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
});
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens Cliente
import HomeScreen from "../screens/client/HomeScreen";
import BarberDetailScreen from "../screens/client/BarberDetailScreen";
import TimeSlotScreen from "../screens/client/TimeSlotScreen";
import BookingScreen from "../screens/client/BookingScreen";
import ConfirmationScreen from "../screens/client/ConfirmationScreen";

// Screens Admin
import AdminLoginScreen from "../screens/admin/AdminLoginScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import AdminBarbersScreen from "../screens/admin/AdminBarbersScreen";
import AdminScheduleScreen from "../screens/admin/AdminScheduleScreen";
import AdminBookingsScreen from "../screens/admin/AdminBookingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
      }}
>

        {/* Cliente */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="BarberDetail"
          component={BarberDetailScreen}
        />

        <Stack.Screen
          name="TimeSlot"
          component={TimeSlotScreen}
        />

        <Stack.Screen
          name="Booking"
          component={BookingScreen}
        />

        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
        />
        

        {/* Admin */}
        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
        />

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
        />

        <Stack.Screen
          name="AdminBarbers"
          component={AdminBarbersScreen}
        />

        <Stack.Screen
          name="AdminSchedule"
          component={AdminScheduleScreen}
        />

        <Stack.Screen
          name="AdminBookings"
          component={AdminBookingsScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
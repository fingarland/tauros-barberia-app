import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import CustomButton
  from "../../components/CustomButton";

export default function AdminLoginScreen({
  navigation,
}) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "1234"
    ) {

      navigation.navigate(
        "AdminPanel"
      );

    } else {

      alert(
        "Usuario o contraseña incorrectos"
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Panel Administrador
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton
        title="Ingresar"
        onPress={handleLogin}
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },

  input: {
    width: "100%",
    backgroundColor: "#2A2A40",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
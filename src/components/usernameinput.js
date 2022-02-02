import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

export default function UsernameInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  style,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
  },
  input: {
    textAlign: "center",
  },
});

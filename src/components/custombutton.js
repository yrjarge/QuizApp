import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function CustomButton({
  onPress,
  text,
  type = "button",
  bgcolor,
  textcolor,
}) {
  return (
    <Pressable
      style={[
        styles.container,
        styles[`container_${type}`],
        bgcolor ? { backgroundColor: bgcolor } : {}, //if provided, will override other specification
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          textcolor ? { color: textcolor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3B71F3",
  },
  container_button: {
    backgroundColor: "#1e3b52",
  },
  container_link: {
    backgroundColor: "white",
  },
  text: {
    color: "white",
  },
  text_button: {
    fontWeight: "bold",
  },
  text_link: {
    color: "gray",
  },
});

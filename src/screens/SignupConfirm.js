import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";
import SomeButtons from "../components/somebuttons";
export default function SignupConfirmScreen({ navigation }) {
  const [authcode, setauthcode] = useState("");

  const onConfirmPressed = () => console.warn("Warning");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm Sing up</Text>
        <UsernameInput
          placeholder="Authentication Code"
          value={authcode}
          setValue={setauthcode}
          secureTextEntry={false}
        />
        <CustomButton text="Confirm Registation" onPress={onConfirmPressed} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 0,
    backgroundColor: "white",
  },
  logo: {
    width: "70%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});

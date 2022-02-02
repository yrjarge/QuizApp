import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";
import SomeButtons from "../components/somebuttons";
export default function ResetPasswordScreen({ navigation }) {
  const [authcode, setauthcode] = useState("");
  const [newpassword, setNewPassword] = useState("");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>
        <UsernameInput
          placeholder="Enter Authentication Code"
          value={authcode}
          setValue={setauthcode}
          secureTextEntry={true}
        />
        <UsernameInput
          placeholder="Enter new Password"
          value={authcode}
          setValue={setauthcode}
          secureTextEntry={true}
        />
        <CustomButton text="Reset Password" onPress={onResetPressed} />
      </View>
    </ScrollView>
  );
}
const onResetPressed = () => {
  console.warn("Fitte");
};
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

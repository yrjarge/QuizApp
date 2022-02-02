import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";

const resetLogo = require("../../assets/images/reset.png");

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const auth = getAuth();

  const onSendPressed = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
        setWrongEmail(false);
      })
      .catch((error) => {
        console.warn(error);
        setEmailSent(false);
        setWrongEmail(true);
      });
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset your Password</Text>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Image source={resetLogo} style={styles.logo} />
          </View>
          <UsernameInput
            placeholder="Insert Email"
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
            style={styles.inputField}
          />
          {emailSent && (
            <Text style={styles.text}>
              Email sent! Follow instructions in email to reset your password
            </Text>
          )}
          {wrongEmail && (
            <Text style={styles.text}>
              No user is registered with this E-mail
            </Text>
          )}
          <CustomButton text="Send" onPress={onSendPressed} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 0,
    backgroundColor: "white",
    height: "100%",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  logo: {
    width: "51%",
    height: "70%",
    resizeMode: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
    paddingTop: 15,
  },
  container: {
    width: "70%",
  },
  innerContainer: {
    height: "60%",
    justifyContent: "center",
  },
  inputField: {
    textAlign: "center",
    paddingVertical: 15,
    borderStyle: "dotted",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    paddingVertical: 15,
  },
});

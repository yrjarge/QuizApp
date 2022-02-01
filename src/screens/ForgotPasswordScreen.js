import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";
import SomeButtons from "../components/somebuttons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const auth = getAuth();
  const onSendPressed = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        console.warn(error);
        setWrongEmail(true);
      });
  };

  if (emailSent) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset your Password</Text>
          <UsernameInput
            placeholder="Insert Email"
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
          <Text>
            Email sent! Follow instructions in email to reset your password
          </Text>
          <CustomButton text="Send" onPress={onSendPressed} />
        </View>
      </ScrollView>
    );
  } else if (wrongEmail) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset your Password</Text>
          <UsernameInput
            placeholder="Insert Email"
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
          <Text>No user is registered with this E-mail</Text>
          <CustomButton text="Send" onPress={onSendPressed} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset your Password</Text>
          <UsernameInput
            placeholder="Insert Email"
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
          <CustomButton text="Send" onPress={onSendPressed} />
        </View>
      </ScrollView>
    );
  }
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

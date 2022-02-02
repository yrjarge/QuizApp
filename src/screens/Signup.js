import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";
import SomeButtons from "../components/somebuttons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const auth = getAuth();
  const onSignInPressed = () => {
    navigation.navigate("Login");
  };
  const onRegisterPressed = () => {
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        //creates UserEntry in Firestore wiht mail and password: how to store username etc ?
        const userID = auth.currentUser.uid;
        const db = getDatabase();
        set(ref(db, "user/" + userID), {
          name: username,
          email: mail,
          total_score: 0,
          available_score: 0,
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.error("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          console.error("That email address is invalid!");
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
      <View style={styles.inputContainer}>
        <UsernameInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
        />
        <UsernameInput
          placeholder="Email"
          value={mail}
          setValue={setMail}
          secureTextEntry={false}
        />
        <UsernameInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <UsernameInput
          placeholder="Confirm password"
          value={password2}
          setValue={setPassword2}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.questionContainer}>
        <CustomButton
          text="Register"
          onPress={onRegisterPressed}
          bgcolor={"#1e3b52"}
        />
        <CustomButton
          text="Already have an Account? Sign in here!"
          onPress={onSignInPressed}
          type={"link"}
        />
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
  logo: {
    width: "70%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  questionContainer: {
    marginTop: 25,
    width: "70%",
  },
  inputContainer: {
    alignItems: "center",
    margin: 5,
  },
});

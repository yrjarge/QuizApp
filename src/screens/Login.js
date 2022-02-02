import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import quizlogo from "../../assets/images/quizlogo.jpg";
import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";
import SomeButtons from "../components/somebuttons";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const auth = getAuth();

  const onSignInPressed = () => {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(error.message);
      });
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("Forgot Password");
  };

  const onSignupPressed = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.root}>
      <Image
        source={quizlogo}
        resizeMode="contain"
        style={(styles.logo, { height: height * 0.3 })}
      />
      <View style={styles.inputContainer}>
        <UsernameInput
          placeholder="E-mail"
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
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Sign in"
          onPress={onSignInPressed}
          bgcolor={"#1e3b52"}
        />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type={"link"}
        />
        <CustomButton
          text="Don't have an account? Sign Up here!"
          onPress={onSignupPressed}
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
  buttonContainer: {
    width: "70%",
    marginTop: 25,
  },
  inputContainer: {
    alignItems: "center",
    margin: 5,
  },
});

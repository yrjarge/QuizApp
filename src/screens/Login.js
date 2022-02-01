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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={quizlogo}
          resizeMode="contain"
          style={(styles.logo, { height: height * 0.3 })}
        />

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
        <CustomButton text="Sign in" onPress={onSignInPressed} />
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
    </ScrollView>
  );
}

const onSignInPressed = () => {
  console.warn("sign in");
};
const onSignupPressed = () => {
  console.warn("singup");
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
});

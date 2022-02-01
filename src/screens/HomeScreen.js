import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  Button,
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import SessionContext from "../context/SessionToken/sessionContext";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { Avatar } from "react-native-elements";
import CustomButton from "../components/custombutton";
import quizlogo from "../../assets/images/quizlogo.jpg";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const sessionContext = useContext(SessionContext);
  const { setToken } = sessionContext;
  const { height } = useWindowDimensions();
  const auth = getAuth();
  const db = getDatabase();
  const currentUser = auth.currentUser; //returns null if no user is logged in
  //Gets and sets username if user is logged ing
  if (currentUser) {
    const dbRef = ref(db);
    get(child(dbRef, `user/${currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const QuizForm = () => {
    navigation.navigate("QuizForm");
  };
  const SignUp = () => {
    navigation.navigate("Signup");
  };
  const Login = () => {
    navigation.navigate("Login");
  };
  //

  useEffect(() => {
    const startSession = async () => {
      await setToken();
    };
    startSession();
  }, []);
  if (!currentUser) {
    const ProfileClicked = () => {
      if (currentUser) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Login");
      }
    };
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={ProfileClicked}>
            <Avatar
              size={40}
              rounded
              icon={{ name: "person" }}
              containerStyle={{ backgroundColor: "#00a7f7" }}
            />
          </Pressable>
        ),
      });
    }, [navigation]);
    //if not logged in
    return (
      <View style={[styles.root, { height: height }]}>
        <Image
          source={quizlogo}
          resizeMode="contain"
          style={(styles.logo, { height: height * 0.3 })}
        />
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.title}>
          {" "}
          Press "Start new Quiz" to play as a guest!{" "}
        </Text>
        <View style={styles.questionContainer}>
          <CustomButton onPress={QuizForm} text="Start new Quiz!" />
          <CustomButton onPress={SignUp} text="Sign up!" />
          <CustomButton onPress={Login} text="Sign in!" />
        </View>
      </View>
    );
  } else {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={ProfileClicked}>
            <Avatar
              size={40}
              rounded
              icon={{ name: "person" }}
              containerStyle={{ backgroundColor: "#00a7f7" }}
            />
          </Pressable>
        ),
      });
    }, [navigation]);
    const ProfileClicked = () => {
      if (currentUser) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Login");
      }
    };
    return (
      //user is logged in
      <View style={[styles.root, { height: height }]}>
        <Image
          source={quizlogo}
          resizeMode="contain"
          style={(styles.logo, { height: height * 0.3 })}
        />
        <Text style={styles.title}>Welcome {username}!</Text>
        <View style={styles.questionContainer}>
          <CustomButton onPress={QuizForm} text="Start new Quiz!" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 0,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
    textAlign: "center",
  },
  questionContainer: {
    marginTop: 25,
    width: "70%",
  },
});

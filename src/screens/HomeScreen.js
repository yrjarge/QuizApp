import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { Avatar } from "react-native-elements";

import SessionContext from "../context/SessionToken/sessionContext";
import QuestionContext from "../context/Questions/questionContext";
import ScoreContext from "../context/Score/scoreContext";

import CustomButton from "../components/custombutton";
import quizlogo from "../../assets/images/quizlogo.jpg";
import fetchQuestions from "../fetch/getQuestions";
import { firebase } from "@react-native-firebase/auth";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const sessionContext = useContext(SessionContext);
  const questionContext = useContext(QuestionContext);
  const scoreContext = useContext(ScoreContext);

  const { setToken } = sessionContext;
  const { setQuestions } = questionContext;
  const { resetScore } = scoreContext;

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
  const Quiz = async () => {
    resetScore();
    let quizData = {
      amount: "default",
      category: "default",
      difficulty: "default",
      type: "default",
    };
    const questions = await fetchQuestions(quizData);
    setQuestions(questions);
    navigation.navigate("Quiz");
  };
  //

  useEffect(() => {
    const startSession = async () => {
      await setToken();
    };
    startSession();
  }, []);

  const ProfileClicked = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Login");
      }
    });
  };
  if (!currentUser) {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={ProfileClicked}>
            <Avatar
              size={40}
              rounded
              icon={{ name: "person" }}
              containerStyle={{ backgroundColor: "#00c1d4", marginBottom: 5 }}
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
        <Text style={styles.subTitle}>
          Press "Start new Quiz" to play as a guest!
        </Text>
        <View style={styles.questionContainer}>
          <CustomButton onPress={Quiz} text="Quickstart!" bgcolor={"#00c1d4"} />
          <CustomButton
            onPress={QuizForm}
            text="Start new Quiz!"
            bgcolor={"#ffc201"}
          />
          <CustomButton onPress={SignUp} text="Sign up!" bgcolor={"#1e3b52"} />
          <CustomButton onPress={Login} text="Sign in!" bgcolor={"#1e3b52"} />
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
              containerStyle={{ backgroundColor: "#00c1d4" }}
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
          <CustomButton onPress={Quiz} text="Quickstart!" bgcolor={"#00c1d4"} />
          <CustomButton
            onPress={QuizForm}
            text="Start new Quiz!"
            bgcolor={"#ffc201"}
          />
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
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#051C60",
    textAlign: "center",
  },
  questionContainer: {
    marginTop: 25,
    width: "70%",
  },
});

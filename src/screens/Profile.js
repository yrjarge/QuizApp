import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
} from "react-native";
import quizlogo from "../../assets/images/quizlogo.jpg";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import CustomButton from "../components/custombutton";
export default function Profile({ navigation }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState(1);
  const [max_score, setMaxScore] = useState(1);
  const { height } = useWindowDimensions();

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const dbRef = ref(db);

  const onStartNewQuizPressed = () => {
    navigation.navigate("QuizForm");
  };
  const SignOut = () => {
    auth.signOut();
    navigation.navigate("Home");
  };
  if (user) {
    const userID = auth.currentUser.uid;
    get(child(dbRef, `user/${userID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let tempUser = snapshot.val();
          setName(tempUser.name);
          setScore(tempUser.total_score);
          setMaxScore(tempUser.available_score);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image
          source={quizlogo}
          resizeMode="contain"
          style={(styles.logo, { height: height * 0.3 })}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}> Username: {name} </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}> Total score: {score} </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Quiz accuracy:{" "}
          {score / max_score != NaN
            ? Number(score / max_score).toFixed(2) * 100 + "%"
            : "No history"}
        </Text>
      </View>
      <View style={styles.button}>
        <CustomButton text="Sign Out" onPress={SignOut} bgcolor={"#00c1d4"} />
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
  logoContainer: {
    marginBottom: 15,
  },
  container: {
    width: "70%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#1e3b52",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    width: "70%",
  },
});

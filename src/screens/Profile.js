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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={quizlogo}
          resizeMode="contain"
          style={(styles.logo, { height: height * 0.3 })}
        />
        <View style={styles.container}>
          <Text style={styles.text}> Username: {name} </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}> Total score: {score} </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}> Correct Ratio: {score / max_score} </Text>
        </View>
        <CustomButton text="Sign Out" onPress={SignOut} />
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
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3B71F3",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

import React, { useContext, useState, useEffect } from "react";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { Text, Button, View, StyleSheet, ImageBackground } from "react-native";
import ScoreContext from "../context/Score/scoreContext";
import { getAuth } from "firebase/auth";

const wallpaper = require("../../assets/images/wallpaper.jpg");
const knownlegde = require("../../assets/images/knownlegde.jpg");

export default function CongratzScreen({ navigation }) {
  const scoreContext = useContext(ScoreContext);
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const { score, maxScore } = scoreContext;
  const db = getDatabase();

  useEffect(() => {
    if (auth.currentUser != null) {
      updateScore(auth.currentUser.uid);
    }
  }, []);

  const updateScore = (userID) => {
    if (userID) {
      const dbRef = ref(db);
      get(child(dbRef, `user/${userID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let tempUser = snapshot.val();
            setUsername(tempUser.name);
            let newscore = tempUser.total_score ? tempUser.total_score : 0;
            newscore += score;
            const userUpdate = {
              email: tempUser.email,
              name: tempUser.name,
              total_score: newscore,
            };
            set(ref(db, "user/" + userID), userUpdate);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <ImageBackground source={knownlegde} style={styles.image}>
      <View style={styles.congratz_container}>
        <Text style={styles.score}>
          Your Score was {score} out of {maxScore}
        </Text>
        <Button
          title="Start new Quiz!"
          color={"#1e3b52"}
          onPress={() => navigation.navigate("QuizForm")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  score: {
    fontSize: 20,
    fontWeight: "800",
    margin: 30,
  },
  image: {
    height: "100%",
    width: "100%",
  },

  congratz_container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});

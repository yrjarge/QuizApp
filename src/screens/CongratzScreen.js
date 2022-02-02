import React, { useContext, useState, useEffect } from "react";
import { getDatabase, ref, child, get, set } from "firebase/database";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import ScoreContext from "../context/Score/scoreContext";
import { getAuth } from "firebase/auth";
import { Avatar } from "react-native-elements";

import Button from "../components/Button";

const wallpaper = require("../../assets/images/wallpaper.jpg");
const knownlegde = require("../../assets/images/knownledge_edited.jpg");

export default function CongratzScreen({ navigation }) {
  const scoreContext = useContext(ScoreContext);
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const { score, maxScore } = scoreContext;
  const db = getDatabase();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (auth.currentUser != null) {
      updateScore(auth.currentUser.uid);
    }
  }, []);

  const ProfileClicked = () => {
    if (currentUser) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Login");
    }
  };
  //
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

  const updateScore = (userID) => {
    if (currentUser) {
      const dbRef = ref(db);
      get(child(dbRef, `user/${userID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let tempUser = snapshot.val();
            setUsername(tempUser.name);
            let newscore = tempUser.total_score ? tempUser.total_score : 0;
            let available = tempUser.available_score
              ? tempUser.available_score
              : 0;
            newscore += score;
            available += maxScore;
            const userUpdate = {
              email: tempUser.email,
              name: tempUser.name,
              total_score: newscore,
              available_score: available,
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
    color: "white",
    paddingTop: 100,
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

import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { getAuth } from "firebase/auth";
import { Avatar } from "react-native-elements";

import QuestionContext from "../context/Questions/questionContext";

import Question from "../components/Question";
import MyText from "../components/MyText";

export default function Quiz({ navigation }) {
  const questionContext = useContext(QuestionContext);
  // Here you have access to all of the questions with questions[i].type, questions[i].correct_answer...
  const { results } = questionContext;
  // state for indexing questionslist
  const [index, setIndex] = useState(0);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (index >= results.length) {
      setIndex(0);
    }
  }, [index]);

  const ProfileClicked = () => {
    if (currentUser) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Signup");
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
            containerStyle={{ backgroundColor: "#00c1d4", marginBottom: 5 }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  if (index < results.length) {
    return (
      <View>
        <Text style={styles.sectionTitle}>
          Question {index + 1} / {results.length}
        </Text>
        <Question question={results[index]} setIndex={setIndex} index={index} />
      </View>
    );
  } else {
    navigation.navigate("Congratz");
    return null;
  }
}

const styles = StyleSheet.create({
  post: {
    height: "90%",
    backgroundColor: "#E2F0F0",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
  sectionTitle: {
    fontSize: 15,
    color: "black",
    marginTop: 2,
    textAlign: "center",
    fontWeight: "bold",
  },
});

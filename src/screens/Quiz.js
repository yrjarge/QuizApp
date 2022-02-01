import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import QuestionContext from "../context/Questions/questionContext";

import Question from "../components/Question";
import MyText from "../components/MyText";

export default function Quiz({ navigation }) {
  const questionContext = useContext(QuestionContext);
  // Here you have access to all of the questions with questions[i].type, questions[i].correct_answer...
  const { results } = questionContext;
  // state for indexing questionslist
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= results.length) {
      setIndex(0);
    }
  }, [index]);

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
    marginLeft: 8,
    marginTop: 2,
  },
});

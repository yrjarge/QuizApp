import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

import he from "he";

import ScoreContext from "../context/Score/scoreContext";

import Answers from "./Answers";

const chalkboard = require("../../assets/images/chalkboard.jpg");

const Question = ({ question, setIndex, index }) => {
  const scoreContext = useContext(ScoreContext);

  const { updateScore } = scoreContext;

  const [correct, setCorrect] = useState();
  const [alternatives, setAlternatives] = useState();

  //For shuffeling of the answers using Knuth-shuffle
  const shuffle = (options) => {
    let answers = [...options];
    let i = answers.length,
      randomIndex;
    while (i != 0) {
      //pick index
      randomIndex = Math.floor(Math.random() * i);
      i--;
      //swap
      [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
    }
    return answers;
  };

  useEffect(() => {
    setCorrect(question.correct_answer);
    //Shuffles to ensure random placement of correct answer
    let shuffled = shuffle([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);
    setAlternatives(shuffled);
  }, [question]);

  if ((alternatives != undefined) & (correct != undefined)) {
    return (
      <ImageBackground
        source={chalkboard}
        style={styles.image_container}
        imageStyle={styles.image_style}
      >
        <View style={styles.postHeader}>
          <Text style={styles.textQuestion} adjustsFontSizeToFit>
            {he.decode(question.question)}
          </Text>
        </View>
        <Answers
          alternatives={alternatives}
          correct={correct}
          updateScore={updateScore}
          setIndex={setIndex}
          index={index}
          styles={styles}
        />
      </ImageBackground>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  image_container: {
    height: "95%",
    width: "95%",
  },
  image_style: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    //backgroundColor: "#E2F0F0",
    justifyContent: "center", //Centered vertically
  },
  postHeader: {
    alignItems: "center",
    padding: 20,
    margin: 20,
    marginBottom: 40,
  },
  options: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  optionBox: {
    width: 125,
    height: 125,
    // backgroundColor: "#228CDB",
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  shadowBox: {
    shadowColor: "blue",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  textOption: {
    color: "black",
    fontSize: 18,
  },
  textQuestion: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Question;

import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getAuth } from "firebase/auth";
import { Avatar } from "react-native-elements";

import fetchQuestions from "../fetch/getQuestions";
import fetchCategories from "../fetch/getCategories";
import Button from "../components/Button";

import QuestionContext from "../context/Questions/questionContext";
import SessionContext from "../context/SessionToken/sessionContext";
import ScoreContext from "../context/Score/scoreContext";

const chalkboard_question = require("../../assets/images/chalkboard_question.jpg");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  pickerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    borderStyle: "solid",
  },
  picker: {
    width: "100%",
  },
});
export default function QuizForm({ navigation }) {
  const questionContext = useContext(QuestionContext);
  const sessionContext = useContext(SessionContext);
  const scoreContext = useContext(ScoreContext);

  const { setQuestions } = questionContext;
  const { token } = sessionContext;
  const { resetScore } = scoreContext;

  const [amount, setAmount] = useState("default");
  const [category, setCategory] = useState("default");
  const [difficulty, setDifficulty] = useState("default");
  const [type, setType] = useState("default");

  const [categories_dict, setCategoriesDict] = useState();
  const [categories, setCategories] = useState();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const getCategories = async () => {
      let categories_dict = await fetchCategories();
      let categories = Object.keys(categories_dict);
      setCategoriesDict(categories_dict);
      setCategories(categories);
    };
    getCategories();
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

  const list = ["5", "10", "15", "20", "25", "30"];

  const getQuestions = async () => {
    resetScore();
    const quizData = {
      amount: amount,
      category:
        categories_dict[category] == undefined
          ? "default"
          : categories_dict[category],
      difficulty: difficulty,
      type: type,
      token: token,
    };
    const questions = await fetchQuestions(quizData);
    switch (questions.response_code) {
      case 0:
        setQuestions(questions);
        const success = () => navigation.navigate("Quiz");
        success();
        break;
      case 1:
        alert("Not enough questions in this category");
        break;
    }
  };

  return (
    <ImageBackground source={chalkboard_question} style={styles.container}>
      <View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={amount}
            onValueChange={(value, index) => setAmount(value)}
            itemStyle={{ height: 110 }}
          >
            <Picker.Item
              label="Choose the number of questions"
              value="default"
            />
            {list.map((val, i) => {
              return <Picker.Item label={val} value={val} key={i} />;
            })}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={(value, index) => setCategory(value)}
            itemStyle={{ height: 110 }}
          >
            <Picker.Item label="Please select your category" value="default" />
            {categories != null &&
              categories.map((cat, i) => {
                return <Picker.Item label={cat} value={cat} key={i} />;
              })}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={difficulty}
            onValueChange={(value, index) => setDifficulty(value)}
            itemStyle={{ height: 110 }}
          >
            <Picker.Item
              label="Please select your difficulty"
              value="default"
            />
            <Picker.Item label="Mixed" value="mixed" />
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={type}
            onValueChange={(value, index) => setType(value)}
            itemStyle={{ height: 110 }}
          >
            <Picker.Item label="Please select your Type" value="default" />
            <Picker.Item label="Both" value="both" />
            <Picker.Item label="Multiple choice" value="multiple" />
            <Picker.Item label="True/False" value="boolean" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={getQuestions} color={"#1e3b52"} title="Start" />
        </View>
      </View>
    </ImageBackground>
  );
}

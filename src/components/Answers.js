import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

import he from "he";

import MyText from "../components/MyText";

const Answers = ({
  alternatives,
  correct,
  updateScore,
  setIndex,
  index,
  styles,
}) => {
  const [clicked, setClicked] = useState(false);

  const feedback = (guess) => {
    setClicked(true);
    updateScore(guess == correct);
    setTimeout(() => {
      setIndex(index + 1);
      setClicked(false);
    }, 100);
  };
  return (
    <View style={styles.options}>
      {alternatives.map((val, i) => (
        <View style={[styles.option]} key={i}>
          <Pressable
            key={i}
            disabled={clicked}
            style={({ pressed }) => [
              {
                backgroundColor: pressed // sets color of picked option to green if correct, and red if incorrect
                  ? val == correct
                    ? "#3eed4f"
                    : "#e64545"
                  : "white",
              },
              pressed ? { opacity: 0.9 } : {},
              styles.optionBox,
              styles.shadowBox,
            ]}
            onPress={() => {
              feedback(val);
            }}
          >
            <Text style={styles.textOption} adjustsFontSizeToFit>
              {he.decode(val)}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default Answers;

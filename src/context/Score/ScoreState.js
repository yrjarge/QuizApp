import React, { useReducer } from "react";

import ScoreContext from "./scoreContext";
import scoreReducer from "./scoreReducer";

const ScoreState = (props) => {
  const initialState = {
    score: 0,
    maxScore: 0,
  };

  const [state, dispatch] = useReducer(scoreReducer, initialState);

  // Update Score
  const updateScore = (correct) => {
    dispatch({
      type: "UPDATE_SCORE",
      payload: correct,
    });
  };

  // Reset Score
  const resetScore = () => {
    dispatch({
      type: "RESET_SCORE",
    });
  };

  return (
    <ScoreContext.Provider
      value={{
        score: state.score,
        maxScore: state.maxScore,
        updateScore,
        resetScore,
      }}
    >
      {props.children}
    </ScoreContext.Provider>
  );
};

export default ScoreState;

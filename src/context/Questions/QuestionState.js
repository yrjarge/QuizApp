import React, { useReducer } from "react";

import QuestionContext from "./questionContext";
import questionReducer from "./questionReducer";
import fetchQuestions from "../../fetch/getQuestions";

const QuestionState = (props) => {
  const initialState = {
    response_code: null,
    results: null,
  };

  const [state, dispatch] = useReducer(questionReducer, initialState);

  // Set Questions
  const setQuestions = async (res) => {
    dispatch({
      type: "SET_QUESTIONS",
      payload: res,
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        response_code: state.response_code,
        results: state.results,
        setQuestions,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;

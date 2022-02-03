import React, { useReducer } from "react";

import SessionContext from "./sessionContext";
import sessionReducer from "./sessionReducer";
import fetchSessionToken from "../../fetch/getSessionToken";

const SessionState = (props) => {
  const initialState = {
    response_code: null,
    response_message: null,
    token: null,
  };

  const [state, dispatch] = useReducer(sessionReducer, initialState);

  // Set SessionToken
  const setToken = async () => {
    let res = await fetchSessionToken();
    switch (res.response_code) {
      case 0:
        dispatch({
          type: "SET_TOKEN",
          payload: res,
        });
        break;
      case 1:
        break;
      default:
        break;
    }
  };

  return (
    <SessionContext.Provider
      value={{
        response_code: state.response_code,
        response_message: state.response_message,
        token: state.token,
        setToken,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionState;

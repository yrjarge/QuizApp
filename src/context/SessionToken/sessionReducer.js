export default (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        response_code: action.payload.response_code,
        response_message: action.payload.response_message,
      };
    default:
      return state;
  }
};

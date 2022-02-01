export default (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        results: action.payload.results,
        response_code: action.payload.response_code,
      };
    default:
      return state;
  }
};

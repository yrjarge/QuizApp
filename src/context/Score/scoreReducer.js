export default (state, action) => {
  switch (action.type) {
    case "UPDATE_SCORE":
      return {
        ...state,
        score: action.payload ? state.score + 1 : state.score,
        maxScore: state.maxScore + 1,
      };
    case "RESET_SCORE":
      return {
        ...state,
        score: 0,
        maxScore: 0,
      };
    default:
      return state;
  }
};

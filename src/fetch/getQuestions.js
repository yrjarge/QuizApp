import axios from "axios";

const buildQuery = (quizData) => {
  let string = "";
  if (quizData.amount != "default") {
    string += `amount=${quizData.amount}`;
  } else {
    string += `amount=10`;
  }
  if (quizData.category != "default") {
    string += `&category=${quizData.category}`;
  }
  if ((quizData.difficulty != "default") & (quizData.difficulty != "mixed")) {
    string += `&difficulty=${quizData.difficulty}`;
  }
  if ((quizData.type != "default") & (quizData.type != "both")) {
    string += `&type=${quizData.type}`;
  }
  return string;
};

const fetchQuestions = async (quizData) => {
  let query = buildQuery(quizData);
  try {
    let response = await axios.get(`https://opentdb.com/api.php?${query}`);
    // checks if sessionToken has expired
    if (response.data.response_code == 4) {
      console.log("happened");
      const token = await axios.get(
        `https://opentdb.com/api_token.php?command=reset&token=${quizData.token}`
      );
      console.log(token.data);
      const new_quizData = { ...quizData, token: token.data.token };
      console.log({ new_quizData });
      console.log({ quizData });
      const new_query = buildQuery(new_quizData);
      response = await axios.get(`https://opentdb.com/api.php?${new_query}`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchQuestions;

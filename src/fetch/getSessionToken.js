import axios from "axios";

const fetchSessionToken = async () => {
  try {
    const response = await axios.get(
      `https://opentdb.com/api_token.php?command=request`
    );
    return response.data;
  } catch (error) {
    const response = error;
    return response;
  }
};

export default fetchSessionToken;

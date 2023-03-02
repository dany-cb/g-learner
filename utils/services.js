import axios from "axios";

export const request = async (requestOptions) => {
  let response;
  try {
    const { data } = await axios({
      ...requestOptions,
    });
    response = { data };
  } catch (error) {
    response = { error };
  }
  return response;
};

export const getAllQuiz = async () => {
  const requestOptions = {
    method: "GET",
    url: "http://localhost:3000/quiz",
  };
  const response = await request(requestOptions);
  return response;
};

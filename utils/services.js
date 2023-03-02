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

export const getFeed = async () => {
  const requestOptions = {
    method: "GET",
    url: "http://localhost:5000/",
  };
  const response = await request(requestOptions);
  return response;
};

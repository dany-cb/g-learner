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

export const getFeed = async (key) => {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:5000/",
    data: {
      keywords: key,
    },
  };
  const response = await request(requestOptions);
  return response;
};

export const getArticles = async (key) => {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:5000/getMediumArticles",
    data: {
      keywords: key,
    },
  };
  const response = await request(requestOptions);
  return response;
};

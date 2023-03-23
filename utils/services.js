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
    url: "http://127.0.0.1:5000/",
    data: {
      keywords: key,
    },
  };
  const response = await request(requestOptions);
  return response;
};

export const getFeedNew = async (key) => {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:49990/",
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

export const getVideo = async (key) => {
  const word = encodeURI(key);
  const options = {
    method: "GET",
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&id=${word}&maxResults=21&order=viewCount&key=AIzaSyDKk59knaQEj6jJpoJhv1UnytXFBVADfy0`,
  };
  const response = await request(options);
  return response;
};

import {axiosInstance} from "./axiosInstance";

export const loginApi = async (body) => {
  body = JSON.stringify(body);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const {data} = await axiosInstance.post("/api/login", body, config);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

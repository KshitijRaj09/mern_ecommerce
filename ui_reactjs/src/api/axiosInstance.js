import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_APIBaseUrl,
  headers: {
    ["Content-Type"]: "application/json",
  },
});

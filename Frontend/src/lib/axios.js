import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"   // local
    : "https://nex-chat-y6mq.onrender.com/api"; // prod

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

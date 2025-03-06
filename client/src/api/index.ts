import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:300/api",
  withCredentials: true,
});

export default api;

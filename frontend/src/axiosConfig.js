import axios from "axios";

// axios.defaults.baseURL =
//   // process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "/"
//   axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default instance;

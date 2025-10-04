// import axios from "axios";

// // axios.defaults.baseURL =
// //   // process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "/"
// //   axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// // axios.defaults.withCredentials = true;

// const axios1 = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
//   withCredentials: true,
// });

// export default axios1;

import axios from "axios";

const axios1 = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

// ✅ Attach JWT from localStorage to every request
axios1.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    if (token) {
      config.headers.access_token = token; // 👈 matches your backend middleware
    }
  }
  return config;
});

export default axios1;

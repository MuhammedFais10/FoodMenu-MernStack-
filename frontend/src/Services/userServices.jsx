// userService.js
import axios1 from "../axiosConfig"

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = async (email, password) => {
  const { data } = await axios1?.post("/api/users/login", { email, password });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const register = async (registerData) => {
  const { data } = await axios1?.post("/api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const updateProfile = async (user) => {
  const { data } = await axios1?.put("/api/users/updateProfile", user);
  localStorage.setItem("user", JSON.stringify(data));

  return data;
};

export const changePassword = async (passwords) => {
  try {
    await axios1?.put("/api/users/changePassword", passwords);
  } catch (error) {
    console.error(
      "Change password failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAll = async (searchTerm) => {
  const { data } = await axios1?.get("/api/users/getAll/" + (searchTerm ?? ""));
  return data;
};

export const toggleBlock = async (userId) => {
  const { data } = await axios1?.put("/api/users/toggleBlock/" + userId);
  return data;
};

export const getById = async (userId) => {
  const { data } = await axios1?.get("/api/users/getById/" + userId);
  return data;
};

export const updateUser = async (userData) => {
  const { data } = await axios1?.put("/api/users/update", userData);
  return data;
};

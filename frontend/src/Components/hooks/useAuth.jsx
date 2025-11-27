// useAuth.jsx

import { useState, useEffect, createContext, useContext } from "react";
import * as userService from "../../Services/userServices.jsx";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Run once on app refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setAuthLoading(false); // auth check finished
  }, []);

  const login = async (email, password) => {
    try {
      const loggedUser = await userService.login(email, password);
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  const register = async (data) => {
    try {
      const newUser = await userService.register(data);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Register Successful");
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    }
  };

  const logout = (onLogout) => {
    userService.logout();
    if (onLogout) onLogout(); // CLEAR USER CART
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout Successful");
  };

  const updateProfile = async (user) => {
    try {
      const updatedUser = await userService.updateProfile(user);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile update successful");
    } catch (err) {
      toast.error(err.response?.data || "Update failed");
    }
  };

  const changePassword = async (passwords) => {
    await userService.changePassword(passwords);
    logout();
    toast.success("Password changed successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        changePassword,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

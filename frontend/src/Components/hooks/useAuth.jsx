import { useState, createContext, useContext } from 'react';
import * as userService from '../../Services/userServices.jsx';
import { toast } from 'react-toastify';
import { useCart } from './useCart';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser() || {});
  const { clearCart } = useCart(); // Ensure this is within CartProvider


  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      clearCart(); // Clear the cart after login
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const register = async data => {
    try {
      const user = await userService.register(data);
      setUser(user);
      clearCart(); // Clear the cart after registration
      toast.success('Register Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  
    clearCart(); 
    toast.success('Logout Successful');
  };

  const updateProfile = async (user) => {
    try {
      const updatedUser = await userService.updateProfile(user);
      if (updatedUser) setUser(updatedUser);
      toast.success("Profile Update Was Successful");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const changePassword = async passwords => {
    await userService.changePassword(passwords);
    logout();
    toast.success('Password Changed Successfully, Please Login Again!');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import { Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Home/Homepage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import OrderTrack from "./pages/OrderTrack/OrderTrack";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import FoodsAdminPage from "./pages/FoodsAdminPage/FoodsAdminPage";
import FoodEditpage from "./pages/FoodEdit/FoodEditpage";
import UserPage from "./pages/UserPage/UserPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";

function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/:searchTerm" element={<Homepage />} />
        <Route path="/tag/:tag" element={<Homepage />} />
        <Route path="/foods/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/checkout"
          element={
            <AuthRoute> 
              <CheckoutPage />
            </AuthRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthRoute>
              <PaymentPage />
            </AuthRoute>
          }
        />
        <Route
          path="/track/:orderId"
          element={
            <AuthRoute>
              <OrderTrack />
            </AuthRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AuthRoute>
              <ProfilePage />
            </AuthRoute>
          }
        />

        <Route
          path="/orders/:filter?"
          element={
            <AuthRoute>
              <OrdersPage />
            </AuthRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route
          path="/admin/foods/:searchTerm?"
          element={
            <AdminRoute>
              <FoodsAdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addFood"
          element={
            <AdminRoute>
              <FoodEditpage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/editFood/:foodId"
          element={
            <AdminRoute>
              <FoodEditpage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users/:searchTerm?"
          element={
            <AdminRoute>
              <UserPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/editUser/:userId"
          element={
            <AdminRoute>
              <UserEditPage />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRouter;

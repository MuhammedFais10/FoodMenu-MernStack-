import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  fetchCart,
  addCartItem,
  removeCartItem,
  clearUserCart,
} from "../../Services/CartService.jsx";

const CartContext = createContext(null);

// Empty cart structure
const EMPTY_CART = { items: [], totalPrice: 0, totalCount: 0 };

export default function CartProvider({ children }) {
  const { user, authLoading } = useAuth();
  const [cart, setCart] = useState(EMPTY_CART);

  // Unique local key for guests
  const CART_KEY = user ? null : "cart_guest";

  // ---------------------------------------------------
  // 🟢 1) Load cart when login/logout happens
  // ---------------------------------------------------
  useEffect(() => {
    if (authLoading) return;

    // Logged-in user → fetch from backend
    if (user) {
      fetchCart()
        .then((serverCart) => {
          const items = serverCart.map((i) => ({
            food: i.food,
            quantity: i.quantity,
            price: i.food.price * i.quantity,
          }));

          updateCart(items, false); // no localStorage update
        })
        .catch(() => setCart(EMPTY_CART));
      return;
    }

    // Guest user → load from localStorage
    const stored = localStorage.getItem("cart_guest");
    setCart(stored ? JSON.parse(stored) : EMPTY_CART);
  }, [authLoading, user]);

  // ---------------------------------------------------
  // 🟢 Save cart for guest only
  // ---------------------------------------------------
  useEffect(() => {
    if (user) return; // logged-in => backend handles it
    localStorage.setItem("cart_guest", JSON.stringify(cart));
  }, [cart, user]);

  // ---------------------------------------------------
  // 🟢 Update cart state helper
  // ---------------------------------------------------
  const updateCart = (newItems, saveToLocal = true) => {
    const totalPrice = newItems.reduce((t, i) => t + i.price, 0);
    const totalCount = newItems.reduce((t, i) => t + i.quantity, 0);

    const newCart = { items: newItems, totalPrice, totalCount };
    setCart(newCart);

    if (!user && saveToLocal) {
      localStorage.setItem("cart_guest", JSON.stringify(newCart));
    }
  };

  // ---------------------------------------------------
  // 🟢 Add Item
  // ---------------------------------------------------
  const addToCart = async (food) => {
    // Logged-in user → update DB cart
    if (user) {
      const updated = await addCartItem(food._id);
      const items = updated.map((i) => ({
        food: i.food,
        quantity: i.quantity,
        price: i.food.price * i.quantity,
      }));
      return updateCart(items, false);
    }

    // Guest user → local storage only
    const exists = cart.items.find((i) => i.food._id === food._id);

    let newItems;
    if (exists) {
      newItems = cart.items.map((i) =>
        i.food._id === food._id
          ? {
              ...i,
              quantity: i.quantity + 1,
              price: food.price * (i.quantity + 1),
            }
          : i
      );
    } else {
      newItems = [...cart.items, { food, quantity: 1, price: food.price }];
    }

    updateCart(newItems);
  };

  // ---------------------------------------------------
  // 🟢 Change Quantity
  // ---------------------------------------------------
  const changeQuantity = async (item, qty) => {
    if (qty <= 0) return removeFromCart(item.food._id);

    if (user) {
      // Remove and re-add logic
      await removeCartItem(item.food._id);
      for (let i = 0; i < qty; i++) await addCartItem(item.food._id);

      const updated = await fetchCart();
      const items = updated.map((i) => ({
        food: i.food,
        quantity: i.quantity,
        price: i.food.price * i.quantity,
      }));

      return updateCart(items, false);
    }

    const newItems = cart.items.map((i) =>
      i.food._id === item.food._id
        ? { ...i, quantity: qty, price: i.food.price * qty }
        : i
    );

    updateCart(newItems);
  };

  // ---------------------------------------------------
  // 🟢 Remove Item
  // ---------------------------------------------------
  const removeFromCart = async (foodId) => {
    if (user) {
      const updated = await removeCartItem(foodId);

      const items = updated.map((i) => ({
        food: i.food,
        quantity: i.quantity,
        price: i.food.price * i.quantity,
      }));

      return updateCart(items, false);
    }

    const newItems = cart.items.filter((i) => i.food._id !== foodId);
    updateCart(newItems);
  };

  // ---------------------------------------------------
  // 🟢 Clear Cart
  // ---------------------------------------------------
  const clearCart = async () => {
    if (user) {
      await clearUserCart();
      return setCart(EMPTY_CART);
    }

    localStorage.removeItem("cart_guest");
    setCart(EMPTY_CART);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Safe hook
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

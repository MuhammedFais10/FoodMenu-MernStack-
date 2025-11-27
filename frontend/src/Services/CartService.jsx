import axios1 from "../axiosConfig";

// Fetch logged user's cart
export const fetchCart = async () => {
  const { data } = await axios1.get("/api/users/cart");
  return data.cart;
};

// Add food to cart
export const addCartItem = async (foodId) => {
  const { data } = await axios1.post("/api/users/cart/add", { foodId });
  return data.cart;
};

// Remove item
export const removeCartItem = async (foodId) => {
  const { data } = await axios1.post("/api/users/cart/remove", { foodId });
  return data.cart;
};

// Clear cart
export const clearUserCart = async () => {
  const { data } = await axios1.post("/api/users/cart/clear");
  return data;
};

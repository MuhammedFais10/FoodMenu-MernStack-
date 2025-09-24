import axios from "../axiosConfig"

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get("/api/orders/newOrderForCurrentUser");

    return data;
  } catch (error) {
    console.error("Error fetching new order for current user:", error);
    throw error;
  }
};

export const pay = async (paymentId) => {
  try {
    const { data } = await axios?.put("/api/orders/pay", { paymentId });
    console.log(paymentId);
    return data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

export const trackOrderById = async (orderId) => {
  try {
    console.log("Order ID being sent to API:", orderId);
    const { data } = await axios.get(`/api/orders/track/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};


export const getAll = async (state) => {
  const { data } = await axios.get(`/api/orders/${state ?? ""}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/allstatus`);
  return data;
};

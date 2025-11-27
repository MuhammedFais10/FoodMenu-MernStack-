// import {
//   PayPalButtons,
//   PayPalScriptProvider,
//   usePayPalScriptReducer,
// } from "@paypal/react-paypal-js";
// import React, { useEffect } from "react";
// import { useLoading } from "../../Components/hooks/useLoading";
// import { pay } from "../../Services/orderService";
// import { useCart } from "../../Components/hooks/useCart";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function PaypalButtons({ order }) {
//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId:
//           "ARHh9qToh03DKqaHjWySYaZ9q6rNtqhOHIOxlaHGxKpy8ShGOLY9WVqhQbTXyd36zlSGxjrsIUkauzWQ",
//       }}
//     >
//       <Buttons order={order} />
//     </PayPalScriptProvider>
//   );
// }

// function Buttons({ order }) {
//   const { clearCart } = useCart();
//   const navigate = useNavigate();
//   const [{ isPending }] = usePayPalScriptReducer();
//   const { showLoading, hideLoading } = useLoading();
//   useEffect(() => {
//     isPending ? showLoading() : hideLoading();
//   });

//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: order.totalPrice,
//           },
//         },
//       ],
//     });
//   };

//   const onApprove = async (data, actions) => {
//     try {
//       const payment = await actions.order.capture();
//       const orderId = await pay(payment.id);
//       clearCart();
//       console.log(orderId);
      
//       toast.success("Payment Saved Successfully", "Success");
//       navigate(`/track/${orderId}`);
//     } catch (error) {
//       toast.error("Payment Save Failed", "Error");
//     }
//   };

//   const onError = (err) => {
//     toast.error("Payment Failed", "Error");
//   };

//   return (
//     <PayPalButtons
//       createOrder={createOrder}
//       onApprove={onApprove}
//       onError={onError}
//     />
//   );
// }


import React from "react";
import axios1 from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";
import { useLoading } from "../hooks/useLoading";
import { pay } from "../../Services/orderService";

export default function RazorpayButton({ order }) {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { showLoading, hideLoading } = useLoading();

  const handlePayment = async () => {
    try {
      showLoading();

      const { data } = await axios1.post(
        "/api/payment/razorpay/create-order", // ✅ must match backend
        {
          amount: order.totalPrice,
          orderId: order._id,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "FoodMine",
        description: "Food Order Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            const orderId = await pay(response.razorpay_payment_id);
            clearCart();
            toast.success("Payment Successful");
            navigate(`/track/${orderId}`);
          } catch {
            toast.error("Payment Save Failed");
          } finally {
            hideLoading();
          }
        },

        modal: {
          ondismiss: function () {
            hideLoading();
            toast.info("Payment Cancelled");
          },
        },

        prefill: {
          name: order.name,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function () {
        hideLoading();
        toast.error("Payment Failed");
      });

    } catch (error) {
      hideLoading();
      toast.error("Payment Failed");
    }
  };

  return (
    <button onClick={handlePayment} className="btn-primary">
      Pay ₹{order.totalPrice}
    </button>
  );
}

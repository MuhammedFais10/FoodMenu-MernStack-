// import React, { useEffect, useState } from "react";
// import classes from "./paymentPage.module.css";
// import { getNewOrderForCurrentUser } from "../../Services/orderService";
// import Title from "../../Components/Title/Title";
// import OrderItemsList from "../../Components/OrderItemsList/OrderItemsList";
// import Map from "../../Components/Map/Map";
// import PayPalButtons from "../../Components/PaypalButton/PaypalButton";

// export default function PaymentPage() {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getNewOrderForCurrentUser()
//       .then((data) => {
//         setOrder(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching order:", error);
//         setError("Failed to load order details. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className={classes.container}>
//         <div className={classes.content}>
//           <Title title="Order Form" fontSize="1.6rem" />
//           <p>Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={classes.container}>
//         <div className={classes.content}>
//           <Title title="Order Form" fontSize="1.6rem" />
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={classes.container}>
//       <div className={classes.content}>
//         <Title title="Order Form" fontSize="1.6rem" />
//         <div className={classes.summary}>
//           <div>
//             <h3>Name:</h3>
//             <span>{order.name}</span>
//           </div>
//           <div>
//             <h3>Address:</h3>
//             <span>{order.address}</span>
//           </div>
//         </div>
//         <OrderItemsList order={order} />
//       </div>
//       <div className={classes.map}>
//         <Title title="Your Location" fontSize="1.6rem" />
//         <Map readonly={true} location={order.addressLatLng} />
//       </div>
//       <div className={classes.buttons_container}>
//         <div className={classes.buttons}>
//           <PayPalButtons order={order} />
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import classes from "./paymentPage.module.css";
import { getNewOrderForCurrentUser } from "../../Services/orderService";
import Title from "../../Components/Title/Title";
import OrderItemsList from "../../Components/OrderItemsList/OrderItemsList";
import Map from "../../Components/Map/Map";
import RazorpayButton from "../../Components/PaypalButton/RazorepayButton";

export default function PaymentPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNewOrderForCurrentUser()
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setError("Failed to load order details. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title="Order Form" fontSize="1.6rem" />

        <div className={classes.summary}>
          <div>
            <h3>Name:</h3>
            <span>{order.name}</span>
          </div>

          <div>
            <h3>Address:</h3>
            <span>{order.address}</span>
          </div>
        </div>

        <OrderItemsList order={order} />
      </div>

      <div className={classes.map}>
        <Title title="Your Location" fontSize="1.6rem" />
        <Map readonly={true} location={order.addressLatLng} />
      </div>

      <div className={classes.buttons_container}>
        <div className={classes.buttons}>
   <RazorpayButton order={order} />
        </div>
      </div>
    </div>
  );
}

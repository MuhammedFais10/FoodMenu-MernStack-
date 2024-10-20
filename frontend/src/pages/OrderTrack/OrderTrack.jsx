import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrderById } from "../../Services/orderService";
import NotFound from "../../Components/NotFound/NotFound";
import classes from "./orderTrackPage.module.css";
import DateTime from "../../Components/DateTime/DateTime";
import OrderItemsList from "../../Components/OrderItemsList/OrderItemsList";
import Title from "../../Components/Title/Title";
import Map from "../../Components/Map/Map";

export default function OrderTrack() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
console.log(order);
console.log(orderId);

useEffect(() => {
  if (orderId) {
    console.log("Order ID:", orderId); // Check if orderId is correctly logged
    trackOrderById(String(orderId))  // Ensure it is passed as a string
      .then((order) => {
        setOrder(order);
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
      });
  }
}, [orderId]);
  if (!orderId) {
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;
  }

  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order._id}</h1>{" "}
          {/* Make sure the order ID is displayed correctly */}
          <div className={classes.header}>
            <div>
              <strong>Date</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Name</strong>
              {order.name}
            </div>
            <div>
              <strong>Address</strong>
              {order.address}
            </div>
            <div>
              <strong>Status</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>
        {order.status === "NEW" && (
          <div className={classes.payment}>
            <Link to="/payment"> Go To Payment</Link>
          </div>
        )}
      </div>
    )
  );
}

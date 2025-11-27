import React from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";


function Header() {
  const { user, logout } = useAuth();
  console.log(user);

  const { cart, clearCart } = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Food Main
        </Link>
        <nav>
          <ul>
            {user !== null ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
               <a onClick={() => logout(clearCart)}>LogOut</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

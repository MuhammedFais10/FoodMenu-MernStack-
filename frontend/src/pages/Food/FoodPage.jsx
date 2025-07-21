import React, { useEffect, useState } from "react";
import classes from "./FoodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../Services/foodService.jsx";
import StarRating from "../../Components/StarRating/StarRating.jsx";
import Tag from "../../Components/Tags/Tag.jsx";
import Price from "../../Components/Price/Price.jsx";
import { useCart } from "../../Components/hooks/useCart.jsx";
import NotFound from "../../Components/NotFound/NotFound.jsx";
function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate(`/cart/${food.id}`);
  };

  useEffect(() => {
    getById(id)
      .then(setFood)
      .catch((error) => {
        console.error("Error fetching food:", error);
      });
  }, [id]);
  return (
    <>
      {!food ? (
        <NotFound message="Food Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food?.imageUrl}`}
            alt={food.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>
            <div className={classes.origins}>
              {food.origins?.map((origin, index) => (
                <span key={index}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tag
                  tags={food.tags.map((tag) => {
                    return { name: tag };
                  })}
                  forFoodPage={true}
                />
              )}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodPage;

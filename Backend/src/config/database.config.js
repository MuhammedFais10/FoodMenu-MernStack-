import { connect, set } from "mongoose";
import { UserModel } from "../models/UserModel.js";
import { FoodModel } from "../models/food.model.js";
import { sample_users } from "../data.js";
import { Sample_foods } from "../data.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);
export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI);
    await seedUsers();
    await seedFoods();
    console.log("connect successfully---");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seed is already done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log("Users seed is done!");
}

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log("Foods seed is already done!");
    return;
  }

  for (const food of Sample_foods) {
    food.imageUrl = `${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log("Foods seed Is Done!");
}

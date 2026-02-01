import dotenv from "dotenv";
dotenv.config();

console.log("🌱 Seed script started...");

import mongoose from "mongoose";
import { UserModel } from "../models/UserModel.js";
import { FoodModel } from "../models/food.model.js";
import { sample_users, Sample_foods } from "../data.js";
import bcrypt from "bcryptjs";
import path from "path";
import { configCloudinary } from "./cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

configCloudinary();

const PASSWORD_HASH_SALT_ROUNDS = 10;

const uploadImageToCloudinary = (imagePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, (error, result) => {
      if (error || !result) reject(error);
      else resolve(result.secure_url);
    });
  });
};

async function seed() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // USERS
    const usersCount = await UserModel.countDocuments();
    console.log("👤 Users in DB:", usersCount);

    if (usersCount === 0) {
      for (let user of sample_users) {
        user.password = await bcrypt.hash(
          user.password,
          PASSWORD_HASH_SALT_ROUNDS,
        );
        await UserModel.create(user);
      }
      console.log("✅ Users seeded");
    } else {
      console.log("⚠️ Users already exist, skipping...");
    }

    // FOODS
    const foodsCount = await FoodModel.countDocuments();
    console.log("🍔 Foods in DB:", foodsCount);

    if (foodsCount === 0) {
      const uploadedFoods = [];

      for (const food of Sample_foods) {
        const localPath = path.join(
          process.cwd(),
          "src",
          "public",
          "foods",
          path.basename(food.imageUrl),
        );

        console.log("📤 Uploading:", localPath);

        const cloudImageUrl = await uploadImageToCloudinary(localPath);

        uploadedFoods.push({
          ...food,
          imageUrl: cloudImageUrl,
          origins: food.origins,
        });
      }

      await FoodModel.insertMany(uploadedFoods);
      console.log("✅ Foods seeded");
    } else {
      console.log("⚠️ Foods already exist, skipping...");
    }

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();

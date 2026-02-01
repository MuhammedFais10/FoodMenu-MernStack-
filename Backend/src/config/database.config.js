// import { connect, set } from "mongoose";
// import { UserModel } from "../models/UserModel.js";
// import { FoodModel } from "../models/food.model.js";
// import { sample_users } from "../data.js";
// import { Sample_foods } from "../data.js";
// import { configCloudinary } from "./cloudinary.config.js";
// import { v2 as cloudinary } from "cloudinary";
// import path from "path";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// dotenv.config();
// configCloudinary();
// console.log("MongoDB URI:", process.env.MONGO_URI);
// const PASSWORD_HASH_SALT_ROUNDS = 10;
// set("strictQuery", true);
// export const dbconnect = async () => {
//   try {
//     await connect(process.env.MONGO_URI);
//     await seedUsers();
//     await seedFoods();
//     console.log("connect successfully---");
//   } catch (error) {
//     console.log("Database connection error:", error);
//   }
// };

// async function seedUsers() {
//   const usersCount = await UserModel.countDocuments();
//   if (usersCount > 0) {
//     console.log("Users seed is already done!");
//     return;
//   }

//   for (let user of sample_users) {
//     user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
//     await UserModel.create(user);
//   }

//   console.log("Users seed is done!");
// }
// ////////////////////////////////////////////////

// const uploadImageToCloudinary = (imagePath) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(imagePath, (error, result) => {
//       if (error || !result) reject(error);
//       else resolve(result.secure_url); // get https image URL
//     });
//   });
// };

// export async function seedFoods() {
//   const count = await FoodModel.countDocuments();
//   if (count > 0) {
//     console.log("Foods already seeded.");
//     return;
//   }

//   const uploadedFoods = [];

//   for (const food of Sample_foods) {
//     const localPath = path.join(
//       path.resolve(),
//       "src", // 👈 correct this part
//       "public",
//       "foods",
//       path.basename(food.imageUrl)
//     );

//     try {
//       const cloudImageUrl = await uploadImageToCloudinary(localPath);

//       uploadedFoods.push({
//         ...food,
//         imageUrl: cloudImageUrl,
//         origins: food.origins, // fix: in DB schema it's 'origins'
//       });
//     } catch (error) {
//       console.error(`❌ Failed to upload ${food.name}:`, error);
//     }
//   }

//   await FoodModel.insertMany(uploadedFoods);
//   console.log("✅ Food seed with Cloudinary images complete.");
// }

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbconnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB Connected (cached)");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

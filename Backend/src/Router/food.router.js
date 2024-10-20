import express from "express";
import admin from "../middleware/admin.mid.js";
import { FoodModel } from "../models/food.model.js";
import handler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  handler(async (req, res) => {
    const foods = await FoodModel.find({});
    // console.log("Fetched foods:", foods);
    res.send(foods);
  })
);

router.post(
  "/",
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    const food = new FoodModel({
      name,
      price,
      tags: tags.split ? tags.split(",") : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(",") : origins,
      cookTime,
    });

    await food.save();

    res.send(food);
  })
);

router.put(
  "/",
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    await FoodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(",") : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(",") : origins,
        cookTime,
      }
    );

    res.send();
  })
);

router.delete(
  "/:foodId",
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send();
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

router.get(
  "/:id",
  handler(async (req, res) => {
    const food = await FoodModel.findById(req.params.id);
    if (food) {
      res.send(food);
    } else {
      res.status(404).send({ message: "Food Not Found" });
    }
  })
);

export default router;

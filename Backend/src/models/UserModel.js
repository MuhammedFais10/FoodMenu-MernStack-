import { model, Schema } from "mongoose";
export const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    cart: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const UserModel = model("user", UserSchema);

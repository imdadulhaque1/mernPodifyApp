import { Model, ObjectId, Schema, model } from "mongoose";

// interface(typeScript)
interface UserInterface {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: { uri: string; publicId: string };
  tokens: string[];
  favourites: ObjectId[];
  followers: ObjectId[];
  following: ObjectId[];
}
const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: Object,
      url: String,
      publicId: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Audio",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tokens: [String],
  },
  { timestamps: true }
);

export default model("User", userSchema) as Model<UserInterface>;

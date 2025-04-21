import { Schema, model, models } from "mongoose";

type UserType = {
  name: string;
  email: string;
  password: string;
};

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email Required!!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Required!!"],
  },
});

export const User = models.users || model<UserType>("users", UserSchema);

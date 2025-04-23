import { Schema, model, models, Types } from "mongoose";

// Define the TypeScript type for Client
type ClientType = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  userId: Types.ObjectId; // use Types.ObjectId directly
};

// Define the Schema
const clientSchema = new Schema<ClientType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    notes: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" }, // added `ref` (optional)
  },
  {
    timestamps: true, // optional: adds createdAt, updatedAt fields automatically
  }
);

// Export the model
export const Client =
  models.clients || model<ClientType>("clients", clientSchema);

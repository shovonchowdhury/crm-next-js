import mongoose, { Schema, model, models } from "mongoose";

type ProjectType = {
  title: string;
  budget: string;
  status: "pending" | "in progress" | "completed";
  deadline: Date; 
  clientId: mongoose.Types.ObjectId;
};

const projectSchema = new Schema<ProjectType>(
  {
    title: { type: String, required: true, trim: true },
    budget: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      required: true,
    },
    deadline: { type: Date, required: true }, 
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = models.Project || model<ProjectType>("Project", projectSchema);

export default Project;

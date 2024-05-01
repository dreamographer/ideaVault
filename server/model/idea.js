// Import necessary modules
import mongoose, { Schema } from "mongoose";

// Define schema for Idea model
const ideaSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    links: {
      type: [String],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "InProgress", "Completed"],
      default: "Pending",
    },
    attachments: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Create and export Idea model
const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;

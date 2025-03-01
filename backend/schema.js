import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    clues: {
      type: [String], // Array of Strings
      default: [],
    },
    fun_fact: {
      type: [String], // Array of Strings
      default: [],
    },
    trivia: {
      type: [String], // Array of Strings
      default: [],
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

// Exporting the model
export const City = mongoose.model("City", citySchema);

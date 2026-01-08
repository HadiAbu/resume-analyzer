import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cloudinaryUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true }, // Needed to delete/update the file later
  fileName: String,
  atsScore: Number,
  analysisResults: Object, // Store the OpenAI JSON output here
  createdAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume", resumeSchema);

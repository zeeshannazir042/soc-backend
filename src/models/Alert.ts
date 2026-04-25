import mongoose, { Schema } from "mongoose";

const AlertSchema = new Schema({
  rule: String,
  severity: { type: String, enum: ["low", "medium", "high"] },
  host: String,
  ip: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", AlertSchema);
import mongoose, { Schema } from "mongoose";

const TriageSchema = new Schema({
  alertId: { type: Schema.Types.ObjectId, ref: "Alert", required: true },

  status: {
    type: String,
    enum: ["open", "true_positive", "false_positive", "ignored", "escalated"],
    default: "open"
  },

  analystNote: String
}, { timestamps: true });

export default mongoose.model("Triage", TriageSchema);
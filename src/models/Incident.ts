import mongoose, { Schema } from "mongoose";

const IncidentSchema = new Schema({
  title: String,
  severity: String,

  status: {
    type: String,
    enum: ["open", "investigating", "resolved"],
    default: "open"
  },

  alerts: [{ type: Schema.Types.ObjectId, ref: "Alert" }]
}, { timestamps: true });

export default mongoose.model("Incident", IncidentSchema);
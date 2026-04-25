import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  incidentId: { type: Schema.Types.ObjectId, ref: "Incident" },
  message: String
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);
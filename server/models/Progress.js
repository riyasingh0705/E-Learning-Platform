import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "started", "completed"],
      default: "enrolled",
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
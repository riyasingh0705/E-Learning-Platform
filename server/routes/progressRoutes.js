import express from "express";
import Progress from "../models/Progress.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const records = await Progress.find({ user: req.userId }).sort({
      updatedAt: -1,
    });
    res.json({ progress: records });
  } catch {
    res.status(500).json({ message: "Could not fetch progress." });
  }
});

router.get("/stats", requireAuth, async (req, res) => {
  try {
    const records = await Progress.find({ user: req.userId });
    const enrolled = records.length;
    const completed = records.filter((r) => r.status === "completed").length;
    res.json({ enrolled, completed });
  } catch {
    res.status(500).json({ message: "Could not fetch stats." });
  }
});

router.post("/enroll", requireAuth, async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    let record = await Progress.findOne({ user: req.userId, courseId });

    if (!record) {
      record = await Progress.create({
        user: req.userId,
        courseId,
        status: "enrolled",
      });
    }

    res.json({ progress: record });
  } catch {
    res.status(500).json({ message: "Could not enroll in course." });
  }
});

router.put("/start", requireAuth, async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    const record = await Progress.findOneAndUpdate(
      { user: req.userId, courseId },
      { status: "started" },
      { new: true, upsert: true }
    );

    res.json({ progress: record });
  } catch {
    res.status(500).json({ message: "Could not start course." });
  }
});

router.put("/complete", requireAuth, async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    const record = await Progress.findOneAndUpdate(
      { user: req.userId, courseId },
      { status: "completed", completedAt: new Date() },
      { new: true, upsert: true }
    );

    res.json({ progress: record });
  } catch {
    res.status(500).json({ message: "Could not update course." });
  }
});

export default router;
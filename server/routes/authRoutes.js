import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 8 characters." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    res
      .status(201)
      .cookie("token", createToken(user._id), cookieOptions)
      .json({ user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Could not create your account." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    res
      .cookie("token", createToken(user._id), cookieOptions)
      .json({ user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Could not sign you in." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({ message: "Signed out successfully." });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(401).json({ message: "User not found." });
  }

  res.json({ user: publicUser(user) });
});

router.put("/update-profile", requireAuth, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res
        .status(400)
        .json({ message: "Name and email are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.userId },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "This email is already in use by another account." });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name.trim(), email: normalizedEmail },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Could not update your profile." });
  }
});

router.put("/change-password", requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required." });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "New password must contain at least 8 characters." });
    }

    const user = await User.findById(req.userId).select("+password");

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch {
    res.status(500).json({ message: "Could not change your password." });
  }
});

export default router;
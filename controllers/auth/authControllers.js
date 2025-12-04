import { body, validationResult } from "express-validator";
import User from "../../models/user.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;

  try {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return res
        .status(200)
        .json({ status: false, message: "Email Already Exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const addUser = await User.create({ name, email, password: hashPassword });
    if (addUser) {
      return res.status(201).json({ status: true, message: "User Registered" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: true, message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ status: false, message: "User Not Found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWTWEB_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      status: true,
      user: {
        id: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.users.id;

    // Fetch user from DB
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "name", "email"], // choose fields to return
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

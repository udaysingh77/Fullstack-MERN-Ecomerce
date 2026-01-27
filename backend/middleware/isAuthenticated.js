import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuhenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid token",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Please provide a token",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          status: false,
          message: "The registoration token has expired",
        });
      }
      return res.status(400).json({
        status: false,
        message: "Access token is missing or invalid",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    req.id = user._id;
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        status: true,
        message: "Access forbinden, only admins allowed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

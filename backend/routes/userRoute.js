import express from "express";
import {
    registerUser,
    loginUser,
    getUserDetails,
    updateUserProfile,
    changePassword
} from "../controllers/userController.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", authMiddleware, getUserDetails);
router.put("/update-profile", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;
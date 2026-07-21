import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
    addIncome,
    getIncome,
    updateIncome,
    deleteIncome,
    downloadIncome
} from "../controllers/incomeController.js";

const router = express.Router();

// Add Income
router.post("/add", authMiddleware, addIncome);

// Get All Income
router.get("/get", authMiddleware, getIncome);

// Update Income
router.put("/update/:id", authMiddleware, updateIncome);

// Delete Income
router.delete("/delete/:id", authMiddleware, deleteIncome);

// Download Income Excel
router.get("/download", authMiddleware, downloadIncome);

export default router;
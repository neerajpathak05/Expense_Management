import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {addExpense, getExpense, updateExpense, deleteExpense, downloadExpense} from '../controllers/expenseController.js';

const router = express.Router();

   
        // Add Expense
router.post("/add", authMiddleware, addExpense);

// Get All Expenses
router.get("/get", authMiddleware, getExpense);

// Update Expense
router.put("/update/:id", authMiddleware, updateExpense);

// Delete Expense
router.delete("/delete/:id", authMiddleware, deleteExpense);

// Download Expenses Excel
router.get("/download", authMiddleware, downloadExpense);

export default router;
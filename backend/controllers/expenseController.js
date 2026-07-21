import expenseModel from "../models/expenseModel.js";
import getDateRange from "../utils/dateFilter.js";
import XLSX from "xlsx";

//add expense
export async function addExpense(req,res){
    try {
        const userId = req.user._id;
        const { description, amount, category, date } = req.body;

        if (!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
     const newExpense = new expenseModel({
                description,
                amount,
                category,
                date,
                userId
            });
    
            await newExpense.save();
    
            return res.status(201).json({
                success: true,
                message: "Expense added successfully",
                data: newExpense
            });
}
catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

//get all expense
export async function getExpense(req, res) {
    try {
        const userId = req.user._id;

        const expense = await expenseModel.find({ userId }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            expense
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// =========================
// Update Expense
// =========================
export async function updateExpense(req, res) {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const { description, amount, category, date } = req.body;

        const updatedExpense = await expenseModel.findOneAndUpdate(
            {
                _id: id,
                userId
            },
            {
                description,
                amount,
                category,
                date
            },
            {
                new: true
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpense        
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// =========================
// Delete Expense
// =========================
export async function deleteExpense(req, res) {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const deletedExpense = await expenseModel.findOneAndDelete({
            _id: id,
            userId
        });

        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

//to download the data in excel sheet

// =========================
// Download Expense Excel
// =========================
export async function downloadExpense(req, res) {
    try {
        const userId = req.user._id;

        const expenses = await expenseModel.find({ userId }).sort({ date: -1 });

        if (expenses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No expense data found"
            });
        }

        const excelData = expenses.map((item) => ({
            Description: item.description,
            Amount: item.amount,
            Category: item.category,
            Date: new Date(item.date).toLocaleDateString()
        }));

        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(excelData);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

        const excelBuffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx"
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Expenses.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        return res.send(excelBuffer);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

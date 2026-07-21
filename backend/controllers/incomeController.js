import express from "express";
import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from '../utils/dateFilter.js';

// =========================
// Add Income
// =========================
export async function addIncome(req, res) {
    try {
        const userId = req.user._id;
        const { description, amount, category, date } = req.body;

        if (!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newIncome = new incomeModel({
            description,
            amount,
            category,
            date,
            userId
        });

        await newIncome.save();

        return res.status(201).json({
            success: true,
            message: "Income added successfully",
            data: newIncome
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
// Get All Income
// =========================
export async function getIncome(req, res) {
    try {
        const userId = req.user._id;

        const income = await incomeModel.find({ userId }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            income
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
// Update Income
// =========================
export async function updateIncome(req, res) {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const { description, amount, category, date } = req.body;

        const updatedIncome = await incomeModel.findOneAndUpdate(
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

        if (!updatedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Income updated successfully",
            data: updatedIncome
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
// Delete Income
// =========================
export async function deleteIncome(req, res) {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const deletedIncome = await incomeModel.findOneAndDelete({
            _id: id,
            userId
        });

        if (!deletedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Income deleted successfully"
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
// Download Income Excel
// =========================
export async function downloadIncome(req, res) {
    try {
        const userId = req.user._id;

        const income = await incomeModel.find({ userId }).sort({ date: -1 });

        if (income.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No income data found"
            });
        }

        const excelData = income.map((item) => ({
            Description: item.description,
            Amount: item.amount,
            Category: item.category,
            Date: new Date(item.date).toLocaleDateString()
        }));

        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(excelData);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Income");

        const excelBuffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx"
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Income.xlsx"
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
import React, { useEffect, useState } from "react";
import QuickStats from "../components/QuickStats";
import axios from "axios";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

import DashboardCard from "../components/DashboardCard";
import FinancialOverview from "../components/FinancialOverview";
import RecentTransactions from "../components/RecentTransactions";
import SpendingCategory from "../components/SpendingCategory";

const BASE_URL = "https://expense-management-backend-inm4.onrender.com";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    savingsRate: 0,
    recentTransactions: [],
    expenseDistribution: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      
    const res = await axios.get(
      `${BASE_URL}/api/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      if (res.data.success) {
        setDashboard(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

    <QuickStats
  income={dashboard.totalIncome}
  expense={dashboard.totalExpense}
  balance={dashboard.totalBalance}
  savingsRate={dashboard.savingsRate}
/>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <FinancialOverview
          income={dashboard.totalIncome}
          expense={dashboard.totalExpense}
        />

        <RecentTransactions
          transactions={dashboard.recentTransactions}
        />

      </div>

      <SpendingCategory
        data={dashboard.expenseDistribution}
      />

    </div>
  );
};

export default Dashboard;
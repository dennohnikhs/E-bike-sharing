"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BsBicycle,
  BsPeople,
  BsBookmark,
  BsCashStack,
  BsBoxArrowRight,
} from "react-icons/bs";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // TODO: Fetch real stats from your API
    setStats({
      totalBikes: 45,
      totalUsers: 120,
      totalBookings: 89,
      totalRevenue: 3450,
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <Icon className="text-blue-500 text-3xl" />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          href="/"
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
          <BsBoxArrowRight className="text-xl mr-2" />
          <span>Exit Admin</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Bikes"
          value={stats.totalBikes}
          icon={BsBicycle}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={BsPeople}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={BsBookmark}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={BsCashStack}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          {/* TODO: Add a table or list of recent bookings */}
          <p className="text-gray-500">No recent bookings to display</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>System Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Available Bikes</span>
              <span className="font-semibold">{stats.totalBikes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Users</span>
              <span className="font-semibold">{stats.totalUsers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import {
  BsBicycle,
  BsPeople,
  BsBookmark,
  BsCashStack,
  BsBoxArrowRight,
  BsGear,
  BsPlus,
  BsList,
} from "react-icons/bs";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const ActionButton = ({ title, icon: Icon, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
      <Icon className="text-xl" />
      <span>{title}</span>
    </button>
  );

  const TabButton = ({ id, title, icon: Icon, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 p-2 w-full rounded transition-colors ${
        isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
      }`}>
      <Icon /> {title}
    </button>
  );

  const DashboardContent = () => (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-4">
          <ActionButton title="Add Bike" icon={BsPlus} onClick={() => {}} />
          <ActionButton title="Add User" icon={BsPlus} onClick={() => {}} />
        </div>
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Bike ID</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">BIKE-001</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      View
                    </button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
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
    </>
  );

  const UsersContent = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Add your users management content here */}
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <table className="w-full">{/* Add your users table content */}</table>
      </div>
    </div>
  );

  const BikesContent = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bikes Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Add your bikes management content here */}
        <h2 className="text-xl font-bold mb-4">All Bikes</h2>
        <table className="w-full">{/* Add your bikes table content */}</table>
      </div>
    </div>
  );

  const BookingsContent = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bookings Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Add your bookings management content here */}
        <h2 className="text-xl font-bold mb-4">All Bookings</h2>
        <table className="w-full">
          {/* Add your bookings table content */}
        </table>
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Add your settings content here */}
        <h2 className="text-xl font-bold mb-4">System Settings</h2>
        {/* Add your settings form or options */}
      </div>
    </div>
  );

  return (
    <div className="flex relative">
      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">
        <BsList className="text-2xl" />
      </button>

      {/* Navigation Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static w-64 bg-white min-h-screen shadow-md p-4 transition-transform duration-300 ease-in-out z-40`}>
        <nav className="space-y-2">
          <TabButton
            id="dashboard"
            title="Dashboard"
            icon={BsList}
            isActive={activeTab === "dashboard"}
          />
          <TabButton
            id="users"
            title="Users"
            icon={BsPeople}
            isActive={activeTab === "users"}
          />
          <TabButton
            id="bikes"
            title="Bikes"
            icon={BsBicycle}
            isActive={activeTab === "bikes"}
          />
          <TabButton
            id="bookings"
            title="Bookings"
            icon={BsBookmark}
            isActive={activeTab === "bookings"}
          />
          <TabButton
            id="settings"
            title="Settings"
            icon={BsGear}
            isActive={activeTab === "settings"}
          />
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <div className="flex-1 p-6 bg-gray-100 min-h-screen lg:ml-0">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
            <BsBoxArrowRight className="text-xl mr-2" />
            <span>Exit Admin</span>
          </button>
        </div>

        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "users" && <UsersContent />}
        {activeTab === "bikes" && <BikesContent />}
        {activeTab === "bookings" && <BookingsContent />}
        {activeTab === "settings" && <SettingsContent />}
      </div>
    </div>
  );
}

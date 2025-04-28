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
  BsX,
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
  const [showAddBikeModal, setShowAddBikeModal] = useState(false);
  const [bikeFormData, setBikeFormData] = useState({
    uuid: "",
    gpsModuleId: "",
    batteryLevel: 100,
    isAvailable: true,
    status: "available",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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

  const handleAddBike = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5000/api/admin/add-bike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bikeFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add bike");
      }

      // Reset form and close modal
      setBikeFormData({
        uuid: "",
        gpsModuleId: "",
        batteryLevel: 100,
        isAvailable: true,
        status: "available",
      });
      setShowAddBikeModal(false);

      // Refresh bikes list if you're on the bikes page
      if (activeTab === "bikes") {
        // Trigger bikes refresh logic here
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
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

  const UsersContent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/admin/users");
          const result = await response.json();

          if (result.status === "success" && Array.isArray(result.data)) {
            setUsers(result.data);
          } else {
            throw new Error("Invalid data format received");
          }
        } catch (err) {
          setError("Failed to fetch users");
          console.error("Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);

    if (loading) return <div className="text-center">Loading users...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const BikesContent = () => {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchBikes = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Authentication token not found");
          }

          const response = await fetch(
            "http://localhost:5000/api/admin/bikes",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (result.status === "success" && Array.isArray(result.data)) {
            setBikes(result.data);
          } else {
            throw new Error("Invalid data format received from server");
          }
        } catch (err) {
          setError(`Failed to fetch bikes: ${err.message}`);
          console.error("Error fetching bikes:", err);
          if (!localStorage.getItem("adminToken")) {
            window.location.href = "/auth/login";
          }
        } finally {
          setLoading(false);
        }
      };

      fetchBikes();
    }, []);

    if (loading) return <div className="text-center">Loading bikes...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Bikes Management</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">All Bikes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">UUID</th>
                  <th className="px-4 py-2 text-left">GPS Module ID</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Battery Level</th>
                  <th className="px-4 py-2 text-left">Last Updated</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr key={bike._id} className="border-b">
                    <td className="px-4 py-2">{bike.uuid}</td>
                    <td className="px-4 py-2">{bike.gpsModuleId}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          bike.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {bike.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {bike.batteryLevel}%
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(bike.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

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

  const AddBikeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Bike</h2>
          <button
            onClick={() => setShowAddBikeModal(false)}
            className="text-gray-500 hover:text-gray-700">
            <BsX className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleAddBike} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UUID
            </label>
            <input
              type="text"
              value={bikeFormData.uuid}
              onChange={(e) =>
                setBikeFormData({ ...bikeFormData, uuid: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              GPS Module ID
            </label>
            <input
              type="text"
              value={bikeFormData.gpsModuleId}
              onChange={(e) =>
                setBikeFormData({
                  ...bikeFormData,
                  gpsModuleId: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Battery Level (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={bikeFormData.batteryLevel}
              onChange={(e) =>
                setBikeFormData({
                  ...bikeFormData,
                  batteryLevel: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {submitError && (
            <div className="text-red-500 text-sm">{submitError}</div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddBikeModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50">
              {isSubmitting ? "Adding..." : "Add Bike"}
            </button>
          </div>
        </form>
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
        <div className="flex justify-end gap-2 items-center mb-4">
          <div className="flex gap-4">
            <ActionButton
              title="Add Bike"
              icon={BsPlus}
              onClick={() => setShowAddBikeModal(true)}
            />
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/auth/login";
            }}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
            <BsBoxArrowRight className="text-xl mr-2" />
            <span>Logout</span>
          </button>
        </div>

        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "users" && <UsersContent />}
        {activeTab === "bikes" && <BikesContent />}
        {activeTab === "bookings" && <BookingsContent />}
        {activeTab === "settings" && <SettingsContent />}
      </div>
      {showAddBikeModal && <AddBikeModal />}
    </div>
  );
}

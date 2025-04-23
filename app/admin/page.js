"use client";
import Link from "next/link";
import { BsSpeedometer2, BsBicycle, BsPeople, BsGear } from "react-icons/bs";

export default function AdminHome() {
  const AdminCard = ({ title, icon: Icon, link, description }) => (
    <Link href={link}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center space-x-4">
          <Icon className="text-blue-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard
          title="Dashboard"
          icon={BsSpeedometer2}
          link="/admin/dashboard"
          description="View statistics and system overview"
        />
        <AdminCard
          title="Manage Bikes"
          icon={BsBicycle}
          link="/admin/bikes"
          description="Add, edit, and manage bikes"
        />
        <AdminCard
          title="Users"
          icon={BsPeople}
          link="/admin/users"
          description="Manage user accounts and permissions"
        />
        <AdminCard
          title="Settings"
          icon={BsGear}
          link="/admin/settings"
          description="Configure system settings"
        />
      </div>
    </div>
  );
}

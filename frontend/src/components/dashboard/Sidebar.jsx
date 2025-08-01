"use client";

import React from "react";
import {
  UserIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  Cog8ToothIcon,
  RectangleStackIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("hs_token");
    navigate("/login");
  };

  const sections = [
    { id: "users", label: "User Management", icon: <UserIcon className="h-5 w-5 mr-2" /> },
    { id: "hostels", label: "Hostel Management", icon: <BuildingOfficeIcon className="h-5 w-5 mr-2" /> },
    { id: "payments", label: "Payments", icon: <CreditCardIcon className="h-5 w-5 mr-2" /> },
    { id: "meals", label: "Meals", icon: <RectangleStackIcon className="h-5 w-5 mr-2" /> },
    { id: "complaints", label: "Complaints", icon: <ExclamationTriangleIcon className="h-5 w-5 mr-2" /> },
    { id: "notices", label: "Notices", icon: <DocumentTextIcon className="h-5 w-5 mr-2" /> },
    { id: "inventory", label: "Inventory", icon: <ClipboardDocumentListIcon className="h-5 w-5 mr-2" /> },
    { id: "settings", label: "Settings", icon: <Cog8ToothIcon className="h-5 w-5 mr-2" /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="h-16 flex items-center justify-center bg-blue-600 text-white font-bold text-xl">
        Admin Panel
      </div>
      <nav className="p-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
              activeSection === section.id ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-800"
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 mt-6 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
        </button>
      </nav>
    </aside>
  );
}

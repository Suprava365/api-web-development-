"use client";

import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import UserTable from "./dashboard/UserTable";
import HostelTable from "./dashboard/HostelTable";
import Payments from "./dashboard/Payments";
import MealTable from "./dashboard/MealTable";
import ComplaintTable from "./dashboard/ComplaintTable";
import NoticeTable from "./dashboard/NoticeTable";
import InventoryTable from "./dashboard/InventoryTable";
import Settings from "./dashboard/Settings";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users");

  const [users] = useState([]);
  const [hostels] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          <header className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-semibold capitalize">{activeSection.replace(/s$/, "")} Section</h1>
            <p className="text-gray-500">Manage {activeSection} data</p>
          </header>

          {activeSection === "users" && <UserTable users={users} />}
          {activeSection === "hostels" && <HostelTable hostels={hostels} />}
          {activeSection === "payments" && <Payments />}
          {activeSection === "meals" && <MealTable />}
          {activeSection === "complaints" && <ComplaintTable />}
          {activeSection === "notices" && <NoticeTable />}
          {activeSection === "inventory" && <InventoryTable />}
          {activeSection === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}

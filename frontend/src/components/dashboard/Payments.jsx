"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    service: "Cleaning",
    amount: "",
    status: "Paid",
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/fees/");
        if (Array.isArray(res.data)) {
          setPayments(res.data);
        } else {
          setPayments([]);
          console.error("Expected array but got:", res.data);
        }
      } catch (err) {
        toast.error("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/fees/", formData);
      toast.success("Payment added");
      setPayments((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setFormData({ studentId: "", service: "Cleaning", amount: "", status: "Paid" });
    } catch (err) {
      toast.error("Failed to add payment");
    }
  };

  if (loading) return <p className="p-6">Loading payments...</p>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Payments</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add Payment
          </button>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{payment.studentId}</td>
                <td className="px-4 py-2">{payment.service}</td>
                <td className="px-4 py-2">{payment.amount}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payment.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-10">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-semibold mb-4">Add Payment</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                className="grid gap-4"
              >
                <input
                  name="studentId"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-md"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>Cleaning</option>
                  <option>Room Maintenance</option>
                  <option>WiFi</option>
                  <option>Security</option>
                  <option>Electricity</option>
                  <option>Water</option>
                </select>
                <input
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-md"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

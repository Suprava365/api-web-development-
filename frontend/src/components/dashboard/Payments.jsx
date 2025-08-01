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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    service: "Cleaning",
    amount: "",
    rentAmount: "",
    month: "",
    status: "Paid",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/fees/"),
          axios.get("http://localhost:3000/api/users"),
        ]);

        if (Array.isArray(paymentsRes.data?.data)) {
          setPayments(paymentsRes.data.data);
        }

        if (Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
        }
      } catch (err) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      const payload = { ...formData, rentAmount: formData.amount };
      const res = await axios.post("http://localhost:3000/api/fees/invoice", payload);
      setPayments((prev) => [...prev, res.data]);
      toast.success("Payment added");
      setShowAddModal(false);
      resetForm();
    } catch {
      toast.error("Failed to add payment");
    }
  };

  const handleEdit = async () => {
    try {
      const payload = { ...formData, rentAmount: formData.amount };
      const res = await axios.put(`http://localhost:3000/api/fees/${selectedPayment._id}`, payload);
      setPayments((prev) =>
        prev.map((p) => (p._id === selectedPayment._id ? res.data : p))
      );
      toast.success("Payment updated");
      setShowEditModal(false);
      resetForm();
    } catch {
      toast.error("Failed to update payment");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/fees/invoice/${selectedPayment._id}`);
      setPayments((prev) => prev.filter((p) => p._id !== selectedPayment._id));
      toast.success("Payment deleted");
      setShowDeleteModal(false);
      resetForm();
    } catch {
      toast.error("Failed to delete payment");
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      service: "Cleaning",
      amount: "",
      rentAmount: "",
      month: "",
      status: "Paid",
    });
    setSelectedPayment(null);
  };

  const openEditModal = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      studentId: payment.studentId?._id || "",
      service: payment.service,
      amount: payment.amount,
      rentAmount: payment.rentAmount,
      month: payment.month,
      status: payment.status,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  if (loading) return <p className="p-6">Loading payments...</p>;

  const renderForm = (onSubmit) => (
    <form onSubmit={onSubmit} className="grid gap-4">
      <select name="studentId" value={formData.studentId} onChange={handleChange} required className="px-3 py-2 border rounded-md">
        <option value="">Select Student</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      <select name="service" value={formData.service} onChange={handleChange} className="px-3 py-2 border rounded-md">
        <option>Cleaning</option>
        <option>Room Maintenance</option>
        <option>WiFi</option>
        <option>Security</option>
        <option>Electricity</option>
        <option>Water</option>
      </select>

      <input name="amount" placeholder="Amount" type="number" value={formData.amount} onChange={handleChange} required className="px-3 py-2 border rounded-md" />
      <input name="month" type="month" value={formData.month} onChange={handleChange} required className="px-3 py-2 border rounded-md" />
      <input name="rentAmount" placeholder="Rent Amount" type="number" value={formData.rentAmount} onChange={handleChange} required className="px-3 py-2 border rounded-md" />

      <select name="status" value={formData.status} onChange={handleChange} className="px-3 py-2 border rounded-md">
        <option>Paid</option>
        <option>Pending</option>
      </select>

      <div className="flex justify-end">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow relative overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Payments</h2>
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <PlusIcon className="w-5 h-5 mr-2" /> Add Payment
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow relative overflow-x-auto">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-medium">Payments</h2>
    <button
      onClick={() => setShowAddModal(true)}
      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      <PlusIcon className="w-5 h-5 mr-2" /> Add Payment
    </button>
  </div>

  <table className="w-full table-auto text-sm text-left min-w-[800px]">
    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-2">Student</th>
        <th className="px-4 py-2">Month</th>
        <th className="px-4 py-2">Rent</th>
        <th className="px-4 py-2">Paid</th>
        <th className="px-4 py-2">Due</th>
        <th className="px-4 py-2">Fine</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {payments
        .filter((payment) => payment.rentAmount !== undefined)
        .map((payment) => (
          <tr key={payment._id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2">
              {payment.studentId?.name || "Unknown"}
            </td>
            <td className="px-4 py-2">{payment.month}</td>
            <td className="px-4 py-2">Rs. {payment.rentAmount}</td>
            <td className="px-4 py-2">Rs. {payment.paidAmount}</td>
            <td className="px-4 py-2">Rs. {payment.dueAmount}</td>
            <td className="px-4 py-2">Rs. {payment.fine}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  payment.status === "Paid" || payment.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {payment.status}
              </span>
            </td>
            <td className="px-4 py-2 space-x-2">
              <button
                onClick={() => openEditModal(payment)}
                className="text-blue-600 hover:text-blue-800"
              >
                <PencilIcon className="w-5 h-5 inline" />
              </button>
              <button
                onClick={() => openDeleteModal(payment)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-5 h-5 inline" />
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal title="Add Payment" onClose={() => setShowAddModal(false)}>
          {renderForm((e) => { e.preventDefault(); handleAdd(); })}
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal title="Edit Payment" onClose={() => setShowEditModal(false)}>
          {renderForm((e) => { e.preventDefault(); handleEdit(); })}
        </Modal>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <Modal title="Confirm Delete" onClose={() => setShowDeleteModal(false)}>
          <p>Are you sure you want to delete this payment?</p>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-10">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

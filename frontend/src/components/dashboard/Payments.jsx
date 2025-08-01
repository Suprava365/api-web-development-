"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const initialForm = {
    studentId: "",
    month: "",
    rentAmount: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/fees/invoice");
      setPayments(res.data);
    } catch (err) {
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const studentId = sessionStorage.getItem("hs_user_id");
    if (!studentId) {
      toast.error("Student ID not found in session");
      return;
    }

    setFormData({
      studentId,
      month: "",
      rentAmount: "",
    });
    setIsEditing(false);
    setShowFormModal(true);
  };

  const handleEdit = (payment) => {
    setCurrentPayment(payment);
    setFormData({
      studentId: payment.studentId._id || payment.studentId,
      month: payment.month,
      rentAmount: payment.rentAmount,
    });
    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleDeleteClick = (payment) => {
    setCurrentPayment(payment);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/fees/invoice/${currentPayment._id}`
      );
      setPayments((prev) =>
        prev.filter((payment) => payment._id !== currentPayment._id)
      );
      toast.success("Payment deleted successfully");
    } catch (err) {
      toast.error("Failed to delete payment");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axios.put(
          `http://localhost:3000/api/fees/invoice/${currentPayment._id}`,
          formData
        );
        setPayments((prev) =>
          prev.map((payment) =>
            payment._id === currentPayment._id ? res.data : payment
          )
        );
        toast.success("Payment updated successfully");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/fees/invoice",
          formData
        );
        setPayments((prev) => [...prev, res.data]);
        toast.success("Payment added successfully");
      }
      setShowFormModal(false);
    } catch (err) {
      toast.error("Failed to save payment");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment History</h2>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add Payment
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Student ID</th>
                  <th className="px-4 py-2 border">Month</th>
                  <th className="px-4 py-2 border">Rent Amount (Rs)</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="px-4 py-2 border">{p.studentId?._id || p.studentId}</td>
                    <td className="px-4 py-2 border">{p.month}</td>
                    <td className="px-4 py-2 border">Rs. {p.rentAmount}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(p)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showFormModal && (
          <PaymentFormModal
            onClose={() => setShowFormModal(false)}
            onSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            isEditing={isEditing}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            title="Delete Payment"
            message={`Are you sure you want to delete payment for ${currentPayment?.month}?`}
          />
        )}
      </div>
    </>
  );
};

const PaymentFormModal = ({ onClose, onSubmit, formData, handleChange, isEditing }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{isEditing ? "Edit Payment" : "Add Payment"}</h3>
        <button onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Select Month</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Month --</option>
            {[
              "01", "02", "03", "04", "05", "06",
              "07", "08", "09", "10", "11", "12",
            ].map((month) => (
              <option key={month} value={`2025-${month}`}>
                {new Date(`2000-${month}-01`).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Rent Amount (Rs)</label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const DeleteConfirmModal = ({ onClose, onConfirm, title, message }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p>{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default Payments;

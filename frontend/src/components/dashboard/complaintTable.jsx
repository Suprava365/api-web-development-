"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({ studentId: "", issueTitle: "", issueDescription: "" });
  const [currentComplaint, setCurrentComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/complaints");
      setComplaints(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const studentId = sessionStorage.getItem("studentId") || formData.studentId;
      const res = await axios.post("http://localhost:3000/api/complaints", {
        ...formData,
        studentId,
      });
      setComplaints((prev) => [...prev, res.data.data]);
      toast.success("Complaint added");
      setShowAddModal(false);
      setFormData({ studentId: "", issueTitle: "", issueDescription: "" });
    } catch (err) {
      toast.error("Failed to add complaint");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!currentComplaint) return;
    try {
      const res = await axios.put(`http://localhost:3000/api/complaints/${currentComplaint._id}`, formData);
      setComplaints((prev) =>
        prev.map((c) => (c._id === currentComplaint._id ? res.data.data : c))
      );
      toast.success("Complaint updated");
      setShowEditModal(false);
      setFormData({ studentId: "", issueTitle: "", issueDescription: "" });
    } catch (err) {
      toast.error("Failed to update complaint");
    }
  };

  const handleDelete = async () => {
    if (!currentComplaint) return;
    try {
      await axios.delete(`http://localhost:3000/api/complaints/${currentComplaint._id}`);
      setComplaints((prev) => prev.filter((c) => c._id !== currentComplaint._id));
      toast.success("Complaint deleted");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to delete complaint");
    }
  };

  if (loading) return <p className="p-6">Loading complaints...</p>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Complaints</h2>
          <button
            onClick={() => {
              setFormData({ studentId: "", issueTitle: "", issueDescription: "" });
              setShowAddModal(true);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add Complaint
          </button>
        </div>
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{c.studentId}</td>
                <td className="px-4 py-2 font-medium">{c.issueTitle}</td>
                <td className="px-4 py-2">{c.issueDescription}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button onClick={() => { setCurrentComplaint(c); setFormData(c); setShowEditModal(true); }}>
                      <PencilIcon className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => { setCurrentComplaint(c); setShowDeleteModal(true); }}>
                      <TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr><td colSpan={4} className="text-center p-6 text-gray-400">No complaints found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {(showAddModal || showEditModal) && (
        <ModalForm
          title={showAddModal ? "Add Complaint" : "Edit Complaint"}
          onClose={() => { setShowAddModal(false); setShowEditModal(false); setFormData({ studentId: "", issueTitle: "", issueDescription: "" }); }}
          onSubmit={showAddModal ? handleAdd : handleEdit}
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title={currentComplaint?.issueTitle}
        />
      )}
    </>
  );
}

const ModalForm = ({ title, onClose, onSubmit, formData, handleChange }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg z-50 w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose}><XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" /></button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="issueTitle"
            placeholder="Issue Title"
            value={formData.issueTitle}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="issueDescription"
            placeholder="Issue Description"
            value={formData.issueDescription}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="text-right mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

const DeleteModal = ({ onClose, onConfirm, title }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg z-50 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
      <p>Are you sure you want to delete the complaint "<strong>{title}</strong>"?</p>
      <div className="mt-6 flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
      </div>
    </div>
  </div>
);

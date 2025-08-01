"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MegaphoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function NoticeTable() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  const initialForm = {
    title: "",
    message: "",
    postedBy: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notices");
      setNotices(res.data.data || []); 
    } catch {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const openEditModal = (notice) => {
    setCurrentNotice(notice);
    setFormData({ ...notice });
    setShowEditModal(true);
  };

  const openDeleteModal = (notice) => {
    setCurrentNotice(notice);
    setShowDeleteModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/notices", formData);
      setNotices((prev) => [...prev, res.data]);
      toast.success("Notice added successfully");
      setShowAddModal(false);
    } catch {
      toast.error("Failed to add notice");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/notices/${currentNotice._id}`,
        formData
      );
      setNotices((prev) =>
        prev.map((n) => (n._id === currentNotice._id ? res.data : n))
      );
      toast.success("Notice updated");
      setShowEditModal(false);
    } catch {
      toast.error("Failed to update notice");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/notices/${currentNotice._id}`);
      setNotices((prev) => prev.filter((n) => n._id !== currentNotice._id));
      toast.success("Notice deleted");
      setShowDeleteModal(false);
    } catch {
      toast.error("Failed to delete notice");
    }
  };

  if (loading) return <p className="p-6">Loading notices...</p>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">All Notices</h2>
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add Notice
          </button>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Posted By</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
                <tr key={notice._id} className="border-t hover:bg-gray-50">

                <td className="px-4 py-2 font-medium text-gray-900">{notice.title}</td>
                <td className="px-4 py-2">{notice.message}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{notice.postedBy}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button onClick={() => openEditModal(notice)} className="text-blue-600 hover:text-blue-800">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => openDeleteModal(notice)} className="text-red-600 hover:text-red-800">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(showAddModal || showEditModal) && (
          <NoticeFormModal
            title={showAddModal ? "Add Notice" : "Edit Notice"}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
            onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
            title={currentNotice?.title}
          />
        )}
      </div>
    </>
  );
}

const NoticeFormModal = ({ title, onClose, onSubmit, formData, handleChange }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose} aria-label="Close modal">
          <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Posted By (User ID)</label>
          <input
            type="text"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

const DeleteConfirmModal = ({ onClose, onConfirm, title }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
      <p>
        Are you sure you want to delete the notice <strong>{title}</strong>?
      </p>
      <div className="mt-6 flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>
);

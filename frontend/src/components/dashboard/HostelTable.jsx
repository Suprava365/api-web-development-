"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";


export default function HostelTable() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentHostel, setCurrentHostel] = useState(null);

  const initialForm = {
    name: "",
    address: "",
    warden: "",
    contact: "",
    status: "Active",
    numberOfRooms: "",
    hasParking: false,
    hasCafeteria: false,
    description: "",
    wifiAvailable: false,
  };

  const [formData, setFormData] = useState(initialForm);

  // Fetch hostels from backend
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/hostels");
        setHostels(res.data);
      } catch (error) {
        toast.error("Failed to load hostels");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

const handleChange = (e) => {
  const { name, type, checked, value } = e.target;

  if (type === "checkbox") {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  } else if (type === "number") {
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

  const openAddModal = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const openEditModal = (hostel) => {
    setCurrentHostel(hostel);
    setFormData({ ...hostel, numberOfRooms: hostel.numberOfRooms || "" });
    setShowEditModal(true);
  };

  const openDeleteModal = (hostel) => {
    setCurrentHostel(hostel);
    setShowDeleteModal(true);
  };


  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/hostels", formData);
      setHostels((prev) => [...prev, res.data]);
      toast.success("Hostel added successfully");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to add hostel");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!currentHostel) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/api/hostels/${currentHostel._id}`,
        formData
      );
      setHostels((prev) =>
        prev.map((h) => (h.id === currentHostel.id ? res.data : h))
      );
      toast.success("Hostel updated successfully");
      setShowEditModal(false);
    } catch (error) {
      toast.error("Failed to update hostel");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentHostel) return;
    try {
      await axios.delete(`http://localhost:3000/api/hostels/${currentHostel.id}`);
      setHostels((prev) => prev.filter((h) => h.id !== currentHostel.id));
      toast.success("Hostel deleted");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete hostel");
    }
  };

  if (loading) return <p className="p-6">Loading hostels...</p>;

  



  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">All Hostels</h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add New Hostel
          </button>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Hostel</th>
              <th className="px-4 py-2">Warden</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel) => (
              <tr key={hostel.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{hostel.name}</div>
                    <div className="text-gray-500 text-xs">{hostel.address}</div>
                  </div>
                </td>
                <td className="px-4 py-2">{hostel.warden}</td>
                <td className="px-4 py-2">{hostel.contact}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hostel.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : hostel.status === "Maintenance"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hostel.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditModal(hostel)}
                      aria-label={`Edit ${hostel.name}`}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openDeleteModal(hostel)}
                      aria-label={`Delete ${hostel.name}`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {hostels.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                  No hostels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
{showAddModal && (
  <HostelFormModal
    title="Add New Hostel"
    onClose={() => setShowAddModal(false)}
    onSubmit={handleAddSubmit}
    formData={formData}
    handleChange={handleChange}
  />
)}

{showEditModal && (
  <HostelFormModal
    title="Edit Hostel"
    onClose={() => setShowEditModal(false)}
    onSubmit={handleEditSubmit}
    formData={formData}
    handleChange={handleChange}
  />
)}

        {showDeleteModal && (
  <DeleteConfirmModal
    hostelName={currentHostel?.name}
    onClose={() => setShowDeleteModal(false)}
    onConfirm={handleDeleteConfirm}
  />
)}

      </div>
    </>
  );
}



const HostelFormModal = ({ title, onClose, onSubmit, formData, handleChange }) => (
 <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-transparent"
        onClick={onClose}
      />
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-5xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close modal">
            <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Hostel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Warden Name</label>
              <input
                type="text"
                name="warden"
                value={formData.warden}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600">No. of Rooms</label>
              <input
                type="number"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                min={0}
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                name="hasParking"
                checked={formData.hasParking}
                onChange={handleChange}
                id="hasParking"
              />
              <label htmlFor="hasParking" className="text-sm text-gray-600">
                Parking Available
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                name="hasCafeteria"
                checked={formData.hasCafeteria}
                onChange={handleChange}
                id="hasCafeteria"
              />
              <label htmlFor="hasCafeteria" className="text-sm text-gray-600">
                Cafeteria Available
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                name="wifiAvailable"
                checked={formData.wifiAvailable}
                onChange={handleChange}
                id="wifiAvailable"
              />
              <label htmlFor="wifiAvailable" className="text-sm text-gray-600">
                Wi-Fi Available
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-600">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

);


 const DeleteConfirmModal = ({ onClose, onConfirm, hostelName }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-transparent"
        onClick={onClose}
      />
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
        <p>
          Are you sure you want to delete the hostel{" "}
          <strong>{hostelName}</strong>?
        </p>
        <div className="mt-6 flex justify-end space-x-4">
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


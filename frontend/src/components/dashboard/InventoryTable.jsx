"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

export default function InventoryTable() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentItem, setCurrentItem] = useState(null);

  const initialForm = {
    itemName: "",
    quantity: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/inventory");
        setInventory(res.data.data || []); 

      } catch (error) {
        toast.error("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setFormData({ ...item });
    setShowEditModal(true);
  };

  const openDeleteModal = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/inventory", formData);
      setInventory((prev) => [...prev, res.data]);
      toast.success("Item added successfully");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!currentItem) return;
    try {
      const res = await axios.put(`http://localhost:3000/api/inventory/${currentItem._id}`, formData);
      setInventory((prev) =>
        prev.map((i) => (i._id === currentItem._id ? res.data : i))
      );
      toast.success("Item updated successfully");
      setShowEditModal(false);
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentItem) return;
    try {
      await axios.delete(`http://localhost:3000/api/inventory/${currentItem._id}`);
      setInventory((prev) => prev.filter((i) => i._id !== currentItem._id));
      toast.success("Item deleted");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  if (loading) return <p className="p-6">Loading inventory...</p>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Inventory</h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add Item
          </button>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-2">
                    <CubeIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  {item.itemName}
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditModal(item)}
                      aria-label={`Edit ${item.itemName}`}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openDeleteModal(item)}
                      aria-label={`Delete ${item.itemName}`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddModal && (
          <InventoryFormModal
            title="Add New Item"
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {showEditModal && (
          <InventoryFormModal
            title="Edit Item"
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmModal
            itemName={currentItem?.itemName}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </>
  );
}

const InventoryFormModal = ({ title, onClose, onSubmit, formData, handleChange }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 backdrop-blur-sm bg-transparent" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose} aria-label="Close modal">
          <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            min={0}
            required
          />
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

const DeleteConfirmModal = ({ itemName, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 backdrop-blur-sm bg-transparent" onClick={onClose} />
    <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
      <p>Are you sure you want to delete the item <strong>{itemName}</strong>?</p>
      <div className="mt-6 flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>
);

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function MealTable() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentMeal, setCurrentMeal] = useState(null);

  const initialForm = {
    date: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/meals/plan");
      setMeals(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const openEditModal = (meal) => {
    setCurrentMeal(meal);
    setFormData({ ...meal });
    setShowEditModal(true);
  };

  const openDeleteModal = (meal) => {
    setCurrentMeal(meal);
    setShowDeleteModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/meals/plan", formData);
      setMeals((prev) => [...prev, res.data]);
      toast.success("Meal added successfully");
      setShowAddModal(false);
      fetchMeals();
    } catch (error) {
      toast.error("Failed to add meal");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/meals/plan/${currentMeal._id}`, formData);
      toast.success("Meal updated successfully");
      setShowEditModal(false);
      fetchMeals();
    } catch (error) {
      toast.error("Failed to update meal");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/meals/plan/${currentMeal._id}`);
      toast.success("Meal deleted successfully");
      setShowDeleteModal(false);
      fetchMeals();
    } catch (error) {
      toast.error("Failed to delete meal");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Meal Plans</h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add Meal Plan
          </button>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Breakfast</th>
              <th className="px-4 py-2">Lunch</th>
              <th className="px-4 py-2">Dinner</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{meal.date}</td>
                <td className="px-4 py-2">{meal.breakfast}</td>
                <td className="px-4 py-2">{meal.lunch}</td>
                <td className="px-4 py-2">{meal.dinner}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditModal(meal)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openDeleteModal(meal)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {meals.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                  No meals available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {(showAddModal || showEditModal) && (
          <MealFormModal
            title={showAddModal ? "Add Meal Plan" : "Edit Meal Plan"}
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
            itemName={currentMeal?.date}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </>
  );
}

function MealFormModal({ title, onClose, onSubmit, formData, handleChange }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-transparent"
        onClick={onClose}
      />
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Breakfast</label>
            <input
              type="text"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Lunch</label>
            <input
              type="text"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Dinner</label>
            <input
              type="text"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ onClose, onConfirm, itemName }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-transparent"
        onClick={onClose}
      />
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
        <p>Are you sure you want to delete the meal plan for <strong>{itemName}</strong>?</p>
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
}

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

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const initialForm = {
    name: "",
    email: "",
    password: "",
    role: "User",
    status: "Active",
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/users", formData);
      toast.success("User added successfully");
      setUsers((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setFormData(initialForm);
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  const handleEdit = async () => {
    try {
      const { _id, createdAt, ...cleanedData } = formData;
      const res = await axios.put(
        `http://localhost:3000/api/users/${_id}`,
        cleanedData
      );
      toast.success("User updated");
      setUsers((prev) =>
        prev.map((user) => (user._id === res.data._id ? res.data : user))
      );
      setShowEditModal(false);
      setFormData(initialForm);
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/${selectedUser._id}`
      );
      toast.success("User deleted");
      setUsers((prev) =>
        prev.filter((user) => user._id !== selectedUser._id)
      );
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const openEditModal = (user) => {
    setFormData(user);
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">All Users</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Add New User
          </button>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-4 py-2 text-gray-500">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-white/10 backdrop-blur-sm"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setFormData(initialForm);
              }}
            />
            <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 z-10">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setFormData(initialForm);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-semibold mb-4">
                {showAddModal ? "Add New User" : "Edit User"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showAddModal ? handleAdd() : handleEdit();
                }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required={showAddModal}
                  className="px-3 py-2 border rounded-md"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>User</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="col-span-full flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    {showAddModal ? "Add User" : "Update User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-white/10 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Delete User</h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete {" "}
                <span className="font-bold">{selectedUser?.name}</span>?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

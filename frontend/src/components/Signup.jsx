"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    setError("Please fill in all fields")
    return
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match")
    return
  }

  try {
    setLoading(true)
    setError("")

    const name = `${firstName} ${lastName}`.trim()

    const response = await axios.post("http://localhost:3000/api/auth/register", {
      name,
      email,
      password,
    })

    const { token } = response.data
    localStorage.setItem("hs_token", token)
    navigate("/login")
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed. Try again.")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Join Hostel Sathi</h2>
          <p className="text-sm text-gray-500">Create an account to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="first-name">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="last-name">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" id="terms" required className="h-4 w-4 text-blue-600" />
            <label htmlFor="terms" className="text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>

        <div className="mt-2 text-center">
          <Link to="/" className="text-sm text-blue-500 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup

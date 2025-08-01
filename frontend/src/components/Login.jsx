import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;

      // ✅ Store all values in sessionStorage
      sessionStorage.setItem("hs_token", token);
      sessionStorage.setItem("hs_user_id", user.id);
      sessionStorage.setItem("hs_user_email", user.email);
      sessionStorage.setItem("hs_user_name", user.name);
      sessionStorage.setItem("hs_user_role", user.role);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 500,
        onClose: () => navigate("/dashboard"),
      });
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <ToastContainer /> {/* Toast portal */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Welcome to Hostel Sathi</h2>
        <p style={{ textAlign: "center", marginBottom: "24px", color: "#666" }}>
          Log in to your account to continue
        </p>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Remember / Forgot */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: "6px" }} /> Remember me
            </label>
            <Link to="/forgot-password" style={{ color: "#007bff", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        {/* Sign‑up link */}
        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: "#007bff", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>

        {/* Back home */}
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Link to="/" style={{ color: "#007bff", textDecoration: "none", fontSize: "14px" }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

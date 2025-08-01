import React, { useState } from "react";

function Settings({ user }) {
  const [hostelName, setHostelName] = useState("Sunshine Hostel");
  const [address, setAddress] = useState("123 Main Street, City, State");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [contactPhone, setContactPhone] = useState("9876543210");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to a backend
    setMessage("Settings updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <div className="dashboard-header">
        <h1>Settings</h1>
        <p>Manage your hostel settings</p>
      </div>

      {message && <div className="success-message">{message}</div>}

      <div className="settings-container">
        <div className="settings-card">
          <h3>Hostel Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hostel-name">Hostel Name</label>
              <input
                type="text"
                id="hostel-name"
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Contact Email</label>
              <input
                type="email"
                id="contact-email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-phone">Contact Phone</label>
              <input
                type="tel"
                id="contact-phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>

        <div className="settings-card">
          <h3>Account Settings</h3>
          <div className="account-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">{user?.role === "owner" ? "Hostel Owner" : "Student"}</span>
            </div>
          </div>
          <div className="account-actions">
            <button className="btn btn-secondary">Change Password</button>
            <button className="btn btn-secondary">Update Profile</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;

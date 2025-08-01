import React from "react";

function Residents() {
  // Mock data for residents
  const residents = [
    { id: 1, name: "Rahul Sharma", room: "101", joinDate: "2023-05-15", rentStatus: "Paid" },
    { id: 2, name: "Priya Patel", room: "102", joinDate: "2023-06-20", rentStatus: "Paid" },
    { id: 3, name: "Amit Kumar", room: "204", joinDate: "2023-04-10", rentStatus: "Due" },
    { id: 4, name: "Neha Singh", room: "305", joinDate: "2023-07-05", rentStatus: "Paid" },
    { id: 5, name: "Vikram Mehta", room: "203", joinDate: "2023-03-22", rentStatus: "Paid" },
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1>Residents</h1>
        <p>Manage your hostel residents</p>
      </div>

      <div className="dashboard-actions">
        <div className="search-container">
          <input type="text" placeholder="Search residents..." className="search-input" />
        </div>
        <button className="btn btn-primary">Add New Resident</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room</th>
              <th>Join Date</th>
              <th>Rent Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.id}>
                <td>{resident.name}</td>
                <td>{resident.room}</td>
                <td>{new Date(resident.joinDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${resident.rentStatus.toLowerCase()}`}>
                    {resident.rentStatus}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-text">View</button>
                    <button className="btn btn-text">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Residents;

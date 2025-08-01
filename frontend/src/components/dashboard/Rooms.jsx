import React from "react";

function Rooms() {
  // Mock data for rooms
  const rooms = [
    { id: 1, number: "101", type: "Single", capacity: 1, occupied: 1, status: "Occupied" },
    { id: 2, number: "102", type: "Single", capacity: 1, occupied: 1, status: "Occupied" },
    { id: 3, number: "201", type: "Double", capacity: 2, occupied: 1, status: "Partially Occupied" },
    { id: 4, number: "202", type: "Double", capacity: 2, occupied: 2, status: "Occupied" },
    { id: 5, number: "301", type: "Triple", capacity: 3, occupied: 0, status: "Vacant" },
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1>Rooms</h1>
        <p>Manage your hostel rooms</p>
      </div>

      <div className="dashboard-actions">
        <div className="search-container">
          <input type="text" placeholder="Search rooms..." className="search-input" />
        </div>
        <button className="btn btn-primary">Add New Room</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Rooms</h3>
          <div className="stat-value">25</div>
        </div>
        <div className="stat-card">
          <h3>Occupied</h3>
          <div className="stat-value">20</div>
        </div>
        <div className="stat-card">
          <h3>Vacant</h3>
          <div className="stat-value">5</div>
        </div>
        <div className="stat-card">
          <h3>Maintenance</h3>
          <div className="stat-value">2</div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.number}</td>
                <td>{room.type}</td>
                <td>{room.capacity}</td>
                <td>{room.occupied}</td>
                <td>
                  <span className={`status-badge ${room.status.toLowerCase().replace(" ", "-")}`}>
                    {room.status}
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

export default Rooms;

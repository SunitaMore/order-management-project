import React, { useState } from "react";
import "./TableLayout.css"; // Add your CSS for styling

const TableLayout = () => {
  const [floors, setFloors] = useState([
    { name: "Ground Floor", tables: 10 },
    { name: "Basement", tables: 8 },
    { name: "Party Hall", tables: 5 },
  ]);
  
  const [selectedFloor, setSelectedFloor] = useState("Ground Floor");
  const [tables, setTables] = useState(
    new Array(10).fill(null).map((_, index) => ({ id: index + 1, status: "Available" }))
  );

  const handleTableClick = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? { ...table, status: table.status === "Available" ? "Occupied" : "Available" }
          : table
      )
    );
  };

  return (
    <div className="table-layout">
      <h2>Table Layout Management</h2>
      <div className="floor-selection">
        {floors.map((floor, index) => (
          <button
            key={index}
            className={selectedFloor === floor.name ? "active" : ""}
            onClick={() => {
              setSelectedFloor(floor.name);
              setTables(new Array(floor.tables).fill(null).map((_, idx) => ({ id: idx + 1, status: "Available" })));
            }}
          >
            {floor.name}
          </button>
        ))}
      </div>
      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table ${table.status.toLowerCase()}`}
            onClick={() => handleTableClick(table.id)}
          >
            {table.id} - {table.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLayout;

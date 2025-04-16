import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Order from "./Order";
import Inventory from "./Inventory";

const Dashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState("order");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="app-container">
     <nav className="navbar">
  <div className="navbar-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    
    <ul className="navbar-tabs" style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
      <li className={activeTab === "order" ? "active" : ""} onClick={() => setActiveTab("order")}>
        Order
      </li>
      <li className={activeTab === "inventory" ? "active" : ""} onClick={() => setActiveTab("inventory")}>
        Inventory
      </li>
      <li className={activeTab === "menu" ? "active" : ""} onClick={() => setActiveTab("menu")}>
        Menu
      </li>
      <li className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
        History
      </li>
      <li className={activeTab === "reports" ? "active" : ""} onClick={() => setActiveTab("reports")}>
        Reports
      </li>
      <li className={activeTab === "staff" ? "active" : ""} onClick={() => setActiveTab("staff")}>
        Staff
      </li>
    </ul>

    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>

  </div>
</nav>

      <div className="main-container">
        {activeTab === "order" ? <Order /> : <Inventory />}
      </div>
    </div>
  );
};

export default Dashboard;

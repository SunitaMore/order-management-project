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
        <div className="navbar-content">
          <ul className="navbar-tabs">
            <li className={activeTab === "order" ? "active" : ""} onClick={() => setActiveTab("order")}>
              Order Dashboard
            </li>
            <li className={activeTab === "inventory" ? "active" : ""} onClick={() => setActiveTab("inventory")}>
              Inventory Dashboard
            </li>

            
          </ul>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="main-container">
        {activeTab === "order" ? <Order /> : <Inventory />}
      </div>
    </div>
  );
};

export default Dashboard;

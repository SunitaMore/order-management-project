// import React, { useState } from "react";
// import Order from "./Order";
// import Inventory from "./Inventory";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   const [activeTab, setActiveTab] = useState("order");

//   return (
//     <div className="app-container">
//       <nav className="navbar">
//         <div className="navbar-content">
//           <ul className="navbar-tabs">
//             <li
//               className={activeTab === "order" ? "active" : ""}
//               onClick={() => setActiveTab("order")}
//             >
//               Order Dashboard
//             </li>
//             <li
//               className={activeTab === "inventory" ? "active" : ""}
//               onClick={() => setActiveTab("inventory")}
//             >
//               Inventory Dashboard
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <div className="main-container">
//         {activeTab === "order" ? <Order /> : <Inventory />}
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import Order from "./Order";
// import Inventory from "./Inventory";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   const [activeTab, setActiveTab] = useState("order");

//   return (
//     <div className="app-container">
//       <nav className="navbar">
//         <div className="navbar-content">
//           <ul className="navbar-tabs">
//             <li
//               className={activeTab === "order" ? "active" : ""}
//               onClick={() => setActiveTab("order")}
//             >
//               Order Dashboard
//             </li>
//             <li
//               className={activeTab === "inventory" ? "active" : ""}
//               onClick={() => setActiveTab("inventory")}
//             >
//               Inventory Dashboard
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <div className="main-container">
//         {activeTab === "order" ? <Order /> : <Inventory />}
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Order from "./Order";
// import Inventory from "./Inventory";
// import Dashboard from "./Dashboard";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";


// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const authStatus = localStorage.getItem("isAuthenticated");
//     setIsAuthenticated(authStatus === "true");
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* ✅ Default route redirects to login if not authenticated */}
//         <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />

//         {/* ✅ Login Page */}
//         <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />

//         {/* ✅ Protected Dashboard */}
//         <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />

//         {/* ✅ Protected Routes for Order and Inventory */}
//         <Route path="/order" element={isAuthenticated ? <Order /> : <Navigate to="/login" />} />
//         <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />} />
        
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Order from "./Order";
import Inventory from "./Inventory";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route redirects to login if not authenticated */}
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" replace /> : <Navigate to="/dashboard" replace />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />} />

        {/* Protected Routes for Order and Inventory */}
        <Route path="/order" element={isAuthenticated ? <Order /> : <Navigate to="/login" replace />} />
        <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

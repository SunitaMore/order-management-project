// // export default App;
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Login from "./Login";
// // import Order from "./Order";
// // import Inventory from "./Inventory";
// // import Dashboard from "./Dashboard";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./App.css";
// // import Table from './table';
// import MenuPage from "./MenuPage";
// import Menucard from "./Menucard";
// import { BrowserRouter } from 'react-router-dom';


// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     // <Router>
//     //   {/* <Table/> */}
//     //   {/* <Menucard/> */}
//     //   {/* <MenuPage/> */}
//     //   <Routes>
//     //   <BrowserRouter>
//     //   <Routes>
//     //     <Route path="/" element={<MenuPage />} />
//     //     <Route path="/viewmenu" element={<Menucard />} />
//     //   </Routes>
//     // </BrowserRouter>
//     //     {/* Default route redirects to login if not authenticated */}
//     //     {/* <Route path="/" element={!isAuthenticated ? <Navigate to="/login" replace /> : <Navigate to="/dashboard" replace />} /> */}

//     //     {/* Login Page */}
//     //     {/* <Route
//     //       path="/login"
//     //       element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" replace />}
//     //     /> */}

//     //     {/* Protected Dashboard */}
//     //     {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />} /> */}

//     //     {/* Protected Routes for Order and Inventory */}
//     //     {/* <Route path="/order" element={isAuthenticated ? <Order /> : <Navigate to="/login" replace />} />
//     //     <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" replace />} />
//     //     <Route path="/tables-floors" element={<Table/>} /> */}
//     //   </Routes>
//     // </Router>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<MenuPage />} />
//         <Route path="/View Menu" element={<Menucard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MenuCard from './Menucard'; // Assuming MenuCard is a separate component
// import MenuPage from './MenuPage';

// function App() {
//   const [showMenu, setShowMenu] = useState(false);

//   const handleClick = () => {
//     setShowMenu(true);
//   };

//   return (
//     <BrowserRouter>
//       <div>
//         <button onClick={handleClick}>View Menu</button>
//         {showMenu && <MenuCard />}
//       </div>
//       <Routes>
//         <Route path="/menu" element={<MenuCard />} />
      
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState } from 'react';
import MenuPage from './MenuPage';
import Menucard from './Menucard';

function App() {
  const [showMenuCard, setShowMenuCard] = useState(false);

  return (
    <div>
      {showMenuCard ? (
        <Menucard onBack={() => setShowMenuCard(false)} />

      ) : (
        <MenuPage onViewMenu={() => setShowMenuCard(true)} />
        
      )}
    </div>
  );
}

export default App;

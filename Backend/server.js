// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '', // or your MySQL password
//   database: 'order-db',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('MySQL connection failed:', err);
//     return;
//   }
//   console.log('✅ Connected to MySQL');
// });

// // ---------------------- ROUTES ----------------------

// // 📥 Add Category
// app.post('/api/categories', (req, res) => {
//   const { name } = req.body;
//   const query = 'INSERT INTO categaries (name) VALUES (?)';
//   db.query(query, [name], (err, result) => {
//     if (err) {
//       console.error('Failed to add category:', err);
//       return res.status(500).send('Server error');
//     }
//     res.status(201).send({ message: 'Category added', id: result.insertId });
//   });
// });

// // 📤 Get Categories
// app.get('/api/categories', (req, res) => {
//   db.query('SELECT * FROM categaries', (err, results) => {
//     if (err) {
//       console.error('Failed to fetch categories:', err);
//       return res.status(500).send('Server error');
//     }
//     res.json(results);
//   });
// });

// // 📥 Add Menu Item
// app.post('/api/menu-items', (req, res) => {
//   const { name, price, category } = req.body;
//   const query = 'INSERT INTO menu_items (name, price, category) VALUES (?, ?, ?)';
//   db.query(query, [name, price, category], (err, result) => {
//     if (err) {
//       console.error('Failed to add menu item:', err);
//       return res.status(500).send('Server error');
//     }
//     res.status(201).send({ message: 'Menu item added', id: result.insertId });
//   });
// });

// // 📤 Get Menu Items
// app.get('/api/menu-items', (req, res) => {
//   db.query('SELECT * FROM menu_items', (err, results) => {
//     if (err) {
//       console.error('Failed to fetch menu items:', err);
//       return res.status(500).send('Server error');
//     }
//     res.json(results);
//   });
// });

// // 🔄 Start Server
// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });

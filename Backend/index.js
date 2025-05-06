const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "order_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// API Endpoint to save customer data
app.post("/customer", async (req, res) => {
    console.log("Request received:", req.body); 
    try {
      const { name, email, contact } = req.body;
  
      if (!name || !email || !contact) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Assuming you are using MySQL
      const sql = "INSERT INTO customer (cust_name, cust_email, cust_contact) VALUES (?, ?, ?)";
    
      db.query(sql, [name, email, contact], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "Customer added successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

// // Fetch stock details
// app.get("/api/stock", (req, res) => {
//   const query = "SELECT * FROM stock_details";
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

// Route to Insert Product
app.post("/stock_details", (req, res) => {
  const {company, product, amount, size, quantity} = req.body;


   if (!company || !product || !amount || !size || !quantity ) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  // console.log(req.body)
  const sql = "INSERT INTO stock_details (company,product, amount, size, Quantity) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [company, product, amount, size, quantity], (err, result) => {
    if (err) {
      console.error("Error inserting product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Product added successfully" });
  });
});


app.get("/api/stock", (req, res) => {
  const sql = `
    SELECT id, company, product, amount, size, Quantity
    FROM stock_details
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching stock details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Organize data by company
    // const stockDetails = {};
    // results.forEach((item) => {
    //   if (!stockDetails[item.company]) {
    //     stockDetails[item.company] = [];
    //   }
    //   stockDetails[item.company].push({
    //     id: item.id,
    //     product: item.product,
    //     amount: item.amount,
    //     inches: item.inches,
    //     inches: item.Quantity,

    //   });
    // });

    res.json(results);
  });
});

app.post("/add-stock", (req, res) => {
  const { company, name, amount, size, quantity } = req.body;

  if (!company || !name || !amount || !size || !quantity) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const insertQuery = `INSERT INTO stock_details (company, product, amount, size, Quantity) VALUES (?, ?, ?, ?, ?)`;

  db.query(insertQuery, [company, name, amount, size, quantity], (err, result) => {
    if (err) {
      console.error("Error adding stock:", err);
      return res.json({ success: false, message: "Stock addition failed" });
    }
    res.json({ success: true });
  });
});



//invoice no in bill
// app.post("/update-sale", async (req, res) => {
//   const { invoiceNo, c_name, c_email, c_contact, product, price, size, total } = req.body;

//   const query = `
//     INSERT INTO sale (invoice_no, invoice_date, c_name, c_email, c_contact, Product, Price, Size, Total)
//     VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)
//   `;

//   try {
//     await db.execute(query, [invoiceNo, c_name, c_email, c_contact, product, price, size, total]);

//     res.json({ success: true, message: "Sale record updated successfully", invoiceNo });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });




app.get("/getStock", async (req, res) => {
  try {
    const stock = await db.query("SELECT * FROM stock_details");
    res.json(stock.rows); // Ensure you're sending an array
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ error: "Failed to fetch stock" });
  }
});


// API to Get Product Details by ID
app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT company, amount, size, Quantity FROM stock_details WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
});

// API to get unique companies sidebar
app.get("/api/stock_details", (req, res) => {
  const query = "SELECT DISTINCT company FROM stock_details";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching companies:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results.map(row => row.company)); // Send array of company names
  });
});

// ✅ Correct - Fetch products by selected company
app.get("/api/company", (req, res) => {
  const { company } = req.query;
  if (!company) {
    return res.status(400).json({ error: "Company is required" });
  }

  const query = "SELECT id, product, amount, size, Quantity FROM stock_details WHERE company = ?";
  db.query(query, [company], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // ✅ Send full product details instead of names
  });
});





app.post("/api/stock_details", async (req, res) => {
  const { id, operation } = req.body;

  try {
    let query = "";
    if (operation === "decrease") {
      query = `UPDATE stock SET Quantity = Quantity - 1 WHERE id = ? AND Quantity > 0`;
    }

    const result = await db.query(query, [id]);
    res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ success: false, message: "Failed to update stock" });
  }
});



// API to update stock in database after generate bill
app.post("/update-data", (req, res) => {
  const {  
    selectedProducts
  } = req.body;
  console.log("first",req.body)

  if (!selectedProducts || selectedProducts.length === 0) {
    return res.json({ success: false, message: "No products selected" });

  }

  console.log("Quantity",selectedProducts[0])

  let QuantitySum = Number(selectedProducts[0].Quantity) - Number(selectedProducts[0].quantity);
  console.log("QuantitySum",QuantitySum)

  const queries = selectedProducts.map((product) => {
    return new Promise((resolve, reject) => {
      const updateQuery = `UPDATE stock_details SET Quantity = ? WHERE id = ? `;
      db.query(updateQuery, [QuantitySum, product.id, ], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });

  Promise.all(queries)
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error("Stock update error:", err);
      res.json({ success: false, message: "Stock update failed" });
    });
});


//update stock after click update button in table that time open form fill update detail then click save
app.put("/api/stock/:id", (req, res) => {
  const { id } = req.params;
  const { company, product, size, amount, Quantity } = req.body;

  const sql = "UPDATE stock_details SET company=?, product=?, size=?, amount=?, Quantity=? WHERE id=?";
  db.query(sql, [company, product, size, amount, Quantity, id], (err, result) => {
    if (err) {
      console.error("Error updating stock:", err);
      res.status(500).json({ message: "Database update failed" });
    } else {
      res.status(200).json({ message: "Stock updated successfully" });
    }
  });
});


// ✅ Login API 
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    res.json({ success: true, message: "Login successful" });
  });
});






app.get("/latest-invoice", (req, res) => {
  const query = "SELECT invoice_no, date FROM invoices ORDER BY id DESC LIMIT 1";
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result[0]);
    }
  });
});


app.get("/api/menu", (req, res) => {
  const sql = `
    SELECT 
      product AS name,
      amount AS price
    FROM stock_details
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching stock menu:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Send renamed data
  });
});

app.get('/api/categories', (req, res) => {
  const sql = 'SELECT category_id, category_name FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results); // [{ id: 1, categary_name: 'Lunch' }, ...]
  });
});


app.post('/api/create', (req, res) => {
  const {
    category,
    item_name,
    description,
    price,
    availability,
    size,
    quantity,
    image
  } = req.body;

  if (!category || !item_name || !price || !size || quantity == null || availability == null) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  // Step 1: Get category ID
  const getCategoryQuery = 'SELECT category_id FROM categories WHERE category_name = ?';

  db.query(getCategoryQuery, [category], (err, categoryResults) => {
    if (err) {
      console.error('Error fetching category:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (categoryResults.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const categoryId = categoryResults[0].id;

    // Step 2: Insert into menu_item
    const insertQuery = `
      INSERT INTO menu_item (
        item_name,
        category_id,
        description,
        price,
        availability,
        size,
        quantity
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [item_name, categoryId, description, price, availability, size, quantity],
      (err, result) => {
        if (err) {
          console.error('Error inserting menu item:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({
          message: 'Menu item created successfully',
          item_id: result.insertId,
        });
      }
    );
  });
});


// GET all categories
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});








// POST add a new category
app.post('/api/categories/add', (req, res) => {
  const { category_name } = req.body;
  if (!category_name) return res.status(400).json({ error: 'Category name is required' });

  const sql = 'INSERT INTO categories (category_name) VALUES (?)';
  db.query(sql, [category_name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const newCategory = {
      category_id: result.insertId,
      category_name,
    };
    res.status(201).json(newCategory);
  });
});

// POST /api/menu-items/add
app.post('/api/menu_items/add', (req, res) => {
  const { name, description, price, quantity, category_id } = req.body;

  if (!name || !price || !quantity || !category_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = 'INSERT INTO menu_items (item_name, description, price, quantity, category_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, quantity, category_id], (err, result) => {
    if (err) {
      console.error('Error inserting menu item:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ id: result.insertId, name, description, price, quantity, category_id });
  });
});
// get request to fetch the data from the table menu_items

app.get('/api/menu_items/getall', (req,res)=>{
  const sql = `SELECT 
  mi.*, 
  c.category_name 
FROM 
  menu_items mi
JOIN 
  categories c ON mi.category_id = c.category_id;
`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results); 
  });
})

// backend API for delete categary

app.delete('/api/categories/delete/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Delete category from database
    await db.query('DELETE FROM categories WHERE category_id = ?', [categoryId]);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: 'Server error' });
  }
});





app.delete('/api/menu_items/delete/:id', (req, res) => {
  const itemId = req.params.id;

  const sql = 'DELETE FROM menu_items WHERE item_id = ?';
  db.query(sql, [itemId], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  });
});


app.put('/api/menu_items/update/:id', (req, res) => {
  const { name, price, category_id, description, quantity } = req.body; // Get description and quantity from the request body
  const { id } = req.params;

  // Update SQL query to include description and quantity
  const sql = `UPDATE menu_items SET item_name = ?, price = ?, category_id = ?, description = ?, quantity = ? WHERE item_id = ?`;

  // Execute the query with the additional fields (description and quantity)
  db.query(sql, [name, price, category_id, description, quantity, id], (err, result) => {
    if (err) {
      console.error('Error updating item:', err);
      return res.status(500).send('Error updating');
    }
    res.send('Updated successfully');
  });
});






app.listen(5000, () => {
  console.log("Server is running on port 5000");
});    
// import React, { useState, useRef, useEffect} from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Inventory = () => {
//   const [stock, setStock] = useState({});
//   const [stockDetails, setStockDetails] = useState({});
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedProducts, setSelectedProducts] = useState([]);
  
//   const [stockList, setStockList] = useState([]);
//   const [stockCount, setStockCount] = useState({});
//   //const [selectedPayment, setSelectedPayment] = useState("");


  

  
 

  


//   const handleCustomerChange = (event) => {
//     setCustomerInfo({
//       ...customerInfo,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("handleSubmit function is called");
  
//     try {
//       const response = await fetch("http://localhost:5000/customer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(customerInfo),
//       });
  
//       const result = await response.json();
//       console.log("Response from server:", result);
  
//       if (result.success) {
//         alert("Customer details saved successfully!");
  
//         // ✅ Preserve customer details for billing
//         setCustomerInfo((prev) => ({
//           ...prev,
//           saved: true, // Add a flag to indicate successful save
//         }));
//       } else {
//         alert("Failed to save customer details: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error saving customer details.");
//     }
//   };
  


  




    
//   // Fetch Stock Details from Backend nadim
//   useEffect(() => {
//     const fetchStockDetails = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/stock");
//         setStockDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching stock details:", error);
//       }
//     };

//     fetchStockDetails();
//   }, []);


//   const addProduct = (product, category) => {
//     setStockCount((prev) => ({
//       ...prev,
//       [product.id]: (prev[product.id] || 0) + 1, // Ensures count increases by 1
//     }));
  
//     setSelectedProducts((prevProducts) => {
//       const existingProduct = prevProducts.find((p) => p.id === product.id);
  
//       if (existingProduct) {
//         return prevProducts.map((p) =>
//           p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       } else {
//         return [...prevProducts, { ...product, quantity: 1, category }];
//       }
//     });
//   };
  


// const removeProduct = (product) => {
//   setSelectedProducts((prevProducts) =>
//     prevProducts
//       .map((p) =>
//         p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
//       )
//       .filter((p) => p.quantity > 0)
//   );
// };


//   const calculateGrandTotals = () => {
//     let totalItems = 0;
//     let totalPrice = 0;

//     selectedProducts.forEach((product) => {
//       totalItems += product.quantity;
//       totalPrice += product.quantity * product.amount;
//     });

//     return { totalItems, totalPrice };
//   };

//   // const handlePaymentSelection = (event) => {
//   //   setSelectedPaymentMethod(event.target.value);
//   // };
  


//   const handleInputChange = (e) => {
//     setPaymentDetails({
//       ...paymentDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

  
  
//   const grandTotals = calculateGrandTotals();


// useEffect(() => {
//   fetch("http://localhost:5000/getStock")
//       .then((res) => res.json())
//       .then((data) => setStockList(data))
//       .catch((error) => console.error("Error fetching stock:", error));
// }, []);


// const [isOpen, setIsOpen] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     amount: "",
//     size: "",
//   });

//   const [company, setCompany] = useState('');

//   // Open modal
//   const openPopup = () => setIsOpen(true);
//   // Close modal
//   const closePopup = () => setIsOpen(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
    
//   };
//   const handleCompanyChange = (e) => {
//     setCompany(e.target.value);
//   };

//   // Save Product (Send data to backend)
//   const saveProduct = () => {
//     if (!company || !product.name || !product.amount || !product.size) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newProduct = {
//       company,
//       name: product.name,
//       amount: product.amount,
//       inches: product.inches,
//   };

//   const saveProduct = () => {
//     if (company && product.name && product.amount && product.inches) {
//       setStock([...stock, { company, ...product }]);
//       setCompany("");
//       setProduct({ name: "", amount: "", inches: "" });
//       closePopup();
//     }
//   };

//   // Send new stock to the backend
//   fetch("http://localhost:5000/addStock", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newProduct),
//   })
//   .then((res) => res.json())
//   .then((data) => {
//       console.log("Stock added:", data);

//       // ✅ Immediately update stock list
//       setStockList((prevStock) => [...prevStock, data]);

//       // ✅ Clear input fields after saving
//       setProduct({ name: "", amount: "", inches: "" });
//       setCompany("");
//   })
//   .catch((error) => console.error("Error adding stock:", error));


//     try {
//       const response =  axios.post("http://localhost:5000/stock_details", {
//         company:company,
//         product: product.name,
//         amount: product.amount,
//         inches:(product.size),
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error saving product:", error);
//     }

//     console.log("Company Name:", company); // ✅ Logs the company name correctly
//     console.log("Product Data:", product); 
//     alert("Product Added Successfully!");
//     setProduct({name: "", amount: "", size: "" }); // Reset fields
//     setCompany("")
//     closePopup();
//   };

//     return (
//         <div className="content">
// <div className="container">
//       {/* Button to Open Modal */}
//       <button onClick={openPopup} className="add-button">
//         Add Stock
//       </button>


//       {/* Table to Display Stock */}
//       <table className="stock-table">
//           <thead>
//             <tr>
//               <th>Company Name</th>
//               <th>Product Name</th>
//               <th>Size (inches)</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//           {Array.isArray(stock) &&
//     stock.map((item, index) => (
//       <tr key={index}>
//         <td>{item.company}</td>
//         <td>{item.name}</td>
//         <td>{item.inches}</td>
//         <td>{item.amount}</td>
//       </tr>
//     ))}
//           </tbody>
//         </table>

//       {/* Popup Modal */}
//       {isOpen && (
//         <div className="overlay">
//           {/* <h2>Stock Details</h2> */}
//       {Object.keys(stock).map((company) => (
//         <div key={company} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
//           <h3>{company}</h3>
//           <ul>
//             {stock[company].map((item) => (
//               <li key={item.id}>
//                 <strong>{item.product}</strong> - {item.amount} units ({item.size} inches)
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//           <div className="popup">
//             <h2>Add Stock</h2>

//             {/* Form Fields */}
//             <input
//               type="text"
//               name="company"
//               value={company}
//               onChange={handleCompanyChange}
//               placeholder="Compney Name"
//               className="input-field"
//             />
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               placeholder="Product Name"
//               className="input-field"
//             />
//             <input
//               type="number"
//               name="amount" 
//               min={0}
//               value={product.amount}
//               onChange={handleChange}
//               placeholder="Amount"
//               className="input-field"
//             />
//             <input
//               type="number"
//               name="size"
//               min={0}
//               value={product.inches}
//               onChange={handleChange}
//               placeholder="Size"
//               className="input-field"
//             />

//             {/* Buttons */}
//             <div className="button-container">
//               <button onClick={saveProduct} className="save-button">
//                 Save
//               </button>
//               <button onClick={closePopup} className="close-button">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

   

          
              
            
//           </div>
        
//       );
//     }

// export default Inventory;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import FontAwesome Icons
import { FaSearch } from "react-icons/fa";
const Inventory = () => {


  const [stock, setStock] = useState([]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filteredStock1, setFilteredStock] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");


   
    // Fetch stock data from the database
    useEffect(() => {
      axios.get("http://localhost:5000/api/stock")
        .then((response) => setFilteredStock(response.data))
        .catch((error) => console.error("Error fetching stock data:", error));
    }, []);
  
    // Handle update button click
    const handleUpdateClick = (item) => {
      setSelectedItem({ ...item, id: item.id }); // Ensure id is included
    };
    
    // Handle input change in the form
    const handleChange1 = (e) => {
      setSelectedItem({
        ...selectedItem,
        [e.target.name]: e.target.value
      });
    };
  
    // Save updated data to the database
    const handleSave = () => {
      console.log("Updating Item:", selectedItem);
      axios.put(`http://localhost:5000/api/stock/${selectedItem.id}`, selectedItem)
        .then(() => {
          console.log("Update successful!");
          setFilteredStock((prevStock) =>
            prevStock.map((item) =>
              item.id === selectedItem.id ? selectedItem : item
            )
          );
          setSelectedItem(null); // Clear form after update
    
          // Show alert
          alert("Update successful!");
        })
        .catch((error) => {
          console.error("Error updating stock:", error);
          alert("Failed to update stock. Please try again.");
        });
    };
    
    
  

  
  const OrderSummary = ({ selectedOrders = [], stock = [] }) => {
    const outOfStockCount = Array.isArray(stock) ? stock.filter(item => item.Quantity === 0).length : 0;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    amount: "",
    size: "",
    quantity: "",
  });
  const [company, setCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

 // Filter stock based on search input
 const filteredStock = stock.filter((item) =>
  item.product.toLowerCase().includes(searchTerm.toLowerCase())
);

//for a table product serch
const fetchStock2 = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/stock");
    console.log("Fetched stock data:", response.data); // Debugging

    // Ensure the data is an array
    if (Array.isArray(response.data)) {
      setStock(response.data);
    } else {
      console.error("API returned non-array data:", response.data);
      setStock([]); // Prevent errors
    }
  } catch (error) {
    console.error("Error fetching stock:", error);
    setStock([]); // Prevent crash
  }
};




  // Fetch stock data on initial render
  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stock");
      console.log("Fetched stock data:", response.data); // Debugging
  
      // if (Array.isArray(response.data)) {
        setStock(response.data);
      // } else {
      //   console.error("Stock data is not an array:", response.data);
      //   setStock([]); // Prevent errors if data is incorrect
      // }
    } catch (error) {
      console.error("Error fetching stock:", error);
      setStock([]);
    }
  };
  useEffect(() => {
    console.log("Updated stock state:", stock);
  }, [stock]); // This logs whenever `stock` updates
    

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const saveProduct = async () => {
    if (!company || !product.name || !product.amount || !product.size || !product.quantity) {
      alert("Please fill all fields before saving.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/add-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          name: product.name,
          amount: product.amount,
          size: product.size,
          quantity: product.quantity,
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Stock added successfully!"); // ✅ Success message
        closePopup(); // Close modal after successful save
      } else {
        alert("Failed to add stock.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding stock.");
    }
  };
  
  useEffect(() => {
    fetch("/api/stock")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Stock Data:", data);
        setStock(Array.isArray(data) ? data : []); // Ensure it's an array
      })
      .catch((error) => console.error("Error fetching stock:", error));
  }, []);


  // const outOfStockCount = Array.isArray(stock) 
  // ? stock.filter(item => item.Quantity === 0).length 
  // : 0;

  const selectedQuantity = selectedItem ? selectedItem.quantity : 0;





// upadte stock minus api
  // const updateStock = async (selectedProducts) => {
  //     try {
  //         const response = await axios.post("http://localhost:5000/update-stock", {
  //             selectedProducts
  //         });
  
  //         if (response.data.success) {
  //             alert("Stock updated successfully!");
  //         } else {
  //             alert("Error: " + response.data.message);
  //         }
  //     } catch (error) {
  //         console.error("Error updating stock:", error);
  //         alert("Failed to update stock");
  //     }
  // };
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   // Fetch stock details from the database
//   // Backend: API to update stock after billing
// app.post('/api/update-stock', async (req, res) => {
//   const { selectedProducts } = req.body;

//   if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
//       return res.status(400).json({ success: false, message: "No products selected." });
//   }

//   const db = await getDBConnection();

//   try {
//       for (let product of selectedProducts) {
//           const { id, quantity } = product;

//           // Deduct stock
//           await db.query(
//               'UPDATE stock_details SET Quantity = Quantity - ? WHERE id = ?',
//               [quantity, id]
//           );
//       }

//       res.json({ success: true, message: "Stock updated successfully!" });
//   } catch (error) {
//       console.error("Error updating stock:", error);
//       res.status(500).json({ success: false, message: "Stock update failed" });
//   }
// });

const fetchStock1 = async () => {
  try {
      const response = await axios.get("http://localhost:5000/api/stock");
      setStock(response.data);
  } catch (error) {
      console.error("Error fetching stock:", error);
  }
};

const handleSelectProduct = (product) => {
  setSelectedProduct(product); // Ensures selectedProduct has a value
};


  return (
    <div className="content">
      <div className="inventory-header">

   


      {/* <h2 className="inventory-heading">Inventory Status</h2> */}
      <div style={{ display: "flex", alignItems: "center",marginBottom:"30px" }}>
  <button onClick={openPopup} className="btn btn-primary" style={{ marginRight: "270px" }}>
    Add Stock
  </button>
  <h2 className="inventory-heading" style={{ margin: 0 }}>
    Inventory Status
  </h2>

  <div style={{ position: "relative", display: "inline-block", marginLeft: "450px" }}>
  <FaSearch
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "black",
    }}
  />
  <input
    type="text"
    style={{
      padding: "8px 10px 8px 35px", // Left padding increased for the icon space
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "206px",
    }}
    placeholder="Search product..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

  
</div>

        {/* Add Stock Button
        <button onClick={openPopup} style={{marginRight:"980px"}} className="btn btn-primary ">
          Add Stock
        </button> */}

        {/* Popup Modal */}
        {isOpen && (
          <div className="overlay">
            <div className="popup">
              <h2>Add Stock</h2>

              <input
                type="text"
                name="company"
                value={company}
                onChange={handleCompanyChange}
                placeholder="Company Name"
                className="form-control mb-2"
              />
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="form-control mb-2"
              />
              <input
                type="number"
                name="amount"
                min={0}
                value={product.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="form-control mb-2"
              />
              <input
                type="number"
                name="size"
                min={0}
                value={product.size}
                onChange={handleChange}
                placeholder="Size (inches)"
                className="form-control mb-2"
              />
              <input
                type="number"
                name="quantity"
                min={0}
                value={product.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="form-control mb-2"
              />

              {/* Buttons */}
              <div className="button-container">
                <button onClick={saveProduct} className="btn btn-success">
                  Save
                </button>
                <button onClick={closePopup} className="btn btn-danger">
                  Close
                </button>
              </div>
            </div>
            
          </div>
          
        )}

      </div>


      <div className="inventory-container">
  
  {/* Top Section - Summary Boxes */}
 
  {/* <h2 className="inventory-heading">Inventory Status</h2> */}
  {/* <div className="search-container">
        {/* Search Input 
        <input
          type="text"
          className="search-input form-control mb-3"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}

      {/* Inventory Table */}
      
      
      {/* Left-side form */}
      <div className="form-table-container">
  <div className="update-product-form">
    <h3>Upgrade Stock</h3>

    <label>Company Name:</label>
    <input type="text" className="form-input" name="company"  value={selectedItem ? selectedItem.company : ""} onChange={handleChange1} />

    <label>Product Name:</label>
    <input type="text" className="form-input" name="product"  value={selectedItem ? selectedItem.product : ""} onChange={handleChange1} />

    <label>Size (inches):</label>
    <input type="text" className="form-input" name="inches"  value={selectedItem ? selectedItem.inches : ""} onChange={handleChange1} />

    <label>Amount:</label>
    <input type="text" className="form-input" name="amount"  value={selectedItem ? selectedItem.amount : ""} onChange={handleChange1} />

    <label>Quantity:</label>
    <input type="text" className="form-input" name="Quantity"  value={selectedItem ? selectedItem.Quantity : ""} onChange={handleChange1} />

    <button className="save-button" onClick={handleSave}>Save</button>
  </div>

  <div className="custom-table-container">
    <table className="custom-table">
      <thead>
        <tr>
          <th className="table-header">Company Name</th>
          <th className="table-header">Product Name</th>
          <th className="table-header">Size (inches)</th>
          <th className="table-header">Amount</th>
          <th className="table-header">Quantity</th>
          <th className="table-header">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredStock.length > 0 ? (
          filteredStock.map((item, index) => (
            <tr key={index}>
              <td className="table-data">{item.company}</td>
              <td className="table-data">{item.product}</td>
              <td className="table-data">{item.inches}</td>
              <td className="table-data">₹{item.amount}</td>
              <td className="table-data">{item.Quantity}</td>
              <td className="table-data">
                <button className="update-button" onClick={() => handleUpdateClick(item)}>
                  Update
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="no-data" colSpan="6">No products found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
</div>
    </div>
  );
};


export default Inventory;

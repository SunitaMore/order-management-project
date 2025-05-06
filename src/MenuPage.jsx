
// // // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // const MenuPage = () => {
// // // // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // // // //   const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for filtering

// // // // // // // // // // // //   // Fetch categories
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Fetch all menu items initially
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // // // //       .then((res) => {
// // // // // // // // // // // //         console.log(res.data);  // Debug log to check the fetched menu items data
// // // // // // // // // // // //         setMenuItems(res.data);
// // // // // // // // // // // //       })
// // // // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Add category to backend
// // // // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // // // //     if (!newCategory) {
// // // // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // // // //         category_name: newCategory
// // // // // // // // // // // //       });
// // // // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // // // //       setCategoryInput('');
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // // // //       setMenuItems(menuItems.filter(item => item.category_id !== id));
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Add menu item to backend
// // // // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     const { name, price, category_id } = itemInput;
// // // // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // // // //         name,
// // // // // // // // // // // //         price,
// // // // // // // // // // // //         category_id
// // // // // // // // // // // //       });

// // // // // // // // // // // //       const newItem = {
// // // // // // // // // // // //         ...itemInput,
// // // // // // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // // // //       };

// // // // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const deleteItem = (index) => {
// // // // // // // // // // // //     const updated = [...menuItems];
// // // // // // // // // // // //     updated.splice(index, 1);
// // // // // // // // // // // //     setMenuItems(updated);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Filter menu items based on selected category
// // // // // // // // // // // //   const filteredMenuItems = selectedCategory
// // // // // // // // // // // //     ? menuItems.filter(item => item.category_id === selectedCategory)
// // // // // // // // // // // //     : menuItems;

// // // // // // // // // // // //   const styles = {
// // // // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // // // //     categoryItem: {
// // // // // // // // // // // //       backgroundColor: '#ffe9c7',
// // // // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // // // //       display: 'flex',
// // // // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // // // //       alignItems: 'center',
// // // // // // // // // // // //       cursor: 'pointer' // Added cursor pointer
// // // // // // // // // // // //     },
// // // // // // // // // // // //     main: {
// // // // // // // // // // // //       flex: 1,
// // // // // // // // // // // //       padding: '20px',
// // // // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // // // //       display: 'flex',
// // // // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // // // //       alignItems: 'flex-start',
// // // // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     heading: { textAlign: 'center', color: 'maroon' },
// // // // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // // // //     input: {
// // // // // // // // // // // //       padding: '8px',
// // // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // // //       width: '350px'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     button: {
// // // // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // // //       border: 'none',
// // // // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // // // //       color: 'white',
// // // // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // // // //       width: '200px'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     deleteBtn: {
// // // // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // // // //       fontSize: '14px',
// // // // // // // // // // // //       color: 'white',
// // // // // // // // // // // //       border: 'none',
// // // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     menuGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
// // // // // // // // // // // //     menuCard: {
// // // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // // //       padding: '15px',
// // // // // // // // // // // //       width: '200px',
// // // // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // // // //             <div key={cat.category_id} style={styles.categoryItem}>
// // // // // // // // // // // //               <span
// // // // // // // // // // // //                 onClick={() => setSelectedCategory(cat.category_id)} // Update selectedCategory on click
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 {cat.category_name}
// // // // // // // // // // // //               </span>
// // // // // // // // // // // //               <button onClick={() => deleteCategory(cat.category_id)} style={styles.deleteBtn}>🗑</button>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management</h1>

// // // // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // // // //           <input
// // // // // // // // // // // //             type="text"
// // // // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // // // //             value={categoryInput}
// // // // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // // // //             style={styles.input}
// // // // // // // // // // // //           />
// // // // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // // // //           <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />
// // // // // // // // // // // //         </form>

// // // // // // // // // // // //         <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // // // //           <input
// // // // // // // // // // // //             type="text"
// // // // // // // // // // // //             placeholder="Item Name"
// // // // // // // // // // // //             value={itemInput.name}
// // // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // // // //             style={styles.input}
// // // // // // // // // // // //           />
// // // // // // // // // // // //           <input
// // // // // // // // // // // //             type="number"
// // // // // // // // // // // //             placeholder="Price"
// // // // // // // // // // // //             value={itemInput.price}
// // // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // // // //             style={styles.input}
// // // // // // // // // // // //           />
// // // // // // // // // // // //           <select
// // // // // // // // // // // //             value={itemInput.category_id}
// // // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // // // //             style={styles.input}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <option value="">Select Category</option>
// // // // // // // // // // // //             {categories.map((cat) => (
// // // // // // // // // // // //               <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // // // //                 {cat.category_name}
// // // // // // // // // // // //               </option>
// // // // // // // // // // // //             ))}
// // // // // // // // // // // //           </select>
// // // // // // // // // // // //           <button type="submit" style={styles.button}>Add Menu Item</button>
// // // // // // // // // // // //         </form>

// // // // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // // // //   {filteredMenuItems.length > 0 ? (
// // // // // // // // // // // //     filteredMenuItems.map((item, index) => (
// // // // // // // // // // // //       <div key={index} style={styles.menuCard}>
// // // // // // // // // // // //         <h3>{item.name}</h3> {/* Ensure this is the correct data */}
// // // // // // // // // // // //         <p>Price: ₹{item.price}</p>
// // // // // // // // // // // //         <p>Category: {item.category_name}</p>
// // // // // // // // // // // //         <button onClick={() => deleteItem(index)} style={styles.deleteBtn}>Delete</button>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     ))
// // // // // // // // // // // //   ) : (
// // // // // // // // // // // //     <p>No menu items found.</p>  // Message if no items exist
// // // // // // // // // // // //   )}
// // // // // // // // // // // // </div>

// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default MenuPage;


// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // const MenuPage = () => {
// // // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // // //   const [editingIndex, setEditingIndex] = useState(null);
// // // // // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
// // // // // // // // // // //   const [showEditPopup, setShowEditPopup] = useState(false); // State to control popup visibility

// // // // // // // // // // //   // Fetch categories
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Fetch menu items
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Add category
// // // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // // //     if (!newCategory) {
// // // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // // //         category_name: newCategory
// // // // // // // // // // //       });
// // // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // // //       setCategoryInput('');
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };


// // // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // // // // //     // Check if all fields are filled
// // // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // // //     try {
// // // // // // // // // // //       if (editingIndex !== null) {
// // // // // // // // // // //         // Update existing item (Edit Mode)
// // // // // // // // // // //         const itemToUpdate = menuItems[editingIndex];
// // // // // // // // // // //         const updatedItem = {
// // // // // // // // // // //           ...itemToUpdate,
// // // // // // // // // // //           name,
// // // // // // // // // // //           price,
// // // // // // // // // // //           category_id,
// // // // // // // // // // //           category_name: selectedCategory?.category_name || 'Unknown',
// // // // // // // // // // //         };

// // // // // // // // // // //         // Send update request to backend
// // // // // // // // // // //         await axios.put(`http://localhost:5000/api/menu_items/update/${itemToUpdate.item_id}`, updatedItem);

// // // // // // // // // // //         // Update the local state
// // // // // // // // // // //         const updatedItems = [...menuItems];
// // // // // // // // // // //         updatedItems[editingIndex] = updatedItem;
// // // // // // // // // // //         setMenuItems(updatedItems);

// // // // // // // // // // //         // Reset form and close popup
// // // // // // // // // // //         setEditingIndex(null);
// // // // // // // // // // //         setShowEditPopup(false);
// // // // // // // // // // //       } else {
// // // // // // // // // // //         // Add new item (New Item Mode)
// // // // // // // // // // //         const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // // //           name,
// // // // // // // // // // //           price,
// // // // // // // // // // //           category_id
// // // // // // // // // // //         });

// // // // // // // // // // //         const newItem = {
// // // // // // // // // // //           ...itemInput,
// // // // // // // // // // //           category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // // //         };
// // // // // // // // // // //         setMenuItems([...menuItems, newItem]);
// // // // // // // // // // //       }

// // // // // // // // // // //       // Reset the input fields after the operation
// // // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });

// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error adding/updating menu item:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // // // // //       setMenuItems(updated);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Delete failed:', err);
// // // // // // // // // // //       alert('Could not delete item.');
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleEdit = (index) => {
// // // // // // // // // // //     const item = menuItems[index];
// // // // // // // // // // //     setItemInput({
// // // // // // // // // // //       name: item.name || item.item_name,
// // // // // // // // // // //       price: item.price,
// // // // // // // // // // //       category_id: item.category_id?.toString() || ''
// // // // // // // // // // //     });
// // // // // // // // // // //     setEditingIndex(index);
// // // // // // // // // // //     setShowEditPopup(true); // Show the popup for editing
// // // // // // // // // // //   };

// // // // // // // // // // //   const closeEditPopup = () => {
// // // // // // // // // // //     setShowEditPopup(false);
// // // // // // // // // // //     setItemInput({ name: '', price: '', category_id: '' }); // Clear the form
// // // // // // // // // // //     setEditingIndex(null);
// // // // // // // // // // //   };

// // // // // // // // // // //   const styles = {
// // // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // // //     categoryItem: {
// // // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // // //       alignItems: 'center',
// // // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // // //     },
// // // // // // // // // // //     main: {
// // // // // // // // // // //       flex: 1,
// // // // // // // // // // //       padding: '20px',
// // // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // // //       alignItems: 'flex-start',
// // // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // // //     },
// // // // // // // // // // //     heading: { textAlign: 'center', color: 'maroon' },
// // // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // // //     input: {
// // // // // // // // // // //       padding: '8px',
// // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // //       width: '350px'
// // // // // // // // // // //     },
// // // // // // // // // // //     button: {
// // // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // // //       width: '200px'
// // // // // // // // // // //     },
// // // // // // // // // // //     deleteBtn: {
// // // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // // //       fontSize: '14px',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // // //     },
// // // // // // // // // // //     menuGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
// // // // // // // // // // //     menuCard: {
// // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // //       padding: '15px',
// // // // // // // // // // //       width: '200px',
// // // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // // // // // // // // // //     },
// // // // // // // // // // //     modal: {
// // // // // // // // // // //       position: 'fixed',
// // // // // // // // // // //       top: '0',
// // // // // // // // // // //       left: '0',
// // // // // // // // // // //       right: '0',
// // // // // // // // // // //       bottom: '0',
// // // // // // // // // // //       backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       justifyContent: 'center',
// // // // // // // // // // //       alignItems: 'center',
// // // // // // // // // // //     },
// // // // // // // // // // //     modalContent: {
// // // // // // // // // // //       backgroundColor: '#fff',
// // // // // // // // // // //       padding: '20px',
// // // // // // // // // // //       borderRadius: '8px',
// // // // // // // // // // //       width: '400px',
// // // // // // // // // // //       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // // // // // // // // //     },
// // // // // // // // // // //     closeButton: {
// // // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // // //       width: '100%',
// // // // // // // // // // //       marginTop: '10px',
// // // // // // // // // // //     },
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // // //             <div
// // // // // // // // // // //               key={cat.category_id}
// // // // // // // // // // //               style={{
// // // // // // // // // // //                 ...styles.categoryItem,
// // // // // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // // // // //               }}
// // // // // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // // // // //             >
// // // // // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={(e) => {
// // // // // // // // // // //                   e.stopPropagation();
// // // // // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 style={styles.deleteBtn}
// // // // // // // // // // //               >
// // // // // // // // // // //                 🗑
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //           <button
// // // // // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // // // // //           >
// // // // // // // // // // //             Show All
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management</h1>

// // // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="text"
// // // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // // //             value={categoryInput}
// // // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // // //         </form>

// // // // // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // // // // //         <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="text"
// // // // // // // // // // //             placeholder="Item Name"
// // // // // // // // // // //             value={itemInput.name}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="number"
// // // // // // // // // // //             placeholder="Price"
// // // // // // // // // // //             value={itemInput.price}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <select
// // // // // // // // // // //             value={itemInput.category_id}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           >
// // // // // // // // // // //             <option value="">Select Category</option>
// // // // // // // // // // //             {categories.map((cat) => (
// // // // // // // // // // //               <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // // //                 {cat.category_name}
// // // // // // // // // // //               </option>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </select>
// // // // // // // // // // //           <button
// // // // // // // // // // //             type="submit"
// // // // // // // // // // //             style={{ ...styles.button, marginBottom: '20px' }}
// // // // // // // // // // //           >
// // // // // // // // // // //             {editingIndex !== null ? 'Update Menu Item' : 'Add Menu Item'}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </form>

// // // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // // //           {menuItems
// // // // // // // // // // //             .filter(item =>
// // // // // // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // // // // //             )
// // // // // // // // // // //             .map((item, index) => (
// // // // // // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // // // // // //                 <p>Category: {item.category_name}</p>
// // // // // // // // // // //                 <div style={{ display: 'flex', gap: '8px' }}>
// // // // // // // // // // //                   <button onClick={() => handleEdit(index)} style={{ ...styles.deleteBtn, backgroundColor: '#ffc107' }}>
// // // // // // // // // // //                     Edit
// // // // // // // // // // //                   </button>
// // // // // // // // // // //                   <button onClick={() => deleteItem(index)} style={styles.deleteBtn}>
// // // // // // // // // // //                     Delete
// // // // // // // // // // //                   </button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ))}
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Modal for Edit Item */}
// // // // // // // // // // //         {showEditPopup && (
// // // // // // // // // // //   <div style={styles.modal}>
// // // // // // // // // // //     <div style={styles.modalContent}>
// // // // // // // // // // //       <h2>Edit Menu Item</h2>
// // // // // // // // // // //       <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="text"
// // // // // // // // // // //           placeholder="Item Name"
// // // // // // // // // // //           value={itemInput.name}
// // // // // // // // // // //           onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // // //           style={styles.input}
// // // // // // // // // // //         />
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="number"
// // // // // // // // // // //           placeholder="Price"
// // // // // // // // // // //           value={itemInput.price}
// // // // // // // // // // //           onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // // //           style={styles.input}
// // // // // // // // // // //         />
// // // // // // // // // // //         <select
// // // // // // // // // // //           value={itemInput.category_id}
// // // // // // // // // // //           onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // // //           style={styles.input}
// // // // // // // // // // //         >
// // // // // // // // // // //           <option value="">Select Category</option>
// // // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // // //             <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // // //               {cat.category_name}
// // // // // // // // // // //             </option>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </select>
// // // // // // // // // // //         <button
// // // // // // // // // // //           type="submit"
// // // // // // // // // // //           style={{ ...styles.button, marginBottom: '20px' }}
// // // // // // // // // // //         >
// // // // // // // // // // //           Update Menu Item
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </form>
// // // // // // // // // // //       <button onClick={closeEditPopup} style={styles.closeButton}>Close</button>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   </div>
// // // // // // // // // // // )}


// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default MenuPage;


// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // const MenuPage = () => {
// // // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);


// // // // // // // // // // //   // Fetch categories
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Fetch menu items
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Add category
// // // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // // //     if (!newCategory) {
// // // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // // //         category_name: newCategory
// // // // // // // // // // //       });
// // // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // // //       setCategoryInput('');
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // // //         name,
// // // // // // // // // // //         price,
// // // // // // // // // // //         category_id
// // // // // // // // // // //       });

// // // // // // // // // // //       const newItem = {
// // // // // // // // // // //         ...itemInput,
// // // // // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // // //       };
// // // // // // // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // // // // //       setMenuItems(updated);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Delete failed:', err);
// // // // // // // // // // //       alert('Could not delete item.');
// // // // // // // // // // //     }
// // // // // // // // // // //   };


// // // // // // // // // // //   const styles = {
// // // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // // //     categoryItem: {
// // // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // // //       alignItems: 'center',
// // // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // // //     },
// // // // // // // // // // //     main: {
// // // // // // // // // // //       flex: 1,
// // // // // // // // // // //       padding: '20px',
// // // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // // //       alignItems: 'flex-start',
// // // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // // //     },
// // // // // // // // // // //     heading: { textAlign: 'center', color: 'maroon' },
// // // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // // //     input: {
// // // // // // // // // // //       padding: '8px',
// // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // //       width: '350px'
// // // // // // // // // // //     },
// // // // // // // // // // //     button: {
// // // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // // //       width: '200px'
// // // // // // // // // // //     },
// // // // // // // // // // //     deleteBtn: {
// // // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // // //       fontSize: '14px',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // // //     },
// // // // // // // // // // //     menuGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
// // // // // // // // // // //     menuCard: {
// // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // //       padding: '15px',
// // // // // // // // // // //       width: '200px',
// // // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // // //             <div
// // // // // // // // // // //               key={cat.category_id}
// // // // // // // // // // //               style={{
// // // // // // // // // // //                 ...styles.categoryItem,
// // // // // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // // // // //               }}
// // // // // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // // // // //             >
// // // // // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={(e) => {
// // // // // // // // // // //                   e.stopPropagation();
// // // // // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 style={styles.deleteBtn}
// // // // // // // // // // //               >
// // // // // // // // // // //                 🗑
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //           <button
// // // // // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // // // // //           >
// // // // // // // // // // //             Show All
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management</h1>

// // // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="text"
// // // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // // //             value={categoryInput}
// // // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // // //         </form>

// // // // // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // // // // //         <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="text"
// // // // // // // // // // //             placeholder="Item Name"
// // // // // // // // // // //             value={itemInput.name}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="number"
// // // // // // // // // // //             placeholder="Price"
// // // // // // // // // // //             value={itemInput.price}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <select
// // // // // // // // // // //             value={itemInput.category_id}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           >
// // // // // // // // // // //             <option value="">Select Category</option>
// // // // // // // // // // //             {categories.map((cat) => (
// // // // // // // // // // //               <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // // //                 {cat.category_name}
// // // // // // // // // // //               </option>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </select>
// // // // // // // // // // //           <button
// // // // // // // // // // //             type="submit"
// // // // // // // // // // //             style={{ ...styles.button, marginBottom: '20px' }}
// // // // // // // // // // //           >
// // // // // // // // // // //             Add Menu Item
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </form>

// // // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // // //           {menuItems
// // // // // // // // // // //             .filter(item =>
// // // // // // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // // // // //             )
// // // // // // // // // // //             .map((item, index) => (
// // // // // // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // // // // // //                 <p>Category: {item.category_name}</p>
// // // // // // // // // // //                 <button onClick={() => deleteItem(item.item_id)} style={styles.deleteBtn}>
// // // // // // // // // // //                   Delete
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default MenuPage;

// // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // const MenuPage = () => {
// // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // // // // // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // // // // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // // // // // // // //   // Fetch categories
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Fetch menu items
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Add category
// // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // //     if (!newCategory) {
// // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // //         category_name: newCategory
// // // // // // // // // //       });
// // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // //       setCategoryInput('');
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // //         name,
// // // // // // // // // //         price,
// // // // // // // // // //         category_id
// // // // // // // // // //       });

// // // // // // // // // //       const newItem = {
// // // // // // // // // //         ...itemInput,
// // // // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // //       };
// // // // // // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // // // //       setMenuItems(updated);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Delete failed:', err);
// // // // // // // // // //       alert('Could not delete item.');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleEditClick = (item) => {
// // // // // // // // // //     setEditingItem(item);
// // // // // // // // // //     setEditInput({
// // // // // // // // // //       name: item.name || item.item_name,
// // // // // // // // // //       price: item.price,
// // // // // // // // // //       category_id: item.category_id
// // // // // // // // // //     });
// // // // // // // // // //     setShowEditPopup(true);
// // // // // // // // // //   };

// // // // // // // // // //   const updateItem = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     if (!editingItem) return;
  
// // // // // // // // // //     const { name, price, category_id } = editInput;
  
// // // // // // // // // //     // Fix: Check fields properly
// // // // // // // // // //     if (
// // // // // // // // // //       name.trim() === '' ||
// // // // // // // // // //       price === '' ||
// // // // // // // // // //       category_id === ''
// // // // // // // // // //     ) {
// // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // //       return;
// // // // // // // // // //     }
  
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // // // // // // // //       // Update frontend
// // // // // // // // // //       setMenuItems(menuItems.map(item =>
// // // // // // // // // //         item.item_id === editingItem.item_id
// // // // // // // // // //           ? { ...item, ...editInput }
// // // // // // // // // //           : item
// // // // // // // // // //       ));
  
// // // // // // // // // //       setShowEditPopup(false);
// // // // // // // // // //       setEditingItem(null);
// // // // // // // // // //       alert('Item updated successfully!');
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error updating item:', err);
// // // // // // // // // //       alert('Could not update item.');
// // // // // // // // // //     }
// // // // // // // // // //   };
  
  

// // // // // // // // // //   const styles = {
// // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // //     categoryItem: {
// // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // //       alignItems: 'center',
// // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // //     },
// // // // // // // // // //     main: {
// // // // // // // // // //       flex: 1,
// // // // // // // // // //       padding: '20px',
// // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // //     },
    
// // // // // // // // // //     heading: { 
// // // // // // // // // //       width: '100%',
// // // // // // // // // //       textAlign: 'center',
// // // // // // // // // //       color: 'red',
// // // // // // // // // //       marginBottom: '20px'
// // // // // // // // // //     },
    

// // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // //     input: {
// // // // // // // // // //       padding: '8px',
// // // // // // // // // //       fontSize: '16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // //       width: '500px'
// // // // // // // // // //     },
// // // // // // // // // //     button: {
// // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // //       fontSize: '16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // //       width: '200px',
// // // // // // // // // //     },
// // // // // // // // // //     deleteBtn: {
// // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // //       fontSize: '14px',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // //     },
// // // // // // // // // //     menuGrid: { 
// // // // // // // // // //       display: 'grid', 
// // // // // // // // // //       gridTemplateColumns: 'repeat(5, 1fr)', 
// // // // // // // // // //       gap: '20px',
// // // // // // // // // //       justifyContent: 'center',
// // // // // // // // // //       marginTop: '20px'
// // // // // // // // // //     },
    
// // // // // // // // // //     menuCard: {
// // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // //       padding: '15px',
// // // // // // // // // //       width: '220px',
// // // // // // // // // //       height: '200px',  // Fixed height
// // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // //       marginTop:'15px'
     
// // // // // // // // // //     },
// // // // // // // // // //     itemInputRow: {
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       alignItems: 'center',
// // // // // // // // // //       justifyContent: 'center',
// // // // // // // // // //       gap: '10px',
// // // // // // // // // //       flexWrap: 'wrap',
// // // // // // // // // //       marginBottom: '10px',
// // // // // // // // // //       width:'600px'
// // // // // // // // // //     },
// // // // // // // // // //     itemForm: {
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // //       alignItems: 'center',
// // // // // // // // // //       margin: '20px 0',
// // // // // // // // // //     }
    

// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // //             <div
// // // // // // // // // //               key={cat.category_id}
// // // // // // // // // //               style={{
// // // // // // // // // //                 ...styles.categoryItem,
// // // // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // // // //               }}
// // // // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // // // //             >
// // // // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={(e) => {
// // // // // // // // // //                   e.stopPropagation();
// // // // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // // // //                 }}
// // // // // // // // // //                 style={styles.deleteBtn}
// // // // // // // // // //               >
// // // // // // // // // //                 🗑
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // // // //           >
// // // // // // // // // //             Show All
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // //           <input
// // // // // // // // // //             type="text"
// // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // //             value={categoryInput}
// // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // //         </form>

// // // // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // // // // // // // //   <div style={styles.itemInputRow}>
// // // // // // // // // //     <input
// // // // // // // // // //       type="text"
// // // // // // // // // //       placeholder="Item Name"
// // // // // // // // // //       value={itemInput.name}
// // // // // // // // // //       onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // //       style={styles.input}
// // // // // // // // // //     />
// // // // // // // // // //     <input
// // // // // // // // // //       type="number"
// // // // // // // // // //       placeholder="Price"
// // // // // // // // // //       value={itemInput.price}
// // // // // // // // // //       onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // //       style={styles.input}
// // // // // // // // // //     />
// // // // // // // // // //     <select
// // // // // // // // // //       value={itemInput.category_id}
// // // // // // // // // //       onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // //       style={styles.input}
// // // // // // // // // //     >
// // // // // // // // // //       <option value="">Select Category</option>
// // // // // // // // // //       {categories.map((cat) => (
// // // // // // // // // //         <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // //           {cat.category_name}
// // // // // // // // // //         </option>
// // // // // // // // // //       ))}
// // // // // // // // // //     </select>
// // // // // // // // // //   </div>
  
// // // // // // // // // //   <button type="submit" style={styles.button}>
// // // // // // // // // //     Add Menu Item
// // // // // // // // // //   </button>
// // // // // // // // // // </form>


// // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // //           {menuItems
// // // // // // // // // //             .filter(item =>
// // // // // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // // // //             )
// // // // // // // // // //             .map((item, index) => (
// // // // // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // // // // //                 <p>Category: {item.category_name}</p>

// // // // // // // // // //                 <div style={{
// // // // // // // // // //                   display: 'flex',
// // // // // // // // // //                   justifyContent: 'center',  // center both buttons together
// // // // // // // // // //                   alignItems: 'center',
// // // // // // // // // //                   gap: '8px',                 // small gap between buttons
// // // // // // // // // //                   marginTop: '10px'
// // // // // // // // // //                 }}>
// // // // // // // // // //                   <button
// // // // // // // // // //                     onClick={() => handleEditClick(item)}
// // // // // // // // // //                     style={{
// // // // // // // // // //                       ...styles.deleteBtn,
// // // // // // // // // //                       backgroundColor: '#ffc107',
// // // // // // // // // //                       padding: '6px 12px',
// // // // // // // // // //                       fontSize: '14px',
// // // // // // // // // //                       width:'80px'
// // // // // // // // // //                     }}
// // // // // // // // // //                   >
// // // // // // // // // //                     Edit
// // // // // // // // // //                   </button>
// // // // // // // // // //                   <button
// // // // // // // // // //                     onClick={() => deleteItem(item.item_id)}
// // // // // // // // // //                     style={{
// // // // // // // // // //                       ...styles.deleteBtn,
// // // // // // // // // //                       padding: '6px 12px',
// // // // // // // // // //                       fontSize: '14px',
// // // // // // // // // //                        width:'80px'
// // // // // // // // // //                     }}
// // // // // // // // // //                   >
// // // // // // // // // //                     Delete
// // // // // // // // // //                   </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>



// // // // // // // // // //             ))}
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* Popup for editing */}
// // // // // // // // // //         {showEditPopup && (
// // // // // // // // // //           <div style={{
// // // // // // // // // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // // // // // // // // //             backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
// // // // // // // // // //             alignItems: 'center', justifyContent: 'center'
// // // // // // // // // //           }}>
// // // // // // // // // //             <div style={{
// // // // // // // // // //               background: 'white', padding: '30px', borderRadius: '10px',
// // // // // // // // // //             width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'
// // // // // // // // // //             }}>
// // // // // // // // // //               <h2>Edit Menu Item</h2>
// // // // // // // // // //               <input
// // // // // // // // // //                 type="text"
// // // // // // // // // //                 placeholder="Item Name"
// // // // // // // // // //                 value={editInput.name}
// // // // // // // // // //                 onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// // // // // // // // // //                 style={styles.input}
// // // // // // // // // //               />
// // // // // // // // // //               <input
// // // // // // // // // //                 type="number"
// // // // // // // // // //                 placeholder="Price"
// // // // // // // // // //                 value={editInput.price}
// // // // // // // // // //                 onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
// // // // // // // // // //                 style={styles.input}
// // // // // // // // // //               />
// // // // // // // // // //               <select
// // // // // // // // // //                 value={editInput.category_id}
// // // // // // // // // //                 onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
// // // // // // // // // //                 style={styles.input}
// // // // // // // // // //               >
// // // // // // // // // //                 <option value="">Select Category</option>
// // // // // // // // // //                 {categories.map((cat) => (
// // // // // // // // // //                   <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // //                     {cat.category_name}
// // // // // // // // // //                   </option>
// // // // // // // // // //                 ))}
// // // // // // // // // //               </select>
// // // // // // // // // //               <div style={{ display: 'flex', justifyContent: 'center' }}>
// // // // // // // // // //                 <button onClick={updateItem} style={styles.button}>
// // // // // // // // // //                   Update Item
// // // // // // // // // //                 </button>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div style={{ display: 'flex', justifyContent: 'center' }}>
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => {
// // // // // // // // // //                     setShowEditPopup(false);
// // // // // // // // // //                     setEditingItem(null);
// // // // // // // // // //                   }}
// // // // // // // // // //                   style={{ ...styles.button, backgroundColor: 'red', }}
// // // // // // // // // //                 >
// // // // // // // // // //                   Cancel
// // // // // // // // // //                 </button>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MenuPage;


// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // const MenuPage = () => {
// // // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // // //   const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for filtering

// // // // // // // // // // //   // Fetch categories
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Fetch all menu items initially
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // // //       .then((res) => {
// // // // // // // // // // //         console.log(res.data);  // Debug log to check the fetched menu items data
// // // // // // // // // // //         setMenuItems(res.data);
// // // // // // // // // // //       })
// // // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Add category to backend
// // // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // // //     if (!newCategory) {
// // // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // // //         category_name: newCategory
// // // // // // // // // // //       });
// // // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // // //       setCategoryInput('');
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // // //       setMenuItems(menuItems.filter(item => item.category_id !== id));
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Add menu item to backend
// // // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const { name, price, category_id } = itemInput;
// // // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // // //         name,
// // // // // // // // // // //         price,
// // // // // // // // // // //         category_id
// // // // // // // // // // //       });

// // // // // // // // // // //       const newItem = {
// // // // // // // // // // //         ...itemInput,
// // // // // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // // //       };

// // // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const deleteItem = (index) => {
// // // // // // // // // // //     const updated = [...menuItems];
// // // // // // // // // // //     updated.splice(index, 1);
// // // // // // // // // // //     setMenuItems(updated);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Filter menu items based on selected category
// // // // // // // // // // //   const filteredMenuItems = selectedCategory
// // // // // // // // // // //     ? menuItems.filter(item => item.category_id === selectedCategory)
// // // // // // // // // // //     : menuItems;

// // // // // // // // // // //   const styles = {
// // // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // // //     categoryItem: {
// // // // // // // // // // //       backgroundColor: '#ffe9c7',
// // // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // // //       alignItems: 'center',
// // // // // // // // // // //       cursor: 'pointer' // Added cursor pointer
// // // // // // // // // // //     },
// // // // // // // // // // //     main: {
// // // // // // // // // // //       flex: 1,
// // // // // // // // // // //       padding: '20px',
// // // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // // //       display: 'flex',
// // // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // // //       alignItems: 'flex-start',
// // // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // // //     },
// // // // // // // // // // //     heading: { textAlign: 'center', color: 'maroon' },
// // // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // // //     input: {
// // // // // // // // // // //       padding: '8px',
// // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // //       width: '350px'
// // // // // // // // // // //     },
// // // // // // // // // // //     button: {
// // // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // // //       fontSize: '16px',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // // //       width: '200px'
// // // // // // // // // // //     },
// // // // // // // // // // //     deleteBtn: {
// // // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // // //       fontSize: '14px',
// // // // // // // // // // //       color: 'white',
// // // // // // // // // // //       border: 'none',
// // // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // // //     },
// // // // // // // // // // //     menuGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
// // // // // // // // // // //     menuCard: {
// // // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // // //       padding: '15px',
// // // // // // // // // // //       width: '200px',
// // // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // // //             <div key={cat.category_id} style={styles.categoryItem}>
// // // // // // // // // // //               <span
// // // // // // // // // // //                 onClick={() => setSelectedCategory(cat.category_id)} // Update selectedCategory on click
// // // // // // // // // // //               >
// // // // // // // // // // //                 {cat.category_name}
// // // // // // // // // // //               </span>
// // // // // // // // // // //               <button onClick={() => deleteCategory(cat.category_id)} style={styles.deleteBtn}>🗑</button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management</h1>

// // // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="text"
// // // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // // //             value={categoryInput}
// // // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // // //           <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />
// // // // // // // // // // //         </form>

// // // // // // // // // // //         <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="text"
// // // // // // // // // // //             placeholder="Item Name"
// // // // // // // // // // //             value={itemInput.name}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="number"
// // // // // // // // // // //             placeholder="Price"
// // // // // // // // // // //             value={itemInput.price}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           />
// // // // // // // // // // //           <select
// // // // // // // // // // //             value={itemInput.category_id}
// // // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // // //             style={styles.input}
// // // // // // // // // // //           >
// // // // // // // // // // //             <option value="">Select Category</option>
// // // // // // // // // // //             {categories.map((cat) => (
// // // // // // // // // // //               <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // // //                 {cat.category_name}
// // // // // // // // // // //               </option>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </select>
// // // // // // // // // // //           <button type="submit" style={styles.button}>Add Menu Item</button>
// // // // // // // // // // //         </form>

// // // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // // //   {filteredMenuItems.length > 0 ? (
// // // // // // // // // // //     filteredMenuItems.map((item, index) => (
// // // // // // // // // // //       <div key={index} style={styles.menuCard}>
// // // // // // // // // // //         <h3>{item.name}</h3> {/* Ensure this is the correct data */}
// // // // // // // // // // //         <p>Price: ₹{item.price}</p>
// // // // // // // // // // //         <p>Category: {item.category_name}</p>
// // // // // // // // // // //         <button onClick={() => deleteItem(index)} style={styles.deleteBtn}>Delete</button>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     ))
// // // // // // // // // // //   ) : (
// // // // // // // // // // //     <p>No menu items found.</p>  // Message if no items exist
// // // // // // // // // // //   )}
// // // // // // // // // // // </div>

// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default MenuPage;


// // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // const MenuPage = () => {
// // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // //   const [editingIndex, setEditingIndex] = useState(null);
// // // // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
// // // // // // // // // //   const [showEditPopup, setShowEditPopup] = useState(false); // State to control popup visibility

// // // // // // // // // //   // Fetch categories
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Fetch menu items
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Add category
// // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // //     if (!newCategory) {
// // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // //         category_name: newCategory
// // // // // // // // // //       });
// // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // //       setCategoryInput('');
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };


// // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // // // //     // Check if all fields are filled
// // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // //     try {
// // // // // // // // // //       if (editingIndex !== null) {
// // // // // // // // // //         // Update existing item (Edit Mode)
// // // // // // // // // //         const itemToUpdate = menuItems[editingIndex];
// // // // // // // // // //         const updatedItem = {
// // // // // // // // // //           ...itemToUpdate,
// // // // // // // // // //           name,
// // // // // // // // // //           price,
// // // // // // // // // //           category_id,
// // // // // // // // // //           category_name: selectedCategory?.category_name || 'Unknown',
// // // // // // // // // //         };

// // // // // // // // // //         // Send update request to backend
// // // // // // // // // //         await axios.put(`http://localhost:5000/api/menu_items/update/${itemToUpdate.item_id}`, updatedItem);

// // // // // // // // // //         // Update the local state
// // // // // // // // // //         const updatedItems = [...menuItems];
// // // // // // // // // //         updatedItems[editingIndex] = updatedItem;
// // // // // // // // // //         setMenuItems(updatedItems);

// // // // // // // // // //         // Reset form and close popup
// // // // // // // // // //         setEditingIndex(null);
// // // // // // // // // //         setShowEditPopup(false);
// // // // // // // // // //       } else {
// // // // // // // // // //         // Add new item (New Item Mode)
// // // // // // // // // //         const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // //           name,
// // // // // // // // // //           price,
// // // // // // // // // //           category_id
// // // // // // // // // //         });

// // // // // // // // // //         const newItem = {
// // // // // // // // // //           ...itemInput,
// // // // // // // // // //           category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // //         };
// // // // // // // // // //         setMenuItems([...menuItems, newItem]);
// // // // // // // // // //       }

// // // // // // // // // //       // Reset the input fields after the operation
// // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });

// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error adding/updating menu item:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // // // //       setMenuItems(updated);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Delete failed:', err);
// // // // // // // // // //       alert('Could not delete item.');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleEdit = (index) => {
// // // // // // // // // //     const item = menuItems[index];
// // // // // // // // // //     setItemInput({
// // // // // // // // // //       name: item.name || item.item_name,
// // // // // // // // // //       price: item.price,
// // // // // // // // // //       category_id: item.category_id?.toString() || ''
// // // // // // // // // //     });
// // // // // // // // // //     setEditingIndex(index);
// // // // // // // // // //     setShowEditPopup(true); // Show the popup for editing
// // // // // // // // // //   };

// // // // // // // // // //   const closeEditPopup = () => {
// // // // // // // // // //     setShowEditPopup(false);
// // // // // // // // // //     setItemInput({ name: '', price: '', category_id: '' }); // Clear the form
// // // // // // // // // //     setEditingIndex(null);
// // // // // // // // // //   };

// // // // // // // // // //   const styles = {
// // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // //     categoryItem: {
// // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // //       alignItems: 'center',
// // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // //     },
// // // // // // // // // //     main: {
// // // // // // // // // //       flex: 1,
// // // // // // // // // //       padding: '20px',
// // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // //       alignItems: 'flex-start',
// // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // //     },
// // // // // // // // // //     heading: { textAlign: 'center', color: 'maroon' },
// // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // //     input: {
// // // // // // // // // //       padding: '8px',
// // // // // // // // // //       fontSize: '16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // //       width: '350px'
// // // // // // // // // //     },
// // // // // // // // // //     button: {
// // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // //       fontSize: '16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // //       width: '200px'
// // // // // // // // // //     },
// // // // // // // // // //     deleteBtn: {
// // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // //       fontSize: '14px',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // //     },
// // // // // // // // // //     menuGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
// // // // // // // // // //     menuCard: {
// // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // //       padding: '15px',
// // // // // // // // // //       width: '200px',
// // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // // // // // // // // //     },
// // // // // // // // // //     modal: {
// // // // // // // // // //       position: 'fixed',
// // // // // // // // // //       top: '0',
// // // // // // // // // //       left: '0',
// // // // // // // // // //       right: '0',
// // // // // // // // // //       bottom: '0',
// // // // // // // // // //       backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       justifyContent: 'center',
// // // // // // // // // //       alignItems: 'center',
// // // // // // // // // //     },
// // // // // // // // // //     modalContent: {
// // // // // // // // // //       backgroundColor: '#fff',
// // // // // // // // // //       padding: '20px',
// // // // // // // // // //       borderRadius: '8px',
// // // // // // // // // //       width: '400px',
// // // // // // // // // //       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // // // // // // // //     },
// // // // // // // // // //     closeButton: {
// // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // //       width: '100%',
// // // // // // // // // //       marginTop: '10px',
// // // // // // // // // //     },
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // //             <div
// // // // // // // // // //               key={cat.category_id}
// // // // // // // // // //               style={{
// // // // // // // // // //                 ...styles.categoryItem,
// // // // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // // // //               }}
// // // // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // // // //             >
// // // // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={(e) => {
// // // // // // // // // //                   e.stopPropagation();
// // // // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // // // //                 }}
// // // // // // // // // //                 style={styles.deleteBtn}
// // // // // // // // // //               >
// // // // // // // // // //                 🗑
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // // // //           >
// // // // // // // // // //             Show All
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management</h1>

// // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // //           <input
// // // // // // // // // //             type="text"
// // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // //             value={categoryInput}
// // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // //         </form>

// // // // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // // // //         <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // //           <input
// // // // // // // // // //             type="text"
// // // // // // // // // //             placeholder="Item Name"
// // // // // // // // // //             value={itemInput.name}
// // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <input
// // // // // // // // // //             type="number"
// // // // // // // // // //             placeholder="Price"
// // // // // // // // // //             value={itemInput.price}
// // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <select
// // // // // // // // // //             value={itemInput.category_id}
// // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           >
// // // // // // // // // //             <option value="">Select Category</option>
// // // // // // // // // //             {categories.map((cat) => (
// // // // // // // // // //               <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // //                 {cat.category_name}
// // // // // // // // // //               </option>
// // // // // // // // // //             ))}
// // // // // // // // // //           </select>
// // // // // // // // // //           <button
// // // // // // // // // //             type="submit"
// // // // // // // // // //             style={{ ...styles.button, marginBottom: '20px' }}
// // // // // // // // // //           >
// // // // // // // // // //             {editingIndex !== null ? 'Update Menu Item' : 'Add Menu Item'}
// // // // // // // // // //           </button>
// // // // // // // // // //         </form>

// // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // //           {menuItems
// // // // // // // // // //             .filter(item =>
// // // // // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // // // //             )
// // // // // // // // // //             .map((item, index) => (
// // // // // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // // // // //                 <p>Category: {item.category_name}</p>
// // // // // // // // // //                 <div style={{ display: 'flex', gap: '8px' }}>
// // // // // // // // // //                   <button onClick={() => handleEdit(index)} style={{ ...styles.deleteBtn, backgroundColor: '#ffc107' }}>
// // // // // // // // // //                     Edit
// // // // // // // // // //                   </button>
// // // // // // // // // //                   <button onClick={() => deleteItem(index)} style={styles.deleteBtn}>
// // // // // // // // // //                     Delete
// // // // // // // // // //                   </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>
// // // // // // // // // //             ))}
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* Modal for Edit Item */}
// // // // // // // // // //         {showEditPopup && (
// // // // // // // // // //   <div style={styles.modal}>
// // // // // // // // // //     <div style={styles.modalContent}>
// // // // // // // // // //       <h2>Edit Menu Item</h2>
// // // // // // // // // //       <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // //         <input
// // // // // // // // // //           type="text"
// // // // // // // // // //           placeholder="Item Name"
// // // // // // // // // //           value={itemInput.name}
// // // // // // // // // //           onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // //           style={styles.input}
// // // // // // // // // //         />
// // // // // // // // // //         <input
// // // // // // // // // //           type="number"
// // // // // // // // // //           placeholder="Price"
// // // // // // // // // //           value={itemInput.price}
// // // // // // // // // //           onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // //           style={styles.input}
// // // // // // // // // //         />
// // // // // // // // // //         <select
// // // // // // // // // //           value={itemInput.category_id}
// // // // // // // // // //           onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // //           style={styles.input}
// // // // // // // // // //         >
// // // // // // // // // //           <option value="">Select Category</option>
// // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // //             <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // //               {cat.category_name}
// // // // // // // // // //             </option>
// // // // // // // // // //           ))}
// // // // // // // // // //         </select>
// // // // // // // // // //         <button
// // // // // // // // // //           type="submit"
// // // // // // // // // //           style={{ ...styles.button, marginBottom: '20px' }}
// // // // // // // // // //         >
// // // // // // // // // //           Update Menu Item
// // // // // // // // // //         </button>
// // // // // // // // // //       </form>
// // // // // // // // // //       <button onClick={closeEditPopup} style={styles.closeButton}>Close</button>
// // // // // // // // // //     </div>
// // // // // // // // // //   </div>
// // // // // // // // // // )}


// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MenuPage;


// // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // const MenuPage = () => {
// // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);


// // // // // // // // // //   // Fetch categories
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Fetch menu items
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Add category
// // // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // // //     if (!newCategory) {
// // // // // // // // // //       alert('Category name is required!');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // // //         category_name: newCategory
// // // // // // // // // //       });
// // // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // // //       setCategoryInput('');
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const addItem = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // // //         name,
// // // // // // // // // //         price,
// // // // // // // // // //         category_id
// // // // // // // // // //       });

// // // // // // // // // //       const newItem = {
// // // // // // // // // //         ...itemInput,
// // // // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // // //       };
// // // // // // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // // // //       setMenuItems(updated);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Delete failed:', err);
// // // // // // // // // //       alert('Could not delete item.');
// // // // // // // // // //     }
// // // // // // // // // //   };


// // // // // // // // // //   const styles = {
// // // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // // //     categoryItem: {
// // // // // // // // // //       padding: '6px 12px',
// // // // // // // // // //       borderRadius: '5px',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // // //       alignItems: 'center',
// // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // //     },
// // // // // // // // // //     main: {
// // // // // // // // // //       flex: 1,
// // // // // // // // // //       padding: '20px',
// // // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // // //       display: 'flex',
// // // // // // // // // //       flexDirection: 'column',
// // // // // // // // // //       alignItems: 'flex-start',
// // // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // // //     },
// // // // // // // // // //     heading: { textAlign: 'center', color: 'maroon' },
// // // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // // //     input: {
// // // // // // // // // //       padding: '8px',
// // // // // // // // // //       fontSize: '16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // //       width: '350px'
// // // // // // // // // //     },
// // // // // // // // // //     button: {
// // // // // // // // // //       padding: '8px 16px',
// // // // // // // // // //       fontSize: '16px',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       cursor: 'pointer',
// // // // // // // // // //       width: '200px'
// // // // // // // // // //     },
// // // // // // // // // //     deleteBtn: {
// // // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // // //       padding: '5px 10px',
// // // // // // // // // //       fontSize: '14px',
// // // // // // // // // //       color: 'white',
// // // // // // // // // //       border: 'none',
// // // // // // // // // //       borderRadius: '4px',
// // // // // // // // // //       cursor: 'pointer'
// // // // // // // // // //     },
// // // // // // // // // //     menuGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
// // // // // // // // // //     menuCard: {
// // // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // // //       padding: '15px',
// // // // // // // // // //       width: '200px',
// // // // // // // // // //       borderRadius: '10px',
// // // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={styles.container}>
// // // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // // //           {categories.map((cat) => (
// // // // // // // // // //             <div
// // // // // // // // // //               key={cat.category_id}
// // // // // // // // // //               style={{
// // // // // // // // // //                 ...styles.categoryItem,
// // // // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // // // //               }}
// // // // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // // // //             >
// // // // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={(e) => {
// // // // // // // // // //                   e.stopPropagation();
// // // // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // // // //                 }}
// // // // // // // // // //                 style={styles.deleteBtn}
// // // // // // // // // //               >
// // // // // // // // // //                 🗑
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // // // //           >
// // // // // // // // // //             Show All
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div style={styles.main}>
// // // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management</h1>

// // // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // // //           <input
// // // // // // // // // //             type="text"
// // // // // // // // // //             placeholder="Add Category"
// // // // // // // // // //             value={categoryInput}
// // // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // // //         </form>

// // // // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // // // //         <form onSubmit={addItem} style={styles.formColumn}>
// // // // // // // // // //           <input
// // // // // // // // // //             type="text"
// // // // // // // // // //             placeholder="Item Name"
// // // // // // // // // //             value={itemInput.name}
// // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <input
// // // // // // // // // //             type="number"
// // // // // // // // // //             placeholder="Price"
// // // // // // // // // //             value={itemInput.price}
// // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           />
// // // // // // // // // //           <select
// // // // // // // // // //             value={itemInput.category_id}
// // // // // // // // // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // // //             style={styles.input}
// // // // // // // // // //           >
// // // // // // // // // //             <option value="">Select Category</option>
// // // // // // // // // //             {categories.map((cat) => (
// // // // // // // // // //               <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // // //                 {cat.category_name}
// // // // // // // // // //               </option>
// // // // // // // // // //             ))}
// // // // // // // // // //           </select>
// // // // // // // // // //           <button
// // // // // // // // // //             type="submit"
// // // // // // // // // //             style={{ ...styles.button, marginBottom: '20px' }}
// // // // // // // // // //           >
// // // // // // // // // //             Add Menu Item
// // // // // // // // // //           </button>
// // // // // // // // // //         </form>

// // // // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // // // //           {menuItems
// // // // // // // // // //             .filter(item =>
// // // // // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // // // //             )
// // // // // // // // // //             .map((item, index) => (
// // // // // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // // // // //                 <p>Category: {item.category_name}</p>
// // // // // // // // // //                 <button onClick={() => deleteItem(item.item_id)} style={styles.deleteBtn}>
// // // // // // // // // //                   Delete
// // // // // // // // // //                 </button>
// // // // // // // // // //               </div>
// // // // // // // // // //             ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MenuPage;
// // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // import axios from 'axios';

// // // // // // // // // const MenuPage = () => {
// // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // // // // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // // // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // // // // // // //   // Fetch categories
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // // //   }, []);

// // // // // // // // //   // Fetch menu items
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // // //   }, []);

// // // // // // // // //   // Add category
// // // // // // // // //   const addCategory = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // // //     if (!newCategory) {
// // // // // // // // //       alert('Category name is required!');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // // //         category_name: newCategory
// // // // // // // // //       });
// // // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // // //       setCategoryInput('');
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Error adding category:', err);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // // //     try {
// // // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const addItem = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // // //         name,
// // // // // // // // //         price,
// // // // // // // // //         category_id
// // // // // // // // //       });

// // // // // // // // //       const newItem = {
// // // // // // // // //         ...itemInput,
// // // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // // //       };
// // // // // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // // //     try {
// // // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // // //       setMenuItems(updated);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Delete failed:', err);
// // // // // // // // //       alert('Could not delete item.');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleEditClick = (item) => {
// // // // // // // // //     setEditingItem(item);
// // // // // // // // //     setEditInput({
// // // // // // // // //       name: item.name || item.item_name,
// // // // // // // // //       price: item.price,
// // // // // // // // //       category_id: item.category_id
// // // // // // // // //     });
// // // // // // // // //     setShowEditPopup(true);
// // // // // // // // //   };

// // // // // // // // //   const updateItem = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (!editingItem) return;
  
// // // // // // // // //     const { name, price, category_id } = editInput;
  
// // // // // // // // //     // Fix: Check fields properly
// // // // // // // // //     if (
// // // // // // // // //       name.trim() === '' ||
// // // // // // // // //       price === '' ||
// // // // // // // // //       category_id === ''
// // // // // // // // //     ) {
// // // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // // //       return;
// // // // // // // // //     }
  
// // // // // // // // //     try {
// // // // // // // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // // // // // // //       // Update frontend
// // // // // // // // //       setMenuItems(menuItems.map(item =>
// // // // // // // // //         item.item_id === editingItem.item_id
// // // // // // // // //           ? { ...item, ...editInput }
// // // // // // // // //           : item
// // // // // // // // //       ));
  
// // // // // // // // //       setShowEditPopup(false);
// // // // // // // // //       setEditingItem(null);
// // // // // // // // //       alert('Item updated successfully!');
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Error updating item:', err);
// // // // // // // // //       alert('Could not update item.');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // New download functionality
// // // // // // // // //   const downloadMenuItems = () => {
// // // // // // // // //     const headers = ["Item Name", "Price", "Category"];
// // // // // // // // //     const rows = menuItems.map(item => [
// // // // // // // // //       item.name || item.item_name,
// // // // // // // // //       item.price,
// // // // // // // // //       item.category_name,
// // // // // // // // //     ]);

// // // // // // // // //     const csvContent = [
// // // // // // // // //       headers.join(","),
// // // // // // // // //       ...rows.map(row => row.join(","))
// // // // // // // // //     ].join("\n");

// // // // // // // // //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// // // // // // // // //     const link = document.createElement("a");
// // // // // // // // //     link.href = URL.createObjectURL(blob);
// // // // // // // // //     link.download = "menu_items.csv";
// // // // // // // // //     document.body.appendChild(link);
// // // // // // // // //     link.click();
// // // // // // // // //     document.body.removeChild(link);
// // // // // // // // //   };

// // // // // // // // //   const styles = {
// // // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // // //     categoryItem: {
// // // // // // // // //       padding: '6px 12px',
// // // // // // // // //       borderRadius: '5px',
// // // // // // // // //       display: 'flex',
// // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // //       alignItems: 'center',
// // // // // // // // //       cursor: 'pointer'
// // // // // // // // //     },
// // // // // // // // //     main: {
// // // // // // // // //       flex: 1,
// // // // // // // // //       padding: '20px',
// // // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // // //       display: 'flex',
// // // // // // // // //       flexDirection: 'column',
// // // // // // // // //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// // // // // // // // //       justifyContent: 'flex-start'
// // // // // // // // //     },
    
// // // // // // // // //     heading: { 
// // // // // // // // //       width: '100%',
// // // // // // // // //       textAlign: 'center',
// // // // // // // // //       color: 'red',
// // // // // // // // //       marginBottom: '20px'
// // // // // // // // //     },
    

// // // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // // //     input: {
// // // // // // // // //       padding: '8px',
// // // // // // // // //       fontSize: '16px',
// // // // // // // // //       borderRadius: '4px',
// // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // //       width: '500px'
// // // // // // // // //     },
// // // // // // // // //     button: {
// // // // // // // // //       padding: '8px 16px',
// // // // // // // // //       fontSize: '16px',
// // // // // // // // //       borderRadius: '4px',
// // // // // // // // //       border: 'none',
// // // // // // // // //       backgroundColor: '#007bff',
// // // // // // // // //       color: 'white',
// // // // // // // // //       cursor: 'pointer',
// // // // // // // // //       width: '200px',
// // // // // // // // //     },
// // // // // // // // //     deleteBtn: {
// // // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // // //       padding: '5px 10px',
// // // // // // // // //       fontSize: '14px',
// // // // // // // // //       color: 'white',
// // // // // // // // //       border: 'none',
// // // // // // // // //       borderRadius: '4px',
// // // // // // // // //       cursor: 'pointer'
// // // // // // // // //     },
// // // // // // // // //     menuGrid: { 
// // // // // // // // //       display: 'grid', 
// // // // // // // // //       gridTemplateColumns: 'repeat(5, 1fr)', 
// // // // // // // // //       gap: '20px',
// // // // // // // // //       justifyContent: 'center',
// // // // // // // // //       marginTop: '20px'
// // // // // // // // //     },
    
// // // // // // // // //     menuCard: {
// // // // // // // // //       border: '1px solid #ccc',
// // // // // // // // //       padding: '15px',
// // // // // // // // //       width: '220px',
// // // // // // // // //       height: '200px',  // Fixed height
// // // // // // // // //       borderRadius: '10px',
// // // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // // // // // //       display: 'flex',
// // // // // // // // //       flexDirection: 'column',
// // // // // // // // //       justifyContent: 'space-between',
// // // // // // // // //       marginTop:'15px'
     
// // // // // // // // //     },
// // // // // // // // //     itemInputRow: {
// // // // // // // // //       display: 'flex',
// // // // // // // // //       alignItems: 'center',
// // // // // // // // //       justifyContent: 'center',
// // // // // // // // //       gap: '10px',
// // // // // // // // //       flexWrap: 'wrap',
// // // // // // // // //       marginBottom: '10px',
// // // // // // // // //       width:'600px'
// // // // // // // // //     },
// // // // // // // // //     itemForm: {
// // // // // // // // //       display: 'flex',
// // // // // // // // //       flexDirection: 'column',
// // // // // // // // //       alignItems: 'center',
// // // // // // // // //       margin: '20px 0',
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={styles.container}>
// // // // // // // // //       <div style={styles.sidebar}>
// // // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // // //         <div style={styles.categoryList}>
// // // // // // // // //           {categories.map((cat) => (
// // // // // // // // //             <div
// // // // // // // // //               key={cat.category_id}
// // // // // // // // //               style={{
// // // // // // // // //                 ...styles.categoryItem,
// // // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // // //               }}
// // // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // // //             >
// // // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={(e) => {
// // // // // // // // //                   e.stopPropagation();
// // // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // // //                 }}
// // // // // // // // //                 style={styles.deleteBtn}
// // // // // // // // //               >
// // // // // // // // //                 🗑
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // // //           >
// // // // // // // // //             Show All
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       <div style={styles.main}>
// // // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // // //           <input
// // // // // // // // //             type="text"
// // // // // // // // //             placeholder="Add Category"
// // // // // // // // //             value={categoryInput}
// // // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // // //             style={styles.input}
// // // // // // // // //           />
// // // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // // //         </form>

// // // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // // // // // // //   <div style={styles.itemInputRow}>
// // // // // // // // //     <input
// // // // // // // // //       type="text"
// // // // // // // // //       placeholder="Item Name"
// // // // // // // // //       value={itemInput.name}
// // // // // // // // //       onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // // //       style={styles.input}
// // // // // // // // //     />
// // // // // // // // //     <input
// // // // // // // // //       type="number"
// // // // // // // // //       placeholder="Price"
// // // // // // // // //       value={itemInput.price}
// // // // // // // // //       onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // // //       style={styles.input}
// // // // // // // // //     />
// // // // // // // // //     <select
// // // // // // // // //       value={itemInput.category_id}
// // // // // // // // //       onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // // //       style={styles.input}
// // // // // // // // //     >
// // // // // // // // //       <option value="">Select Category</option>
// // // // // // // // //       {categories.map((cat) => (
// // // // // // // // //         <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // //           {cat.category_name}
// // // // // // // // //         </option>
// // // // // // // // //       ))}
// // // // // // // // //     </select>
// // // // // // // // //   </div>
  
// // // // // // // // //   <button type="submit" style={styles.button}>
// // // // // // // // //     Add Menu Item
// // // // // // // // //   </button>
// // // // // // // // // </form>


// // // // // // // // // <div style={styles.menuGrid}>
// // // // // // // // //   {menuItems
// // // // // // // // //     .filter(item =>
// // // // // // // // //       selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // // //     )
// // // // // // // // //     .map((item, index) => (
// // // // // // // // //       <div key={index} style={styles.menuCard}>
// // // // // // // // //         <h3>{item.name || item.item_name}</h3>
// // // // // // // // //         <p>Price: ₹{item.price}</p>
// // // // // // // // //         <p>Category: {item.category_name}</p>

// // // // // // // // //         <div style={{
// // // // // // // // //           display: 'flex',
// // // // // // // // //           justifyContent: 'center',  // center both buttons together
// // // // // // // // //           alignItems: 'center',
// // // // // // // // //           gap: '8px',                 // small gap between buttons
// // // // // // // // //           marginTop: '10px'
// // // // // // // // //         }}>
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => handleEditClick(item)}
// // // // // // // // //             style={{
// // // // // // // // //               ...styles.deleteBtn,
// // // // // // // // //               backgroundColor: '#ffc107',
// // // // // // // // //               padding: '6px 12px',
// // // // // // // // //               fontSize: '14px',
// // // // // // // // //               width: '80px'
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             Edit
// // // // // // // // //           </button>
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => deleteItem(item.item_id)}
// // // // // // // // //             style={{
// // // // // // // // //               ...styles.deleteBtn,
// // // // // // // // //               padding: '6px 12px',
// // // // // // // // //               fontSize: '14px',
// // // // // // // // //               width: '80px'
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             Delete
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     ))}
// // // // // // // // // </div>

// // // // // // // // // {/* Only One Download Button at the Bottom of the List */}
// // // // // // // // // <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// // // // // // // // //   <button
// // // // // // // // //     onClick={downloadMenuItems}
// // // // // // // // //     style={{
// // // // // // // // //       ...styles.deleteBtn,
// // // // // // // // //       backgroundColor: '#28a745', // Green color for the download button
// // // // // // // // //       padding: '10px 20px',
// // // // // // // // //       fontSize: '16px',
// // // // // // // // //       width: '200px'
// // // // // // // // //     }}
// // // // // // // // //   >
// // // // // // // // //     Download All Menu Items
// // // // // // // // //   </button>
// // // // // // // // // </div>


// // // // // // // // //         {/* Popup for editing */}
// // // // // // // // //         {showEditPopup && (
// // // // // // // // //           <div style={{
// // // // // // // // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // // // // // // // //             backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
// // // // // // // // //             alignItems: 'center', justifyContent: 'center'
// // // // // // // // //           }}>
// // // // // // // // //             <div style={{
// // // // // // // // //               background: 'white', padding: '30px', borderRadius: '10px',
// // // // // // // // //             width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
// // // // // // // // //               <h2>Edit Item</h2>
// // // // // // // // //               <form onSubmit={updateItem}>
// // // // // // // // //                 <input
// // // // // // // // //                   type="text"
// // // // // // // // //                   value={editInput.name}
// // // // // // // // //                   onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// // // // // // // // //                   placeholder="Item Name"
// // // // // // // // //                   style={styles.input}
// // // // // // // // //                 />
// // // // // // // // //                 <input
// // // // // // // // //                   type="number"
// // // // // // // // //                   value={editInput.price}
// // // // // // // // //                   onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
// // // // // // // // //                   placeholder="Price"
// // // // // // // // //                   style={styles.input}
// // // // // // // // //                 />
// // // // // // // // //                 <select
// // // // // // // // //                   value={editInput.category_id}
// // // // // // // // //                   onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
// // // // // // // // //                   style={styles.input}
// // // // // // // // //                 >
// // // // // // // // //                   <option value="">Select Category</option>
// // // // // // // // //                   {categories.map((cat) => (
// // // // // // // // //                     <option key={cat.category_id} value={cat.category_id}>
// // // // // // // // //                       {cat.category_name}
// // // // // // // // //                     </option>
// // // // // // // // //                   ))}
// // // // // // // // //                 </select>

// // // // // // // // //                 <div style={{
// // // // // // // // //                   display: 'flex', justifyContent: 'space-between', marginTop: '15px'
// // // // // // // // //                 }}>
// // // // // // // // //                   <button
// // // // // // // // //                     type="submit"
// // // // // // // // //                     style={{
// // // // // // // // //                       ...styles.button, backgroundColor: '#007bff', width: '150px'
// // // // // // // // //                     }}
// // // // // // // // //                   >
// // // // // // // // //                     Save Changes
// // // // // // // // //                   </button>
// // // // // // // // //                   <button
// // // // // // // // //                     type="button"
// // // // // // // // //                     onClick={() => setShowEditPopup(false)}
// // // // // // // // //                     style={{
// // // // // // // // //                       ...styles.button, backgroundColor: '#dc3545', width: '150px'
// // // // // // // // //                     }}
// // // // // // // // //                   >
// // // // // // // // //                     Cancel
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //               </form>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default MenuPage;


// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import axios from 'axios';

// // // // // // // // const MenuPage = () => {
// // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // // // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // // // // // //   // Fetch categories
// // // // // // // //   useEffect(() => {
// // // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // // //       .then((res) => setCategories(res.data))
// // // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // // //   }, []);

// // // // // // // //   // Fetch menu items
// // // // // // // //   useEffect(() => {
// // // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // // //   }, []);

// // // // // // // //   // Add category
// // // // // // // //   const addCategory = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     const newCategory = categoryInput.trim();
// // // // // // // //     if (!newCategory) {
// // // // // // // //       alert('Category name is required!');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // // //         category_name: newCategory
// // // // // // // //       });
// // // // // // // //       setCategories([...categories, res.data]);
// // // // // // // //       setCategoryInput('');
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error adding category:', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const deleteCategory = async (id) => {
// // // // // // // //     try {
// // // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error deleting category:', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const addItem = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // // //     try {
// // // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // // //         name,
// // // // // // // //         price,
// // // // // // // //         category_id
// // // // // // // //       });

// // // // // // // //       const newItem = {
// // // // // // // //         ...itemInput,
// // // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // // //       };
// // // // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error adding menu item:', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const deleteItem = async (itemId) => {
// // // // // // // //     try {
// // // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // // //       setMenuItems(updated);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Delete failed:', err);
// // // // // // // //       alert('Could not delete item.');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleEditClick = (item) => {
// // // // // // // //     setEditingItem(item);
// // // // // // // //     setEditInput({
// // // // // // // //       name: item.name || item.item_name,
// // // // // // // //       price: item.price,
// // // // // // // //       category_id: item.category_id
// // // // // // // //     });
// // // // // // // //     setShowEditPopup(true);
// // // // // // // //   };

// // // // // // // //   const updateItem = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!editingItem) return;
  
// // // // // // // //     const { name, price, category_id } = editInput;
  
// // // // // // // //     // Fix: Check fields properly
// // // // // // // //     if (
// // // // // // // //       name.trim() === '' ||
// // // // // // // //       price === '' ||
// // // // // // // //       category_id === ''
// // // // // // // //     ) {
// // // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // // //       return;
// // // // // // // //     }
  
// // // // // // // //     try {
// // // // // // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // // // // // //       // Update frontend
// // // // // // // //       setMenuItems(menuItems.map(item =>
// // // // // // // //         item.item_id === editingItem.item_id
// // // // // // // //           ? { ...item, ...editInput }
// // // // // // // //           : item
// // // // // // // //       ));
  
// // // // // // // //       setShowEditPopup(false);
// // // // // // // //       setEditingItem(null);
// // // // // // // //       alert('Item updated successfully!');
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error updating item:', err);
// // // // // // // //       alert('Could not update item.');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const styles = {
// // // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // // //     categoryItem: {
// // // // // // // //       padding: '6px 12px',
// // // // // // // //       borderRadius: '5px',
// // // // // // // //       display: 'flex',
// // // // // // // //       justifyContent: 'space-between',
// // // // // // // //       alignItems: 'center',
// // // // // // // //       cursor: 'pointer'
// // // // // // // //     },
// // // // // // // //     main: {
// // // // // // // //       flex: 1,
// // // // // // // //       padding: '20px',
// // // // // // // //       backgroundColor: '#fffefc',
// // // // // // // //       display: 'flex',
// // // // // // // //       flexDirection: 'column',
// // // // // // // //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// // // // // // // //       justifyContent: 'flex-start'
// // // // // // // //     },
// // // // // // // //     heading: { 
// // // // // // // //       width: '100%',
// // // // // // // //       textAlign: 'center',
// // // // // // // //       color: 'red',
// // // // // // // //       marginBottom: '20px'
// // // // // // // //     },
// // // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // // //     input: {
// // // // // // // //       padding: '8px',
// // // // // // // //       fontSize: '16px',
// // // // // // // //       borderRadius: '4px',
// // // // // // // //       border: '1px solid #ccc',
// // // // // // // //       width: '500px'
// // // // // // // //     },
// // // // // // // //     button: {
// // // // // // // //       padding: '8px 16px',
// // // // // // // //       fontSize: '16px',
// // // // // // // //       borderRadius: '4px',
// // // // // // // //       border: 'none',
// // // // // // // //       backgroundColor: '#007bff',
// // // // // // // //       color: 'white',
// // // // // // // //       cursor: 'pointer',
// // // // // // // //       width: '200px',
// // // // // // // //     },
// // // // // // // //     deleteBtn: {
// // // // // // // //       backgroundColor: '#dc3545',
// // // // // // // //       padding: '5px 10px',
// // // // // // // //       fontSize: '14px',
// // // // // // // //       color: 'white',
// // // // // // // //       border: 'none',
// // // // // // // //       borderRadius: '4px',
// // // // // // // //       cursor: 'pointer'
// // // // // // // //     },
// // // // // // // //     menuGrid: { 
// // // // // // // //       display: 'grid', 
// // // // // // // //       gridTemplateColumns: 'repeat(5, 1fr)', 
// // // // // // // //       gap: '20px',
// // // // // // // //       justifyContent: 'center',
// // // // // // // //       marginTop: '20px'
// // // // // // // //     },
// // // // // // // //     menuCard: {
// // // // // // // //       border: '1px solid #ccc',
// // // // // // // //       padding: '15px',
// // // // // // // //       width: '220px',
// // // // // // // //       height: '200px',  // Fixed height
// // // // // // // //       borderRadius: '10px',
// // // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // // // // //       display: 'flex',
// // // // // // // //       flexDirection: 'column',
// // // // // // // //       justifyContent: 'space-between',
// // // // // // // //       marginTop:'15px'
// // // // // // // //     },
// // // // // // // //     itemInputRow: {
// // // // // // // //       display: 'flex',
// // // // // // // //       alignItems: 'center',
// // // // // // // //       justifyContent: 'center',
// // // // // // // //       gap: '10px',
// // // // // // // //       flexWrap: 'wrap',
// // // // // // // //       marginBottom: '10px',
// // // // // // // //       width:'600px'
// // // // // // // //     },
// // // // // // // //     itemForm: {
// // // // // // // //       display: 'flex',
// // // // // // // //       flexDirection: 'column',
// // // // // // // //       alignItems: 'center',
// // // // // // // //       margin: '20px 0',
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={styles.container}>
// // // // // // // //       <div style={styles.sidebar}>
// // // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // // //         <div style={styles.categoryList}>
// // // // // // // //           {categories.map((cat) => (
// // // // // // // //             <div
// // // // // // // //               key={cat.category_id}
// // // // // // // //               style={{
// // // // // // // //                 ...styles.categoryItem,
// // // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // // //               }}
// // // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // // //             >
// // // // // // // //               <span>{cat.category_name}</span>
// // // // // // // //               <button
// // // // // // // //                 onClick={(e) => {
// // // // // // // //                   e.stopPropagation();
// // // // // // // //                   deleteCategory(cat.category_id);
// // // // // // // //                 }}
// // // // // // // //                 style={styles.deleteBtn}
// // // // // // // //               >
// // // // // // // //                 🗑
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //           <button
// // // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // // //           >
// // // // // // // //             Show All
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <div style={styles.main}>
// // // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // // //           <input
// // // // // // // //             type="text"
// // // // // // // //             placeholder="Add Category"
// // // // // // // //             value={categoryInput}
// // // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // // //             style={styles.input}
// // // // // // // //           />
// // // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // // //         </form>

// // // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // // // // // //           <div style={styles.itemInputRow}>
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Item Name"
// // // // // // // //               value={itemInput.name}
// // // // // // // //               onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // // //               style={styles.input}
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="number"
// // // // // // // //               placeholder="Price"
// // // // // // // //               value={itemInput.price}
// // // // // // // //               onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // // //               style={styles.input}
// // // // // // // //             />
// // // // // // // //             <select
// // // // // // // //               value={itemInput.category_id}
// // // // // // // //               onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // // //               style={styles.input}
// // // // // // // //             >
// // // // // // // //               <option value="">Select Category</option>
// // // // // // // //               {categories.map((cat) => (
// // // // // // // //                 <option key={cat.category_id} value={cat.category_id}>
// // // // // // // //                   {cat.category_name}
// // // // // // // //                 </option>
// // // // // // // //               ))}
// // // // // // // //             </select>
// // // // // // // //           </div>
  
// // // // // // // //           <button type="submit" style={styles.button}>
// // // // // // // //             Add Menu Item
// // // // // // // //           </button>
// // // // // // // //         </form>

// // // // // // // //         <div style={styles.menuGrid}>
// // // // // // // //           {menuItems
// // // // // // // //             .filter(item =>
// // // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // // //             )
// // // // // // // //             .map((item, index) => (
// // // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // // //                 <p>Category: {item.category_name}</p>

// // // // // // // //                 <div style={{
// // // // // // // //                   display: 'flex',
// // // // // // // //                   justifyContent: 'center',
// // // // // // // //                   alignItems: 'center',
// // // // // // // //                   gap: '8px',
// // // // // // // //                   marginTop: '10px'
// // // // // // // //                 }}>
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => handleEditClick(item)}
// // // // // // // //                     style={{
// // // // // // // //                       ...styles.deleteBtn,
// // // // // // // //                       backgroundColor: '#ffc107',
// // // // // // // //                       padding: '6px 12px',
// // // // // // // //                       fontSize: '14px',
// // // // // // // //                       width: '80px'
// // // // // // // //                     }}
// // // // // // // //                   >
// // // // // // // //                     Edit
// // // // // // // //                   </button>
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => deleteItem(item.item_id)}
// // // // // // // //                     style={{
// // // // // // // //                       ...styles.deleteBtn,
// // // // // // // //                       padding: '6px 12px',
// // // // // // // //                       fontSize: '14px',
// // // // // // // //                       width: '80px'
// // // // // // // //                     }}
// // // // // // // //                   >
// // // // // // // //                     Delete
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //         </div>

// // // // // // // //         {/* Popup for editing */}
// // // // // // // //         {showEditPopup && (
// // // // // // // //           <div style={{
// // // // // // // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // // // // // // //             backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
// // // // // // // //             alignItems: 'center', justifyContent: 'center'
// // // // // // // //           }}>
// // // // // // // //             <div style={{
// // // // // // // //               background: 'white', padding: '30px', borderRadius: '10px',
// // // // // // // //               width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
// // // // // // // //               <h2>Edit Item</h2>
// // // // // // // //               <form onSubmit={updateItem}>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   value={editInput.name}
// // // // // // // //                   onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// // // // // // // //                   placeholder="Item Name"
// // // // // // // //                   style={styles.input}
// // // // // // // //                 />
// // // // // // // //                 <input
// // // // // // // //                   type="number"
// // // // // // // //                   value={editInput.price}
// // // // // // // //                   onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
// // // // // // // //                   placeholder="Price"
// // // // // // // //                   style={styles.input}
// // // // // // // //                 />
// // // // // // // //                 <select
// // // // // // // //                   value={editInput.category_id}
// // // // // // // //                   onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
// // // // // // // //                   style={styles.input}
// // // // // // // //                 >
// // // // // // // //                   <option value="">Select Category</option>
// // // // // // // //                   {categories.map((cat) => (
// // // // // // // //                     <option key={cat.category_id} value={cat.category_id}>
// // // // // // // //                       {cat.category_name}
// // // // // // // //                     </option>
// // // // // // // //                   ))}
// // // // // // // //                 </select>
// // // // // // // //                 <button type="submit" style={styles.button}>Update</button>
// // // // // // // //                 <button type="button" onClick={() => setShowEditPopup(false)} style={{
// // // // // // // //                   ...styles.button, backgroundColor: '#dc3545', marginTop: '10px'
// // // // // // // //                 }}>
// // // // // // // //                   Cancel
// // // // // // // //                 </button>
// // // // // // // //               </form>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default MenuPage;

// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import axios from 'axios';

// // // // // // // const MenuPage = () => {
// // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // // // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // // // // //   // Fetch categories
// // // // // // //   useEffect(() => {
// // // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // // //       .then((res) => setCategories(res.data))
// // // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // // //   }, []);

// // // // // // //   // Fetch menu items
// // // // // // //   useEffect(() => {
// // // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // // //       .then((res) => setMenuItems(res.data))
// // // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // // //   }, []);

// // // // // // //   // Add category
// // // // // // //   const addCategory = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const newCategory = categoryInput.trim();
// // // // // // //     if (!newCategory) {
// // // // // // //       alert('Category name is required!');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // // //         category_name: newCategory
// // // // // // //       });
// // // // // // //       setCategories([...categories, res.data]);
// // // // // // //       setCategoryInput('');
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Error adding category:', err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const deleteCategory = async (id) => {
// // // // // // //     try {
// // // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Error deleting category:', err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const addItem = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const { name, price, category_id } = itemInput;

// // // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // // //     try {
// // // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // // //         name,
// // // // // // //         price,
// // // // // // //         category_id
// // // // // // //       });

// // // // // // //       const newItem = {
// // // // // // //         ...itemInput,
// // // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // // //       };
// // // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Error adding menu item:', err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const deleteItem = async (itemId) => {
// // // // // // //     try {
// // // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // // //       setMenuItems(updated);
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Delete failed:', err);
// // // // // // //       alert('Could not delete item.');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleEditClick = (item) => {
// // // // // // //     setEditingItem(item);
// // // // // // //     setEditInput({
// // // // // // //       name: item.name || item.item_name,
// // // // // // //       price: item.price,
// // // // // // //       category_id: item.category_id
// // // // // // //     });
// // // // // // //     setShowEditPopup(true);
// // // // // // //   };

// // // // // // //   const updateItem = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!editingItem) return;
  
// // // // // // //     const { name, price, category_id } = editInput;
  
// // // // // // //     // Fix: Check fields properly
// // // // // // //     if (
// // // // // // //       name.trim() === '' ||
// // // // // // //       price === '' ||
// // // // // // //       category_id === ''
// // // // // // //     ) {
// // // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // // //       return;
// // // // // // //     }
  
// // // // // // //     try {
// // // // // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // // // // //       // Update frontend
// // // // // // //       setMenuItems(menuItems.map(item =>
// // // // // // //         item.item_id === editingItem.item_id
// // // // // // //           ? { ...item, ...editInput }
// // // // // // //           : item
// // // // // // //       ));
  
// // // // // // //       setShowEditPopup(false);
// // // // // // //       setEditingItem(null);
// // // // // // //       alert('Item updated successfully!');
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Error updating item:', err);
// // // // // // //       alert('Could not update item.');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const styles = {
// // // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // // //     categoryItem: {
// // // // // // //       padding: '6px 12px',
// // // // // // //       borderRadius: '5px',
// // // // // // //       display: 'flex',
// // // // // // //       justifyContent: 'space-between',
// // // // // // //       alignItems: 'center',
// // // // // // //       cursor: 'pointer'
// // // // // // //     },
// // // // // // //     main: {
// // // // // // //       flex: 1,
// // // // // // //       padding: '20px',
// // // // // // //       backgroundColor: '#fffefc',
// // // // // // //       display: 'flex',
// // // // // // //       flexDirection: 'column',
// // // // // // //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// // // // // // //       justifyContent: 'flex-start'
// // // // // // //     },
// // // // // // //     heading: { 
// // // // // // //       width: '100%',
// // // // // // //       textAlign: 'center',
// // // // // // //       color: 'red',
// // // // // // //       marginBottom: '20px'
// // // // // // //     },
// // // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // // //     input: {
// // // // // // //       padding: '8px',
// // // // // // //       fontSize: '16px',
// // // // // // //       borderRadius: '4px',
// // // // // // //       border: '1px solid #ccc',
// // // // // // //       width: '500px'
// // // // // // //     },
// // // // // // //     button: {
// // // // // // //       padding: '8px 16px',
// // // // // // //       fontSize: '16px',
// // // // // // //       borderRadius: '4px',
// // // // // // //       border: 'none',
// // // // // // //       backgroundColor: '#007bff',
// // // // // // //       color: 'white',
// // // // // // //       cursor: 'pointer',
// // // // // // //       width: '200px',
// // // // // // //     },
// // // // // // //     deleteBtn: {
// // // // // // //       backgroundColor: '#dc3545',
// // // // // // //       padding: '5px 10px',
// // // // // // //       fontSize: '14px',
// // // // // // //       color: 'white',
// // // // // // //       border: 'none',
// // // // // // //       borderRadius: '4px',
// // // // // // //       cursor: 'pointer'
// // // // // // //     },
// // // // // // //     menuGrid: { 
// // // // // // //       display: 'grid', 
// // // // // // //       gridTemplateColumns: 'repeat(5, 1fr)', 
// // // // // // //       gap: '20px',
// // // // // // //       justifyContent: 'center',
// // // // // // //       marginTop: '20px'
// // // // // // //     },
// // // // // // //     menuCard: {
// // // // // // //       border: '1px solid #ccc',
// // // // // // //       padding: '15px',
// // // // // // //       width: '220px',
// // // // // // //       height: '200px',  // Fixed height
// // // // // // //       borderRadius: '10px',
// // // // // // //       backgroundColor: '#fdfdfd',
// // // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // // // //       display: 'flex',
// // // // // // //       flexDirection: 'column',
// // // // // // //       justifyContent: 'space-between',
// // // // // // //       marginTop:'15px'
// // // // // // //     },
// // // // // // //     itemInputRow: {
// // // // // // //       display: 'flex',
// // // // // // //       alignItems: 'center',
// // // // // // //       justifyContent: 'center',
// // // // // // //       gap: '10px',
// // // // // // //       flexWrap: 'wrap',
// // // // // // //       marginBottom: '10px',
// // // // // // //       width:'600px'
// // // // // // //     },
// // // // // // //     itemForm: {
// // // // // // //       display: 'flex',
// // // // // // //       flexDirection: 'column',
// // // // // // //       alignItems: 'center',
// // // // // // //       margin: '20px 0',
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={styles.container}>
// // // // // // //       <div style={styles.sidebar}>
// // // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // // //         <div style={styles.categoryList}>
// // // // // // //           {categories.map((cat) => (
// // // // // // //             <div
// // // // // // //               key={cat.category_id}
// // // // // // //               style={{
// // // // // // //                 ...styles.categoryItem,
// // // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // // //               }}
// // // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // // //             >
// // // // // // //               <span>{cat.category_name}</span>
// // // // // // //               <button
// // // // // // //                 onClick={(e) => {
// // // // // // //                   e.stopPropagation();
// // // // // // //                   deleteCategory(cat.category_id);
// // // // // // //                 }}
// // // // // // //                 style={styles.deleteBtn}
// // // // // // //               >
// // // // // // //                 🗑
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //           <button
// // // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // // //           >
// // // // // // //             Show All
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div style={styles.main}>
// // // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // // //           <input
// // // // // // //             type="text"
// // // // // // //             placeholder="Add Category"
// // // // // // //             value={categoryInput}
// // // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // // //             style={styles.input}
// // // // // // //           />
// // // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // // //         </form>

// // // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // // // // //           <div style={styles.itemInputRow}>
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               placeholder="Item Name"
// // // // // // //               value={itemInput.name}
// // // // // // //               onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // // //               style={styles.input}
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="number"
// // // // // // //               placeholder="Price"
// // // // // // //               value={itemInput.price}
// // // // // // //               onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // // //               style={styles.input}
// // // // // // //             />
// // // // // // //             <select
// // // // // // //               value={itemInput.category_id}
// // // // // // //               onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // // //               style={styles.input}
// // // // // // //             >
// // // // // // //               <option value="">Select Category</option>
// // // // // // //               {categories.map((cat) => (
// // // // // // //                 <option key={cat.category_id} value={cat.category_id}>
// // // // // // //                   {cat.category_name}
// // // // // // //                 </option>
// // // // // // //               ))}
// // // // // // //             </select>
// // // // // // //           </div>
  
// // // // // // //           <button type="submit" style={styles.button}>
// // // // // // //             Add Menu Item
// // // // // // //           </button>
// // // // // // //         </form>

// // // // // // //         <div style={styles.menuGrid}>
// // // // // // //           {menuItems
// // // // // // //             .filter(item =>
// // // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // // //             )
// // // // // // //             .map((item, index) => (
// // // // // // //               <div key={index} style={styles.menuCard}>
// // // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // // //                 <p>Category: {item.category_name}</p>

// // // // // // //                 <div style={{
// // // // // // //                   display: 'flex',
// // // // // // //                   justifyContent: 'center',
// // // // // // //                   alignItems: 'center',
// // // // // // //                   gap: '8px',
// // // // // // //                   marginTop: '10px'
// // // // // // //                 }}>
// // // // // // //                   <button
// // // // // // //                     onClick={() => handleEditClick(item)}
// // // // // // //                     style={{
// // // // // // //                       ...styles.deleteBtn,
// // // // // // //                       backgroundColor: '#ffc107',
// // // // // // //                       padding: '6px 12px',
// // // // // // //                       fontSize: '14px',
// // // // // // //                       width: '80px'
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     Edit
// // // // // // //                   </button>
// // // // // // //                   <button
// // // // // // //                     onClick={() => deleteItem(item.item_id)}
// // // // // // //                     style={{
// // // // // // //                       ...styles.deleteBtn,
// // // // // // //                       padding: '6px 12px',
// // // // // // //                       fontSize: '14px',
// // // // // // //                       width: '80px'
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     Delete
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //         </div>

// // // // // // //         {/* "View Menu Item" Button at the bottom */}
// // // // // // //         <div style={{ marginTop: '20px', width: '100%' }}>
// // // // // // //   <button
// // // // // // //     onClick={() => alert('View details of the menu items.')}
// // // // // // //     style={{
// // // // // // //       ...styles.button,
// // // // // // //       backgroundColor: '#28a745',
// // // // // // //       width: '200px',  // Adjust width to make it smaller
// // // // // // //       fontSize: '14px', // Decrease font size
// // // // // // //       padding: '8px 0',  // Decrease padding
// // // // // // //       margin: '0 auto',  // Center the button horizontally
// // // // // // //     }}
// // // // // // //   >
// // // // // // //     View Menu Items
// // // // // // //   </button>
// // // // // // // </div>

// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default MenuPage;

// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const MenuPage = () => {
// // // // // //   const [categories, setCategories] = useState([]);
// // // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // // // //   const [showAllMenu, setShowAllMenu] = useState(false); // State to toggle view
// // // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // // // //   // Fetch categories
// // // // // //   useEffect(() => {
// // // // // //     axios.get('http://localhost:5000/api/categories')
// // // // // //       .then((res) => setCategories(res.data))
// // // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // // //   }, []);

// // // // // //   // Fetch menu items
// // // // // //   useEffect(() => {
// // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // //       .then((res) => setMenuItems(res.data))
// // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // //   }, []);

// // // // // //   // Add category
// // // // // //   const addCategory = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const newCategory = categoryInput.trim();
// // // // // //     if (!newCategory) {
// // // // // //       alert('Category name is required!');
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // // //         category_name: newCategory
// // // // // //       });
// // // // // //       setCategories([...categories, res.data]);
// // // // // //       setCategoryInput('');
// // // // // //     } catch (err) {
// // // // // //       console.error('Error adding category:', err);
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteCategory = async (id) => {
// // // // // //     try {
// // // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // // //     } catch (err) {
// // // // // //       console.error('Error deleting category:', err);
// // // // // //     }
// // // // // //   };

// // // // // //   const addItem = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const { name, price, category_id } = itemInput;

// // // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // //       return;
// // // // // //     }

// // // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // // //     try {
// // // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // // //         name,
// // // // // //         price,
// // // // // //         category_id
// // // // // //       });

// // // // // //       const newItem = {
// // // // // //         ...itemInput,
// // // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // // //       };
// // // // // //       setMenuItems([...menuItems, newItem]);
// // // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // // //     } catch (err) {
// // // // // //       console.error('Error adding menu item:', err);
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteItem = async (itemId) => {
// // // // // //     try {
// // // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // // //       setMenuItems(updated);
// // // // // //     } catch (err) {
// // // // // //       console.error('Delete failed:', err);
// // // // // //       alert('Could not delete item.');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleEditClick = (item) => {
// // // // // //     setEditingItem(item);
// // // // // //     setEditInput({
// // // // // //       name: item.name || item.item_name,
// // // // // //       price: item.price,
// // // // // //       category_id: item.category_id
// // // // // //     });
// // // // // //     setShowEditPopup(true);
// // // // // //   };

// // // // // //   const updateItem = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!editingItem) return;
  
// // // // // //     const { name, price, category_id } = editInput;
  
// // // // // //     // Fix: Check fields properly
// // // // // //     if (
// // // // // //       name.trim() === '' ||
// // // // // //       price === '' ||
// // // // // //       category_id === ''
// // // // // //     ) {
// // // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // // //       return;
// // // // // //     }
  
// // // // // //     try {
// // // // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // // // //       // Update frontend
// // // // // //       setMenuItems(menuItems.map(item =>
// // // // // //         item.item_id === editingItem.item_id
// // // // // //           ? { ...item, ...editInput }
// // // // // //           : item
// // // // // //       ));
  
// // // // // //       setShowEditPopup(false);
// // // // // //       setEditingItem(null);
// // // // // //       alert('Item updated successfully!');
// // // // // //     } catch (err) {
// // // // // //       console.error('Error updating item:', err);
// // // // // //       alert('Could not update item.');
// // // // // //     }
// // // // // //   };

// // // // // //   const styles = {
// // // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // // //     categoryItem: {
// // // // // //       padding: '6px 12px',
// // // // // //       borderRadius: '5px',
// // // // // //       display: 'flex',
// // // // // //       justifyContent: 'space-between',
// // // // // //       alignItems: 'center',
// // // // // //       cursor: 'pointer'
// // // // // //     },
// // // // // //     main: {
// // // // // //       flex: 1,
// // // // // //       padding: '20px',
// // // // // //       backgroundColor: '#fffefc',
// // // // // //       display: 'flex',
// // // // // //       flexDirection: 'column',
// // // // // //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// // // // // //       justifyContent: 'flex-start'
// // // // // //     },
// // // // // //     heading: { 
// // // // // //       width: '100%',
// // // // // //       textAlign: 'center',
// // // // // //       color: 'red',
// // // // // //       marginBottom: '20px'
// // // // // //     },
// // // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // // //     input: {
// // // // // //       padding: '8px',
// // // // // //       fontSize: '16px',
// // // // // //       borderRadius: '4px',
// // // // // //       border: '1px solid #ccc',
// // // // // //       width: '500px'
// // // // // //     },
// // // // // //     button: {
// // // // // //       padding: '8px 16px',
// // // // // //       fontSize: '16px',
// // // // // //       borderRadius: '4px',
// // // // // //       border: 'none',
// // // // // //       backgroundColor: '#007bff',
// // // // // //       color: 'white',
// // // // // //       cursor: 'pointer',
// // // // // //       width: '200px',
// // // // // //     },
// // // // // //     deleteBtn: {
// // // // // //       backgroundColor: '#dc3545',
// // // // // //       padding: '5px 10px',
// // // // // //       fontSize: '14px',
// // // // // //       color: 'white',
// // // // // //       border: 'none',
// // // // // //       borderRadius: '4px',
// // // // // //       cursor: 'pointer'
// // // // // //     },
// // // // // //     menuGrid: { 
// // // // // //       display: 'grid', 
// // // // // //       gridTemplateColumns: 'repeat(5, 1fr)', 
// // // // // //       gap: '20px',
// // // // // //       justifyContent: 'center',
// // // // // //       marginTop: '20px'
// // // // // //     },
// // // // // //     menuCard: {
// // // // // //       border: '1px solid #ccc',
// // // // // //       padding: '15px',
// // // // // //       width: '220px',
// // // // // //       height: '200px',  // Fixed height
// // // // // //       borderRadius: '10px',
// // // // // //       backgroundColor: '#fdfdfd',
// // // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // // //       display: 'flex',
// // // // // //       flexDirection: 'column',
// // // // // //       justifyContent: 'space-between',
// // // // // //       marginTop:'15px'
// // // // // //     },
// // // // // //     itemInputRow: {
// // // // // //       display: 'flex',
// // // // // //       alignItems: 'center',
// // // // // //       justifyContent: 'center',
// // // // // //       gap: '10px',
// // // // // //       flexWrap: 'wrap',
// // // // // //       marginBottom: '10px',
// // // // // //       width:'600px'
// // // // // //     },
// // // // // //     itemForm: {
// // // // // //       display: 'flex',
// // // // // //       flexDirection: 'column',
// // // // // //       alignItems: 'center',
// // // // // //       margin: '20px 0',
// // // // // //     },
// // // // // //     viewButton: {
// // // // // //       padding: '8px 16px',
// // // // // //       fontSize: '14px',
// // // // // //       backgroundColor: '#28a745',
// // // // // //       color: 'white',
// // // // // //       cursor: 'pointer',
// // // // // //       marginTop: '20px',
// // // // // //       width: '200px',
// // // // // //       margin: '0 auto',
// // // // // //     },
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={styles.container}>
// // // // // //       <div style={styles.sidebar}>
// // // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // // //         <div style={styles.categoryList}>
// // // // // //           {categories.map((cat) => (
// // // // // //             <div
// // // // // //               key={cat.category_id}
// // // // // //               style={{
// // // // // //                 ...styles.categoryItem,
// // // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // // //               }}
// // // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // // //             >
// // // // // //               <span>{cat.category_name}</span>
// // // // // //               <button
// // // // // //                 onClick={(e) => {
// // // // // //                   e.stopPropagation();
// // // // // //                   deleteCategory(cat.category_id);
// // // // // //                 }}
// // // // // //                 style={styles.deleteBtn}
// // // // // //               >
// // // // // //                 🗑
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //           <button
// // // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // // //           >
// // // // // //             Show All
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div style={styles.main}>
// // // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             placeholder="Add Category"
// // // // // //             value={categoryInput}
// // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // //             style={styles.input}
// // // // // //           />
// // // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // // //         </form>

// // // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // // // //           <div style={styles.itemInputRow}>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Item Name"
// // // // // //               value={itemInput.name}
// // // // // //               onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // // //               style={styles.input}
// // // // // //             />
// // // // // //             <input
// // // // // //               type="number"
// // // // // //               placeholder="Price"
// // // // // //               value={itemInput.price}
// // // // // //               onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // // //               style={styles.input}
// // // // // //             />
// // // // // //             <select
// // // // // //               value={itemInput.category_id}
// // // // // //               onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // // //               style={styles.input}
// // // // // //             >
// // // // // //               <option value="">Select Category</option>
// // // // // //               {categories.map((cat) => (
// // // // // //                 <option key={cat.category_id} value={cat.category_id}>
// // // // // //                   {cat.category_name}
// // // // // //                 </option>
// // // // // //               ))}
// // // // // //             </select>
// // // // // //           </div>
  
// // // // // //           <button type="submit" style={styles.button}>
// // // // // //             Add Menu Item
// // // // // //           </button>
// // // // // //         </form>

// // // // // //         <div style={styles.menuGrid}>
// // // // // //           {menuItems
// // // // // //             .filter(item =>
// // // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // // //             )
// // // // // //             .map((item, index) => (
// // // // // //               <div key={index} style={styles.menuCard}>
// // // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // //                 <p>Category: {item.category_name}</p>

// // // // // //                 <div style={{
// // // // // //                   display: 'flex',
// // // // // //                   justifyContent: 'center',
// // // // // //                   alignItems: 'center',
// // // // // //                   gap: '8px',
// // // // // //                   marginTop: '10px'
// // // // // //                 }}>
// // // // // //                   <button
// // // // // //                     onClick={() => handleEditClick(item)}
// // // // // //                     style={{
// // // // // //                       ...styles.deleteBtn,
// // // // // //                       backgroundColor: '#ffc107',
// // // // // //                       padding: '6px 12px',
// // // // // //                       fontSize: '14px',
// // // // // //                       width: '80px'
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     Edit
// // // // // //                   </button>
// // // // // //                   <button
// // // // // //                     onClick={() => deleteItem(item.item_id)}
// // // // // //                     style={{
// // // // // //                       ...styles.deleteBtn,
// // // // // //                       padding: '6px 12px',
// // // // // //                       fontSize: '14px',
// // // // // //                       width: '80px'
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     Delete
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //         </div>

// // // // // //         {/* View Menu Items Button */}
// // // // // //         <div style={{ marginTop: '20px' }}>
// // // // // //           <button
// // // // // //             onClick={() => setShowAllMenu(!showAllMenu)}
// // // // // //             style={styles.viewButton}
// // // // // //           >
// // // // // //             View Menu Items
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {/* If View Menu is toggled, show the full menu in a single card */}
// // // // // //         {showAllMenu && (
// // // // // //           <div style={styles.menuCard}>
// // // // // //             <h3>All Menu Items</h3>
// // // // // //             {menuItems.map((item, index) => (
// // // // // //               <div key={index}>
// // // // // //                 <h4>{item.name || item.item_name}</h4>
// // // // // //                 <p>Price: ₹{item.price}</p>
// // // // // //                 <p>Category: {item.category_name}</p>
// // // // // //                 <hr />
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MenuPage;


// // // // // import React, { useEffect, useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const MenuPage = () => {
// // // // //   const [categories, setCategories] = useState([]);
// // // // //   const [menuItems, setMenuItems] = useState([]);
// // // // //   const [categoryInput, setCategoryInput] = useState('');
// // // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // // //   const [showAllMenu, setShowAllMenu] = useState(false); // State to toggle view
// // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // // //   // Fetch categories
// // // // //   useEffect(() => {
// // // // //     axios.get('http://localhost:5000/api/categories')
// // // // //       .then((res) => setCategories(res.data))
// // // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // // //   }, []);

// // // // //   // Fetch menu items
// // // // //   useEffect(() => {
// // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // //       .then((res) => setMenuItems(res.data))
// // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // //   }, []);

// // // // //   // Add category
// // // // //   const addCategory = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const newCategory = categoryInput.trim();
// // // // //     if (!newCategory) {
// // // // //       alert('Category name is required!');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // // //         category_name: newCategory
// // // // //       });
// // // // //       setCategories([...categories, res.data]);
// // // // //       setCategoryInput('');
// // // // //     } catch (err) {
// // // // //       console.error('Error adding category:', err);
// // // // //     }
// // // // //   };

// // // // //   const deleteCategory = async (id) => {
// // // // //     try {
// // // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // // //     } catch (err) {
// // // // //       console.error('Error deleting category:', err);
// // // // //     }
// // // // //   };

// // // // //   const addItem = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const { name, price, category_id } = itemInput;

// // // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // //       return;
// // // // //     }

// // // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // // //     try {
// // // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // // //         name,
// // // // //         price,
// // // // //         category_id
// // // // //       });

// // // // //       const newItem = {
// // // // //         ...itemInput,
// // // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // // //       };
// // // // //       setMenuItems([...menuItems, newItem]);
// // // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // // //     } catch (err) {
// // // // //       console.error('Error adding menu item:', err);
// // // // //     }
// // // // //   };

// // // // //   const deleteItem = async (itemId) => {
// // // // //     try {
// // // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // // //       setMenuItems(updated);
// // // // //     } catch (err) {
// // // // //       console.error('Delete failed:', err);
// // // // //       alert('Could not delete item.');
// // // // //     }
// // // // //   };

// // // // //   const handleEditClick = (item) => {
// // // // //     setEditingItem(item);
// // // // //     setEditInput({
// // // // //       name: item.name || item.item_name,
// // // // //       price: item.price,
// // // // //       category_id: item.category_id
// // // // //     });
// // // // //     setShowEditPopup(true);
// // // // //   };

// // // // //   const updateItem = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!editingItem) return;
  
// // // // //     const { name, price, category_id } = editInput;
  
// // // // //     // Fix: Check fields properly
// // // // //     if (
// // // // //       name.trim() === '' ||
// // // // //       price === '' ||
// // // // //       category_id === ''
// // // // //     ) {
// // // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // // //       return;
// // // // //     }
  
// // // // //     try {
// // // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // // //       // Update frontend
// // // // //       setMenuItems(menuItems.map(item =>
// // // // //         item.item_id === editingItem.item_id
// // // // //           ? { ...item, ...editInput }
// // // // //           : item
// // // // //       ));
  
// // // // //       setShowEditPopup(false);
// // // // //       setEditingItem(null);
// // // // //       alert('Item updated successfully!');
// // // // //     } catch (err) {
// // // // //       console.error('Error updating item:', err);
// // // // //       alert('Could not update item.');
// // // // //     }
// // // // //   };

// // // // //   const styles = {
// // // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // // //     categoryItem: {
// // // // //       padding: '6px 12px',
// // // // //       borderRadius: '5px',
// // // // //       display: 'flex',
// // // // //       justifyContent: 'space-between',
// // // // //       alignItems: 'center',
// // // // //       cursor: 'pointer'
// // // // //     },
// // // // //     main: {
// // // // //       flex: 1,
// // // // //       padding: '20px',
// // // // //       backgroundColor: '#fffefc',
// // // // //       display: 'flex',
// // // // //       flexDirection: 'column',
// // // // //       alignItems: 'center',
// // // // //       justifyContent: 'flex-start'
// // // // //     },
// // // // //     heading: { 
// // // // //       width: '100%',
// // // // //       textAlign: 'center',
// // // // //       color: 'red',
// // // // //       marginBottom: '20px'
// // // // //     },
// // // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // // //     input: {
// // // // //       padding: '8px',
// // // // //       fontSize: '16px',
// // // // //       borderRadius: '4px',
// // // // //       border: '1px solid #ccc',
// // // // //       width: '500px'
// // // // //     },
// // // // //     button: {
// // // // //       padding: '8px 16px',
// // // // //       fontSize: '16px',
// // // // //       borderRadius: '4px',
// // // // //       border: 'none',
// // // // //       backgroundColor: '#007bff',
// // // // //       color: 'white',
// // // // //       cursor: 'pointer',
// // // // //       width: '200px',
// // // // //     },
// // // // //     deleteBtn: {
// // // // //       backgroundColor: '#dc3545',
// // // // //       padding: '5px 10px',
// // // // //       fontSize: '14px',
// // // // //       color: 'white',
// // // // //       border: 'none',
// // // // //       borderRadius: '4px',
// // // // //       cursor: 'pointer'
// // // // //     },
// // // // //     menuGrid: {
// // // // //       display: 'grid',
// // // // //       gridTemplateColumns: 'repeat(5, 1fr)',  // 3 columns in a row
// // // // //       gap: '20px',
// // // // //       justifyContent: 'center',
// // // // //       marginTop: '20px',
// // // // //     },
    
// // // // //     menuCard: {
// // // // //       border: '1px solid #ccc',
// // // // //       padding: '15px',
// // // // //       borderRadius: '10px',
// // // // //       backgroundColor: '#fdfdfd',
// // // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // //       display: 'flex',
// // // // //       flexDirection: 'column',
// // // // //       justifyContent: 'space-between',
// // // // //       height: 'auto',  // Adjusted height to make the cards flexible
// // // // //       marginTop: '15px',
// // // // //     },
    
// // // // //     itemInputRow: {
// // // // //       display: 'flex',
// // // // //       alignItems: 'center',
// // // // //       justifyContent: 'center',
// // // // //       gap: '10px',
// // // // //       flexWrap: 'wrap',
// // // // //       marginBottom: '10px',
// // // // //       width:'600px'
// // // // //     },
// // // // //     itemForm: {
// // // // //       display: 'flex',
// // // // //       flexDirection: 'column',
// // // // //       alignItems: 'center',
// // // // //       margin: '20px 0',
// // // // //     },
// // // // //     viewButton: {
// // // // //       padding: '8px 16px',
// // // // //       fontSize: '14px',
// // // // //       backgroundColor: '#28a745',
// // // // //       color: 'white',
// // // // //       cursor: 'pointer',
// // // // //       marginTop: '20px',
// // // // //       width: '200px',
// // // // //       margin: '0 auto',
// // // // //     },
// // // // //   };

// // // // //   return (
// // // // //     <div style={styles.container}>
// // // // //       <div style={styles.sidebar}>
// // // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // // //         <div style={styles.categoryList}>
// // // // //           {categories.map((cat) => (
// // // // //             <div
// // // // //               key={cat.category_id}
// // // // //               style={{
// // // // //                 ...styles.categoryItem,
// // // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // // //               }}
// // // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // // //             >
// // // // //               <span>{cat.category_name}</span>
// // // // //               <button
// // // // //                 onClick={(e) => {
// // // // //                   e.stopPropagation();
// // // // //                   deleteCategory(cat.category_id);
// // // // //                 }}
// // // // //                 style={styles.deleteBtn}
// // // // //               >
// // // // //                 🗑
// // // // //               </button>
// // // // //             </div>
// // // // //           ))}
// // // // //           <button
// // // // //             onClick={() => setSelectedCategoryId(null)}
// // // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // // //           >
// // // // //             Show All
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div style={styles.main}>
// // // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // // //           <input
// // // // //             type="text"
// // // // //             placeholder="Add Category"
// // // // //             value={categoryInput}
// // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // //             style={styles.input}
// // // // //           />
// // // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // // //         </form>

// // // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // // //           <div style={styles.itemInputRow}>
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Item Name"
// // // // //               value={itemInput.name}
// // // // //               onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // // //               style={styles.input}
// // // // //             />
// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Price"
// // // // //               value={itemInput.price}
// // // // //               onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // // //               style={styles.input}
// // // // //             />
// // // // //             <select
// // // // //               value={itemInput.category_id}
// // // // //               onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // // //               style={styles.input}
// // // // //             >
// // // // //               <option value="">Select Category</option>
// // // // //               {categories.map((cat) => (
// // // // //                 <option key={cat.category_id} value={cat.category_id}>
// // // // //                   {cat.category_name}
// // // // //                 </option>
// // // // //               ))}
// // // // //             </select>
// // // // //           </div>
  
// // // // //           <button type="submit" style={styles.button}>
// // // // //             Add Menu Item
// // // // //           </button>
// // // // //         </form>

// // // // //         <div style={styles.menuGrid}>
// // // // //           {menuItems
// // // // //             .filter(item =>
// // // // //               selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // // // //             )
// // // // //             .map((item, index) => (
// // // // //               <div key={index} style={styles.menuCard}>
// // // // //                 <h3>{item.name || item.item_name}</h3>
// // // // //                 <p>Price: ₹{item.price}</p>
// // // // //                 <p>Category: {item.category_name}</p>

// // // // //                 <div style={{
// // // // //                   display: 'flex',
// // // // //                   justifyContent: 'center',
// // // // //                   alignItems: 'center',
// // // // //                   gap: '8px',
// // // // //                   marginTop: '10px'
// // // // //                 }}>
// // // // //                   <button
// // // // //                     onClick={() => handleEditClick(item)}
// // // // //                     style={{
// // // // //                       ...styles.deleteBtn,
// // // // //                       backgroundColor: '#ffc107',
// // // // //                       padding: '6px 12px',
// // // // //                       fontSize: '14px',
// // // // //                       width: '80px'
// // // // //                     }}
// // // // //                   >
// // // // //                     Edit
// // // // //                   </button>
// // // // //                   <button
// // // // //                     onClick={() => deleteItem(item.item_id)}
// // // // //                     style={{
// // // // //                       ...styles.deleteBtn,
// // // // //                       padding: '6px 12px',
// // // // //                       fontSize: '14px',
// // // // //                       width: '80px'
// // // // //                     }}
// // // // //                   >
// // // // //                     Delete
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //         </div>

// // // // //         {/* View Menu Items Button */}
// // // // //         <div style={{ marginTop: '20px' }}>
// // // // //           <button
// // // // //             onClick={() => setShowAllMenu(!showAllMenu)}
// // // // //             style={styles.viewButton}
// // // // //           >
// // // // //             View Menu Items
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* If View Menu is toggled, show the full menu in a single card */}
// // // // //         {showAllMenu && (
// // // // //   <div style={{ padding: '20px', width: '100%' }}>
// // // // //     <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>All Menu Items</h3>
// // // // //     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// // // // //       <thead>
// // // // //         <tr>
// // // // //           <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
// // // // //           <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item Name</th>
// // // // //           <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
          
// // // // //         </tr>
// // // // //       </thead>
// // // // //       <tbody>
// // // // //         {menuItems.map((item, index) => (
// // // // //           <tr key={index}>
// // // // //             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.category_name}</td>
// // // // //             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name|| item.item_name} </td>
// // // // //             <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{item.price}</td>
// // // // //           </tr>
// // // // //         ))}
// // // // //       </tbody>
// // // // //     </table>
// // // // //   </div>
// // // // // )}


      
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MenuPage;

// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';
// // // // import jsPDF from 'jspdf';
// // // // import 'jspdf-autotable';

// // // // const MenuPage = () => {
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [menuItems, setMenuItems] = useState([]);
// // // //   const [categoryInput, setCategoryInput] = useState('');
// // // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // // //   const [showAllMenu, setShowAllMenu] = useState(false);
// // // //   const [editingItem, setEditingItem] = useState(null);
// // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // // //   // Fetch categories
// // // //   useEffect(() => {
// // // //     axios.get('http://localhost:5000/api/categories')
// // // //       .then((res) => setCategories(res.data))
// // // //       .catch((err) => console.error('Error fetching categories:', err));
// // // //   }, []);

// // // //   // Fetch menu items
// // // //   useEffect(() => {
// // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // //       .then((res) => setMenuItems(res.data))
// // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // //   }, []);

// // // //   // Add category
// // // //   const addCategory = async (e) => {
// // // //     e.preventDefault();
// // // //     const newCategory = categoryInput.trim();
// // // //     if (!newCategory) {
// // // //       alert('Category name is required!');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // // //         category_name: newCategory
// // // //       });
// // // //       setCategories([...categories, res.data]);
// // // //       setCategoryInput('');
// // // //     } catch (err) {
// // // //       console.error('Error adding category:', err);
// // // //     }
// // // //   };

// // // //   const deleteCategory = async (id) => {
// // // //     try {
// // // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // // //       setCategories(categories.filter(c => c.category_id !== id));
// // // //     } catch (err) {
// // // //       console.error('Error deleting category:', err);
// // // //     }
// // // //   };

// // // //   const addItem = async (e) => {
// // // //     e.preventDefault();
// // // //     const { name, price, category_id } = itemInput;

// // // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // //       return;
// // // //     }

// // // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // // //     try {
// // // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // // //         name,
// // // //         price,
// // // //         category_id
// // // //       });

// // // //       const newItem = {
// // // //         ...itemInput,
// // // //         category_name: selectedCategory?.category_name || 'Unknown'
// // // //       };
// // // //       setMenuItems([...menuItems, newItem]);
// // // //       setItemInput({ name: '', price: '', category_id: '' });
// // // //     } catch (err) {
// // // //       console.error('Error adding menu item:', err);
// // // //     }
// // // //   };

// // // //   const deleteItem = async (itemId) => {
// // // //     try {
// // // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // // //       setMenuItems(updated);
// // // //     } catch (err) {
// // // //       console.error('Delete failed:', err);
// // // //       alert('Could not delete item.');
// // // //     }
// // // //   };

// // // //   const handleEditClick = (item) => {
// // // //     setEditingItem(item);
// // // //     setEditInput({
// // // //       name: item.name || item.item_name,
// // // //       price: item.price,
// // // //       category_id: item.category_id
// // // //     });
// // // //     setShowEditPopup(true);
// // // //   };

// // // //   const updateItem = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!editingItem) return;
  
// // // //     const { name, price, category_id } = editInput;
  
// // // //     if (name.trim() === '' || price === '' || category_id === '') {
// // // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // // //       return;
// // // //     }
  
// // // //     try {
// // // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // // //       setMenuItems(menuItems.map(item =>
// // // //         item.item_id === editingItem.item_id
// // // //           ? { ...item, ...editInput }
// // // //           : item
// // // //       ));
  
// // // //       setShowEditPopup(false);
// // // //       setEditingItem(null);
// // // //       alert('Item updated successfully!');
// // // //     } catch (err) {
// // // //       console.error('Error updating item:', err);
// // // //       alert('Could not update item.');
// // // //     }
// // // //   };

// // // //   const downloadPDF = () => {
// // // //     const doc = new jsPDF();
  
// // // //     doc.setFontSize(18);
// // // //     doc.text('Menu Items', 14, 22);
  
// // // //     const tableColumn = ["Category", "Item Name", "Price"];
// // // //     const tableRows = [];
  
// // // //     menuItems.forEach(item => {
// // // //       const rowData = [
// // // //         item.category_name,
// // // //         item.name || item.item_name,
// // // //         `₹${item.price}`
// // // //       ];
// // // //       tableRows.push(rowData);
// // // //     });
  
// // // //     doc.autoTable({
// // // //       head: [tableColumn],
// // // //       body: tableRows,
// // // //       startY: 30,
// // // //     });
  
// // // //     doc.save('menu_items.pdf');
// // // //   };

// // // //   const styles = {
// // // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // // //     categoryItem: {
// // // //       padding: '6px 12px',
// // // //       borderRadius: '5px',
// // // //       display: 'flex',
// // // //       justifyContent: 'space-between',
// // // //       alignItems: 'center',
// // // //       cursor: 'pointer'
// // // //     },
// // // //     main: {
// // // //       flex: 1,
// // // //       padding: '20px',
// // // //       backgroundColor: '#fffefc',
// // // //       display: 'flex',
// // // //       flexDirection: 'column',
// // // //       alignItems: 'center',
// // // //       justifyContent: 'flex-start'
// // // //     },
// // // //     heading: { 
// // // //       width: '100%',
// // // //       textAlign: 'center',
// // // //       color: 'red',
// // // //       marginBottom: '20px'
// // // //     },
// // // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // // //     input: {
// // // //       padding: '8px',
// // // //       fontSize: '16px',
// // // //       borderRadius: '4px',
// // // //       border: '1px solid #ccc',
// // // //       width: '500px'
// // // //     },
// // // //     button: {
// // // //       padding: '8px 16px',
// // // //       fontSize: '16px',
// // // //       borderRadius: '4px',
// // // //       border: 'none',
// // // //       backgroundColor: '#007bff',
// // // //       color: 'white',
// // // //       cursor: 'pointer',
// // // //       width: '200px',
// // // //     },
// // // //     deleteBtn: {
// // // //       backgroundColor: '#dc3545',
// // // //       padding: '5px 10px',
// // // //       fontSize: '14px',
// // // //       color: 'white',
// // // //       border: 'none',
// // // //       borderRadius: '4px',
// // // //       cursor: 'pointer'
// // // //     },
// // // //     menuGrid: {
// // // //       display: 'grid',
// // // //       gridTemplateColumns: 'repeat(5, 1fr)',
// // // //       gap: '20px',
// // // //       justifyContent: 'center',
// // // //       marginTop: '20px',
// // // //     },
// // // //     menuCard: {
// // // //       border: '1px solid #ccc',
// // // //       padding: '15px',
// // // //       borderRadius: '10px',
// // // //       backgroundColor: '#fdfdfd',
// // // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // //       display: 'flex',
// // // //       flexDirection: 'column',
// // // //       justifyContent: 'space-between',
// // // //       height: 'auto',
// // // //       marginTop: '15px',
// // // //     },
// // // //     itemInputRow: {
// // // //       display: 'flex',
// // // //       alignItems: 'center',
// // // //       justifyContent: 'center',
// // // //       gap: '10px',
// // // //       flexWrap: 'wrap',
// // // //       marginBottom: '10px',
// // // //       width: '600px'
// // // //     },
// // // //     itemForm: {
// // // //       display: 'flex',
// // // //       flexDirection: 'column',
// // // //       alignItems: 'center',
// // // //       margin: '20px 0',
// // // //     },
// // // //     viewButton: {
// // // //       padding: '8px 16px',
// // // //       fontSize: '14px',
// // // //       backgroundColor: '#28a745',
// // // //       color: 'white',
// // // //       cursor: 'pointer',
// // // //       marginTop: '10px',
// // // //       width: '200px',
// // // //     },
// // // //   };

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <div style={styles.sidebar}>
// // // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // // //         <div style={styles.categoryList}>
// // // //           {categories.map((cat) => (
// // // //             <div
// // // //               key={cat.category_id}
// // // //               style={{
// // // //                 ...styles.categoryItem,
// // // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // // //               }}
// // // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // // //             >
// // // //               <span>{cat.category_name}</span>
// // // //               <button
// // // //                 onClick={(e) => {
// // // //                   e.stopPropagation();
// // // //                   deleteCategory(cat.category_id);
// // // //                 }}
// // // //                 style={styles.deleteBtn}
// // // //               >
// // // //                 🗑
// // // //               </button>
// // // //             </div>
// // // //           ))}
// // // //           <button
// // // //             onClick={() => setSelectedCategoryId(null)}
// // // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // // //           >
// // // //             Show All
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <div style={styles.main}>
// // // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // // //         {/* Add category form */}
// // // //         <form onSubmit={addCategory} style={styles.formRow}>
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Add Category"
// // // //             value={categoryInput}
// // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // //             style={styles.input}
// // // //           />
// // // //           <button type="submit" style={styles.button}>Add Category</button>
// // // //         </form>

// // // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // // //         {/* Add menu item form */}
// // // //         <form onSubmit={addItem} style={styles.itemForm}>
// // // //           <div style={styles.itemInputRow}>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Item Name"
// // // //               value={itemInput.name}
// // // //               onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // // //               style={styles.input}
// // // //             />
// // // //             <input
// // // //               type="number"
// // // //               placeholder="Price"
// // // //               value={itemInput.price}
// // // //               onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // // //               style={styles.input}
// // // //             />
// // // //             <select
// // // //               value={itemInput.category_id}
// // // //               onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // // //               style={styles.input}
// // // //             >
// // // //               <option value="">Select Category</option>
// // // //               {categories.map((cat) => (
// // // //                 <option key={cat.category_id} value={cat.category_id}>
// // // //                   {cat.category_name}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>

// // // //           <button type="submit" style={styles.button}>
// // // //             Add Menu Item
// // // //           </button>
// // // //         </form>

// // // //         {/* Menu Items */}
// // // //         <div style={styles.menuGrid}>
// // // //           {menuItems
// // // //             .filter(item => selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId)
// // // //             .map((item, index) => (
// // // //               <div key={index} style={styles.menuCard}>
// // // //                 <h3>{item.name || item.item_name}</h3>
// // // //                 <p>Price: ₹{item.price}</p>
// // // //                 <p>Category: {item.category_name}</p>

// // // //                 <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
// // // //                   <button
// // // //                     onClick={() => handleEditClick(item)}
// // // //                     style={{ ...styles.deleteBtn, backgroundColor: '#ffc107', width: '80px' }}
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => deleteItem(item.item_id)}
// // // //                     style={{ ...styles.deleteBtn, width: '80px' }}
// // // //                   >
// // // //                     Delete
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //         </div>

// // // //         {/* View and Download Buttons */}
// // // //         <div style={{ marginTop: '20px' }}>
// // // //           <button
// // // //             onClick={() => setShowAllMenu(!showAllMenu)}
// // // //             style={styles.viewButton}
// // // //           >
// // // //             View Menu Items
// // // //           </button>

// // // //           {showAllMenu && (
// // // //             <button
// // // //               onClick={downloadPDF}
// // // //               style={{ ...styles.viewButton, backgroundColor: '#dc3545' }}
// // // //             >
// // // //               Download PDF
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {/* Table View */}
// // // //         {showAllMenu && (
// // // //           <div style={{ padding: '20px', width: '100%' }}>
// // // //             <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>All Menu Items</h3>
// // // //             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
// // // //                   <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item Name</th>
// // // //                   <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {menuItems.map((item, index) => (
// // // //                   <tr key={index}>
// // // //                     <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.category_name}</td>
// // // //                     <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name || item.item_name}</td>
// // // //                     <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{item.price}</td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         )}

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MenuPage;

// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const MenuPage = () => {
// // //   const [categories, setCategories] = useState([]);
// // //   const [menuItems, setMenuItems] = useState([]);
// // //   const [categoryInput, setCategoryInput] = useState('');
// // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
// // //   const [showAllMenu, setShowAllMenu] = useState(false);
// // //   const [editingItem, setEditingItem] = useState(null);
// // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // //   // Fetch categories
// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/categories')
// // //       .then((res) => setCategories(res.data))
// // //       .catch((err) => console.error('Error fetching categories:', err));
// // //   }, []);

// // //   // Fetch menu items
// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // //       .then((res) => setMenuItems(res.data))
// // //       .catch((err) => console.error('Error fetching menu items:', err));
// // //   }, []);

// // //   const addCategory = async (e) => {
// // //     e.preventDefault();
// // //     const newCategory = categoryInput.trim();
// // //     if (!newCategory) {
// // //       alert('Category name is required!');
// // //       return;
// // //     }
// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // //         category_name: newCategory
// // //       });
// // //       setCategories([...categories, res.data]);
// // //       setCategoryInput('');
// // //     } catch (err) {
// // //       console.error('Error adding category:', err);
// // //     }
// // //   };

// // //   const deleteCategory = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // //       setCategories(categories.filter(c => c.category_id !== id));
// // //     } catch (err) {
// // //       console.error('Error deleting category:', err);
// // //     }
// // //   };

// // //   const addItem = async (e) => {
// // //     e.preventDefault();
// // //     const { name, price, category_id } = itemInput;
// // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // //       alert('All fields are mandatory!');
// // //       return;
// // //     }
// // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));
// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // //         name,
// // //         price,
// // //         category_id
// // //       });
// // //       const newItem = {
// // //         ...itemInput,
// // //         category_name: selectedCategory?.category_name || 'Unknown'
// // //       };
// // //       setMenuItems([...menuItems, newItem]);
// // //       setItemInput({ name: '', price: '', category_id: '' });
// // //     } catch (err) {
// // //       console.error('Error adding menu item:', err);
// // //     }
// // //   };

// // //   const deleteItem = async (itemId) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // //       setMenuItems(updated);
// // //     } catch (err) {
// // //       console.error('Delete failed:', err);
// // //       alert('Could not delete item.');
// // //     }
// // //   };

// // //   const handleEditClick = (item) => {
// // //     setEditingItem(item);
// // //     setEditInput({
// // //       name: item.name,  // Change from item_name to name
// // //       price: item.price,
// // //       category_id: item.category_id
// // //     });
// // //     setShowEditPopup(true);
// // //   };
  
  
// // //   const updateItem = async (e) => {
// // //     e.preventDefault();
// // //     if (!editingItem) return;
  
// // //     const { name, price, category_id } = editInput;  // Ensure these are correct keys
// // //     if (name.trim() === '' || price === '' || category_id === '') {
// // //       alert('All fields are mandatory!');
// // //       return;
// // //     }
  
// // //     try {
// // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, {
// // //         name,
// // //         price,
// // //         category_id
// // //       });
  
// // //       setMenuItems(menuItems.map(item =>
// // //         item.item_id === editingItem.item_id
// // //           ? { ...item, name, price, category_id } // Update the correct fields here
// // //           : item
// // //       ));
  
// // //       setShowEditPopup(false);
// // //       setEditingItem(null);
// // //       alert('Item updated successfully!');
// // //     } catch (err) {
// // //       console.error('Error updating item:', err);
// // //       alert('Could not update item.');
// // //     }
// // //   };
  

// // //   const styles = {
// // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // //     categoryItem: {
// // //       padding: '6px 12px',
// // //       borderRadius: '5px',
// // //       display: 'flex',
// // //       justifyContent: 'space-between',
// // //       alignItems: 'center',
// // //       cursor: 'pointer'
// // //     },
// // //     main: {
// // //       flex: 1,
// // //       padding: '20px',
// // //       backgroundColor: '#fffefc',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       alignItems: 'center',
// // //       justifyContent: 'flex-start'
// // //     },
// // //     heading: { width: '100%', textAlign: 'center', color: 'red', marginBottom: '20px' },
// // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // //     input: {
// // //       padding: '8px',
// // //       fontSize: '16px',
// // //       borderRadius: '4px',
// // //       border: '1px solid #ccc',
// // //       width: '500px'
// // //     },
// // //     button: {
// // //       padding: '8px 16px',
// // //       fontSize: '16px',
// // //       borderRadius: '4px',
// // //       border: 'none',
// // //       backgroundColor: '#007bff',
// // //       color: 'white',
// // //       cursor: 'pointer',
// // //       width: '200px',
// // //     },
// // //     deleteBtn: {
// // //       backgroundColor: '#dc3545',
// // //       padding: '5px 10px',
// // //       fontSize: '14px',
// // //       color: 'white',
// // //       border: 'none',
// // //       borderRadius: '4px',
// // //       cursor: 'pointer'
// // //     },
// // //     menuGrid: {
// // //       display: 'grid',
// // //       gridTemplateColumns: 'repeat(5, 1fr)',
// // //       gap: '20px',
// // //       justifyContent: 'center',
// // //       marginTop: '20px',
// // //     },
// // //     menuCard: {
// // //       border: '1px solid #ccc',
// // //       padding: '15px',
// // //       borderRadius: '10px',
// // //       backgroundColor: '#fdfdfd',
// // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       justifyContent: 'space-between',
// // //       height: 'auto',
// // //       marginTop: '15px',
// // //     },
// // //     viewButton: {
// // //       padding: '8px 16px',
// // //       fontSize: '14px',
// // //       backgroundColor: '#28a745',
// // //       color: 'white',
// // //       cursor: 'pointer',
// // //       marginTop: '10px',
// // //       width: '200px',
// // //     },
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.sidebar}>
// // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // //         <div style={styles.categoryList}>
// // //           {categories.map((cat) => (
// // //             <div
// // //               key={cat.category_id}
// // //               style={{
// // //                 ...styles.categoryItem,
// // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // //               }}
// // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // //             >
// // //               <span>{cat.category_name}</span>
// // //               <button
// // //                 onClick={(e) => {
// // //                   e.stopPropagation();
// // //                   deleteCategory(cat.category_id);
// // //                 }}
// // //                 style={styles.deleteBtn}
// // //               >
// // //                 🗑
// // //               </button>
// // //             </div>
// // //           ))}
// // //           <button
// // //             onClick={() => setSelectedCategoryId(null)}
// // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // //           >
// // //             Show All
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div style={styles.main}>
// // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️</h1>

// // //         {/* Add Category */}
// // //         <form onSubmit={addCategory} style={styles.formRow}>
// // //           <input
// // //             type="text"
// // //             placeholder="Add Category"
// // //             value={categoryInput}
// // //             onChange={(e) => setCategoryInput(e.target.value)}
// // //             style={styles.input}
// // //           />
// // //           <button type="submit" style={styles.button}>Add Category</button>
// // //         </form>

// // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // //         {/* Add Item */}
// // //         {/* Add Item */}
// // // <form onSubmit={addItem} style={{ 
// // //   display: 'flex', 
// // //   flexDirection: 'column', 
// // //   alignItems: 'center', 
// // //   gap: '15px', 
// // //   margin: '20px 0' 
// // // }}>
// // //   <input
// // //     type="text"
// // //     placeholder="Item Name"
// // //     value={itemInput.name}
// // //     onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // //     style={styles.input}
// // //   />
// // //   <input
// // //     type="number"
// // //     placeholder="Price"
// // //     value={itemInput.price}
// // //     onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // //     style={styles.input}
// // //   />
// // //   <select
// // //     value={itemInput.category_id}
// // //     onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // //     style={styles.input}
// // //   >
// // //     <option value="">Select Category</option>
// // //     {categories.map((cat) => (
// // //       <option key={cat.category_id} value={cat.category_id}>
// // //         {cat.category_name}
// // //       </option>
// // //     ))}
// // //   </select>
// // //   <button type="submit" style={styles.button}>
// // //     Add Menu Item
// // //   </button>
// // // </form>


// // //         {/* Menu Items */}
// // //         <div style={styles.menuGrid}>
// // //           {menuItems
// // //             .filter(item => selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId)
// // //             .map((item, index) => (
// // //               <div key={index} style={styles.menuCard}>
// // //                 <h3>{item.name || item.item_name}</h3>
// // //                 <p>Price: ₹{item.price}</p>
// // //                 <p>Category: {item.category_name}</p>
// // //                 <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
// // //                   <button
// // //                     onClick={() => handleEditClick(item)}
// // //                     style={{ ...styles.deleteBtn, backgroundColor: '#ffc107', width: '80px' }}
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                   <button
// // //                     onClick={() => deleteItem(item.item_id)}
// // //                     style={{ ...styles.deleteBtn, width: '80px' }}
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //         </div>

// // //         {/* View Button Only */}
// // //         <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
// // //           <button
// // //             onClick={() => setShowAllMenu(true)}
// // //             style={styles.viewButton}
// // //           >
// // //             View Menu Items
// // //           </button>
// // //         </div>

// // //         {/* Popup Modal */}
// // //         {showAllMenu && (
// // //   <div style={{
// // //     position: 'fixed',
// // //     top: 0, left: 0, right: 0, bottom: 0,
// // //     backgroundColor: 'rgba(0,0,0,0.5)',
// // //     display: 'flex',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     zIndex: 1000
// // //   }}>
// // //     <div style={{
// // //       backgroundColor: 'white',
// // //       padding: '30px',
// // //       borderRadius: '10px',
// // //       width: '80%',
// // //       maxHeight: '80%',
// // //       overflowY: 'auto',
// // //       position: 'relative'
// // //     }}>
// // //       {/* CANCEL Button */}
// // //       <button
// // //         onClick={() => setShowAllMenu(false)}
// // //         style={{
// // //           position: 'absolute',
// // //           top: '10px',
// // //           right: '10px',
// // //           padding: '5px 10px',
// // //           backgroundColor: 'red',
// // //           color: 'white',
// // //           border: 'none',
// // //           borderRadius: '5px',
// // //           cursor: 'pointer'
// // //         }}
// // //       >
// // //         ✖
// // //       </button>

// // //       {/* SHARE Button */}
// // //       <button
// // //         onClick={() => {
// // //           // Share functionality
// // //           const menuText = menuItems.map(item => `${item.name || item.item_name} - ₹${item.price}`).join('\n');
// // //           navigator.clipboard.writeText(menuText)
// // //             .then(() => alert('Menu copied to clipboard!'))
// // //             .catch(err => alert('Failed to copy menu.'));
// // //         }}
// // //         style={{
// // //           position: 'absolute',
// // //           top: '10px',
// // //           right: '60px',
// // //           padding: '5px 10px',
// // //           backgroundColor: '#007bff',
// // //           color: 'white',
// // //           border: 'none',
// // //           borderRadius: '5px',
// // //           cursor: 'pointer'
// // //         }}
// // //       >
// // //         Share
// // //       </button>

// // //       <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>All Menu Items</h3>

// // //       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// // //         <thead>
// // //           <tr>
// // //             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
// // //             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item Name</th>
// // //             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {menuItems.map((item, index) => (
// // //             <tr key={index}>
// // //               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.category_name}</td>
// // //               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name || item.item_name}</td>
// // //               <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{item.price}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   </div>
// // // )}

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MenuPage;

// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const MenuPage = () => {
// // //   const [categories, setCategories] = useState([]);
// // //   const [menuItems, setMenuItems] = useState([]);
// // //   const [categoryInput, setCategoryInput] = useState('');
// // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
// // //   const [showAllMenu, setShowAllMenu] = useState(false);
// // //   const [editingItem, setEditingItem] = useState(null);
// // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // //   // Fetch categories
// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/categories')
// // //       .then((res) => setCategories(res.data))
// // //       .catch((err) => console.error('Error fetching categories:', err));
// // //   }, []);

// // //   // Fetch menu items
// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // //       .then((res) => setMenuItems(res.data))
// // //       .catch((err) => console.error('Error fetching menu items:', err));
// // //   }, []);

// // //   const addCategory = async (e) => {
// // //     e.preventDefault();
// // //     const newCategory = categoryInput.trim();
// // //     if (!newCategory) {
// // //       alert('Category name is required!');
// // //       return;
// // //     }
// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // //         category_name: newCategory
// // //       });
// // //       setCategories([...categories, res.data]);
// // //       setCategoryInput('');
// // //     } catch (err) {
// // //       console.error('Error adding category:', err);
// // //     }
// // //   };

// // //   const deleteCategory = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // //       setCategories(categories.filter(c => c.category_id !== id));
// // //     } catch (err) {
// // //       console.error('Error deleting category:', err);
// // //     }
// // //   };

// // //   const addItem = async (e) => {
// // //     e.preventDefault();
// // //     const { name, price, category_id } = itemInput;
// // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // //       alert('All fields are mandatory!');
// // //       return;
// // //     }
// // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));
// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // //         name,
// // //         price,
// // //         category_id
// // //       });
// // //       const newItem = {
// // //         ...itemInput,
// // //         category_name: selectedCategory?.category_name || 'Unknown'
// // //       };
// // //       setMenuItems([...menuItems, newItem]);
// // //       setItemInput({ name: '', price: '', category_id: '' });
// // //     } catch (err) {
// // //       console.error('Error adding menu item:', err);
// // //     }
// // //   };

// // //   const deleteItem = async (itemId) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // //       setMenuItems(updated);
// // //     } catch (err) {
// // //       console.error('Delete failed:', err);
// // //       alert('Could not delete item.');
// // //     }
// // //   };

// // //   const handleEditClick = (item) => {
// // //     setEditInput({
// // //       name: item.name,
// // //       price: item.price,
// // //       category_id: item.category_id,
// // //     });
// // //     setShowEditPopup(true);
// // //   };
  

// // //   const updateItem = async (e) => {
// // //     e.preventDefault();
// // //     if (!editingItem) return;

// // //     const { name, price, category_id } = editInput;  // Ensure these are correct keys
// // //     if (name.trim() === '' || price === '' || category_id === '') {
// // //       alert('All fields are mandatory!');
// // //       return;
// // //     }

// // //     try {
// // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, {
// // //         name,
// // //         price,
// // //         category_id
// // //       });

// // //       setMenuItems(menuItems.map(item =>
// // //         item.item_id === editingItem.item_id
// // //           ? { ...item, name, price, category_id } // Update the correct fields here
// // //           : item
// // //       ));

// // //       setShowEditPopup(false);
// // //       setEditingItem(null);
// // //       alert('Item updated successfully!');
// // //     } catch (err) {
// // //       console.error('Error updating item:', err);
// // //       alert('Could not update item.');
// // //     }
// // //   };

// // //   const styles = {
// // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // //     categoryItem: {
// // //       padding: '6px 12px',
// // //       borderRadius: '5px',
// // //       display: 'flex',
// // //       justifyContent: 'space-between',
// // //       alignItems: 'center',
// // //       cursor: 'pointer'
// // //     },
// // //     main: {
// // //       flex: 1,
// // //       padding: '20px',
// // //       backgroundColor: '#fffefc',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       alignItems: 'center',
// // //       justifyContent: 'flex-start'
// // //     },
// // //     heading: { width: '100%', textAlign: 'center', color: 'red', marginBottom: '20px' },
// // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // //     input: {
// // //       padding: '8px',
// // //       fontSize: '16px',
// // //       borderRadius: '4px',
// // //       border: '1px solid #ccc',
// // //       width: '450px'
// // //     },
// // //     button: {
// // //       padding: '8px 16px',
// // //       fontSize: '16px',
// // //       borderRadius: '4px',
// // //       border: 'none',
// // //       backgroundColor: '#007bff',
// // //       color: 'white',
// // //       cursor: 'pointer',
// // //       width: '200px',
// // //     },
// // //     deleteBtn: {
// // //       backgroundColor: '#dc3545',
// // //       padding: '5px 10px',
// // //       fontSize: '14px',
// // //       color: 'white',
// // //       border: 'none',
// // //       borderRadius: '4px',
// // //       cursor: 'pointer'
// // //     },
// // //     menuGrid: {
// // //       display: 'grid',
// // //       gridTemplateColumns: 'repeat(5, 1fr)',
// // //       gap: '20px',
// // //       justifyContent: 'center',
// // //       marginTop: '20px',
// // //     },
// // //     menuCard: {
// // //       border: '1px solid #ccc',
// // //       padding: '15px',
// // //       borderRadius: '10px',
// // //       backgroundColor: '#fdfdfd',
// // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       justifyContent: 'space-between',
// // //       height: 'auto',
// // //       marginTop: '15px',
// // //     },
// // //     viewButton: {
// // //       padding: '8px 16px',
// // //       fontSize: '14px',
// // //       backgroundColor: '#28a745',
// // //       color: 'white',
// // //       cursor: 'pointer',
// // //       marginTop: '10px',
// // //       width: '200px',
// // //     },
// // //     modal: {
// // //       position: 'fixed',
// // //       top: 0,
// // //       left: 0,
// // //       width: '100vw',
// // //       height: '100vh',
// // //       backgroundColor: 'rgba(0,0,0,0.5)',
// // //       display: 'flex',
// // //       justifyContent: 'center',
// // //       alignItems: 'center',
// // //       zIndex: 1000,
// // //     },
// // //     modalContent: {
// // //       backgroundColor: '#fff',
// // //       padding: '30px',
// // //       borderRadius: '8px',
// // //       width: '500px', // ⬅️ Increase this from the default (e.g., 300px)
// // //       maxWidth: '90%',
// // //       boxShadow: '0 0 10px rgba(0,0,0,0.3)',
// // //       position: 'relative',
// // //     },
// // //     closeBtn: {
// // //       position: 'absolute',
// // //       top: '10px',
// // //       right: '10px',
// // //       padding: '5px 10px',
// // //       backgroundColor: 'red',
// // //       color: 'white',
// // //       border: 'none',
// // //       borderRadius: '5px',
// // //       cursor: 'pointer'
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.sidebar}>
// // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // //         <div style={styles.categoryList}>
// // //           {categories.map((cat) => (
// // //             <div
// // //               key={cat.category_id}
// // //               style={{
// // //                 ...styles.categoryItem,
// // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // //               }}
// // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // //             >
// // //               <span>{cat.category_name}</span>
// // //               <button
// // //                 onClick={(e) => {
// // //                   e.stopPropagation();
// // //                   deleteCategory(cat.category_id);
// // //                 }}
// // //                 style={styles.deleteBtn}
// // //               >
// // //                 🗑
// // //               </button>
// // //             </div>
// // //           ))}
// // //           <button
// // //             onClick={() => setSelectedCategoryId(null)}
// // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // //           >
// // //             Show All
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div style={styles.main}>
// // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️</h1>

// // //         {/* Add Category */}
// // //         <form onSubmit={addCategory} style={styles.formRow}>
// // //           <input
// // //             type="text"
// // //             placeholder="Add Category"
// // //             value={categoryInput}
// // //             onChange={(e) => setCategoryInput(e.target.value)}
// // //             style={styles.input}
// // //           />
// // //           <button type="submit" style={styles.button}>Add Category</button>
// // //         </form>

// // //         {/* Add Item */}
// // //         <form onSubmit={addItem} style={{
// // //           display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', margin: '20px 0'
// // //         }}>
// // //           <input
// // //   type="text"
// // //   value={editInput.name || ''} // fallback to empty string
// // //   onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// // //   style={styles.input}
// // // />

// // //           <input
// // //             type="number"
// // //             placeholder="Price"
// // //             value={itemInput.price}
// // //             onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // //             style={styles.input}
// // //           />
// // //           <select
// // //             value={itemInput.category_id}
// // //             onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // //             style={styles.input}
// // //           >
// // //             <option value="">Select Category</option>
// // //             {categories.map((cat) => (
// // //               <option key={cat.category_id} value={cat.category_id}>
// // //                 {cat.category_name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //           <button type="submit" style={styles.button}>Add Menu Item</button>
// // //         </form>

// // //         {/* Menu Items */}
// // //         <div style={styles.menuGrid}>
// // //           {menuItems
// // //             .filter(item => selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId)
// // //             .map((item, index) => (
// // //               <div key={index} style={styles.menuCard}>
// // //                 <h3>{item.name || item.item_name}</h3>
// // //                 <p>Price: ₹{item.price}</p>
// // //                 <p>Category: {item.category_name}</p>
// // //                 <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
// // //                   <button
// // //                     onClick={() => handleEditClick(item)}
// // //                     style={{ ...styles.deleteBtn, backgroundColor: '#ffc107', width: '80px' }}
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                   <button
// // //                     onClick={() => deleteItem(item.item_id)}
// // //                     style={{ ...styles.deleteBtn, width: '80px' }}
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //         </div>

// // //         {/* View Button */}
// // //         <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
// // //           <button
// // //             onClick={() => setShowAllMenu(true)}
// // //             style={styles.viewButton}
// // //           >
// // //             View Menu Items
// // //           </button>
// // //         </div>

// // //         {/* Edit Popup Modal */}
// // //         {showEditPopup && (
// // //           <div style={styles.modal}>
// // //             <div style={styles.modalContent}>
// // //               <button onClick={() => setShowEditPopup(false)} style={styles.closeBtn}>✖</button>

// // //               <h3>Edit Menu Item</h3>
// // //               <form onSubmit={updateItem}>
// // //                 <input
// // //                   type="text"
// // //                   value={editInput.name}
// // //                   onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// // //                   style={styles.input}
// // //                 />
// // //                 <input
// // //                   type="number"
// // //                   value={editInput.price}
// // //                   onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
// // //                   style={styles.input}
// // //                 />
// // //                 <select
// // //                   value={editInput.category_id}
// // //                   onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
// // //                   style={styles.input}
// // //                 >
// // //                   <option value="">Select Category</option>
// // //                   {categories.map((cat) => (
// // //                     <option key={cat.category_id} value={cat.category_id}>
// // //                       {cat.category_name}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 <button type="submit" style={styles.button}>Save Changes</button>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MenuPage;


// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const MenuPage = () => {
// // //   const [categories, setCategories] = useState([]);
// // //   const [menuItems, setMenuItems] = useState([]);
// // //   const [categoryInput, setCategoryInput] = useState('');
// // //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// // //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// // //   const [editingItem, setEditingItem] = useState(null);
// // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// // //   const [showEditPopup, setShowEditPopup] = useState(false);

// // //   // Fetch categories
// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/categories')
// // //       .then((res) => setCategories(res.data))
// // //       .catch((err) => console.error('Error fetching categories:', err));
// // //   }, []);

// // //   // Fetch menu items
// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // //       .then((res) => setMenuItems(res.data))
// // //       .catch((err) => console.error('Error fetching menu items:', err));
// // //   }, []);

// // //   // Add category
// // //   const addCategory = async (e) => {
// // //     e.preventDefault();
// // //     const newCategory = categoryInput.trim();
// // //     if (!newCategory) {
// // //       alert('Category name is required!');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// // //         category_name: newCategory
// // //       });
// // //       setCategories([...categories, res.data]);
// // //       setCategoryInput('');
// // //     } catch (err) {
// // //       console.error('Error adding category:', err);
// // //     }
// // //   };

// // //   const deleteCategory = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// // //       setCategories(categories.filter(c => c.category_id !== id));
// // //     } catch (err) {
// // //       console.error('Error deleting category:', err);
// // //     }
// // //   };

// // //   const addItem = async (e) => {
// // //     e.preventDefault();
// // //     const { name, price, category_id } = itemInput;

// // //     if (!name.trim() || !price.trim() || !category_id.trim()) {
// // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // //       return;
// // //     }

// // //     const selectedCategory = categories.find(c => c.category_id === parseInt(category_id));

// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// // //         name,
// // //         price,
// // //         category_id
// // //       });

// // //       const newItem = {
// // //         ...itemInput,
// // //         category_name: selectedCategory?.category_name || 'Unknown'
// // //       };
// // //       setMenuItems([...menuItems, newItem]);
// // //       setItemInput({ name: '', price: '', category_id: '' });
// // //     } catch (err) {
// // //       console.error('Error adding menu item:', err);
// // //     }
// // //   };

// // //   const deleteItem = async (itemId) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// // //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// // //       setMenuItems(updated);
// // //     } catch (err) {
// // //       console.error('Delete failed:', err);
// // //       alert('Could not delete item.');
// // //     }
// // //   };

// // //   const handleEditClick = (item) => {
// // //     setEditingItem(item);
// // //     setEditInput({
// // //       name: item.name || item.item_name,
// // //       price: item.price,
// // //       category_id: item.category_id
// // //     });
// // //     setShowEditPopup(true);
// // //   };

// // //   const updateItem = async (e) => {
// // //     e.preventDefault();
// // //     if (!editingItem) return;
  
// // //     const { name, price, category_id } = editInput;
  
// // //     // Fix: Check fields properly
// // //     if (
// // //       name.trim() === '' ||
// // //       price === '' ||
// // //       category_id === ''
// // //     ) {
// // //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// // //       return;
// // //     }
  
// // //     try {
// // //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// // //       // Update frontend
// // //       setMenuItems(menuItems.map(item =>
// // //         item.item_id === editingItem.item_id
// // //           ? { ...item, ...editInput }
// // //           : item
// // //       ));
  
// // //       setShowEditPopup(false);
// // //       setEditingItem(null);
// // //       alert('Item updated successfully!');
// // //     } catch (err) {
// // //       console.error('Error updating item:', err);
// // //       alert('Could not update item.');
// // //     }
// // //   };
  
  

// // //   const styles = {
// // //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// // //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' },
// // //     sidebarHeading: { marginBottom: '15px', color: 'maroon' },
// // //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// // //     categoryItem: {
// // //       padding: '6px 12px',
// // //       borderRadius: '5px',
// // //       display: 'flex',
// // //       justifyContent: 'space-between',
// // //       alignItems: 'center',
// // //       cursor: 'pointer'
// // //     },
// // //     main: {
// // //       flex: 1,
// // //       padding: '20px',
// // //       backgroundColor: '#fffefc',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// // //       justifyContent: 'flex-start'
// // //     },
    
// // //     heading: { 
// // //       width: '100%',
// // //       textAlign: 'center',
// // //       color: 'red',
// // //       marginBottom: '20px'
// // //     },
    

// // //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// // //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// // //     input: {
// // //       padding: '8px',
// // //       fontSize: '16px',
// // //       borderRadius: '4px',
// // //       border: '1px solid #ccc',
// // //       width: '500px'
// // //     },
// // //     button: {
// // //       padding: '8px 16px',
// // //       fontSize: '16px',
// // //       borderRadius: '4px',
// // //       border: 'none',
// // //       backgroundColor: '#007bff',
// // //       color: 'white',
// // //       cursor: 'pointer',
// // //       width: '200px',
// // //     },
// // //     deleteBtn: {
// // //       backgroundColor: '#dc3545',
// // //       padding: '5px 10px',
// // //       fontSize: '14px',
// // //       color: 'white',
// // //       border: 'none',
// // //       borderRadius: '4px',
// // //       cursor: 'pointer'
// // //     },
// // //     menuGrid: { 
// // //       display: 'grid', 
// // //       gridTemplateColumns: 'repeat(5, 1fr)', 
// // //       gap: '20px',
// // //       justifyContent: 'center',
// // //       marginTop: '20px'
// // //     },
    
// // //     menuCard: {
// // //       border: '1px solid #ccc',
// // //       padding: '15px',
// // //       width: '220px',
// // //       height: '200px',  // Fixed height
// // //       borderRadius: '10px',
// // //       backgroundColor: '#fdfdfd',
// // //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       justifyContent: 'space-between',
// // //       marginTop:'15px'
     
// // //     },
// // //     itemInputRow: {
// // //       display: 'flex',
// // //       alignItems: 'center',
// // //       justifyContent: 'center',
// // //       gap: '10px',
// // //       flexWrap: 'wrap',
// // //       marginBottom: '10px',
// // //       width:'600px'
// // //     },
// // //     itemForm: {
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       alignItems: 'center',
// // //       margin: '20px 0',
// // //     }
    

// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.sidebar}>
// // //         <h3 style={styles.sidebarHeading}>Categories</h3>
// // //         <div style={styles.categoryList}>
// // //           {categories.map((cat) => (
// // //             <div
// // //               key={cat.category_id}
// // //               style={{
// // //                 ...styles.categoryItem,
// // //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// // //               }}
// // //               onClick={() => setSelectedCategoryId(cat.category_id)}
// // //             >
// // //               <span>{cat.category_name}</span>
// // //               <button
// // //                 onClick={(e) => {
// // //                   e.stopPropagation();
// // //                   deleteCategory(cat.category_id);
// // //                 }}
// // //                 style={styles.deleteBtn}
// // //               >
// // //                 🗑
// // //               </button>
// // //             </div>
// // //           ))}
// // //           <button
// // //             onClick={() => setSelectedCategoryId(null)}
// // //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// // //           >
// // //             Show All
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div style={styles.main}>
// // //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// // //         <form onSubmit={addCategory} style={styles.formRow}>
// // //           <input
// // //             type="text"
// // //             placeholder="Add Category"
// // //             value={categoryInput}
// // //             onChange={(e) => setCategoryInput(e.target.value)}
// // //             style={styles.input}
// // //           />
// // //           <button type="submit" style={styles.button}>Add Category</button>
// // //         </form>

// // //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// // //         <form onSubmit={addItem} style={styles.itemForm}>
// // //   <div style={styles.itemInputRow}>
// // //     <input
// // //       type="text"
// // //       placeholder="Item Name"
// // //       value={itemInput.name}
// // //       onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// // //       style={styles.input}
// // //     />
// // //     <input
// // //       type="number"
// // //       placeholder="Price"
// // //       value={itemInput.price}
// // //       onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// // //       style={styles.input}
// // //     />
// // //     <select
// // //       value={itemInput.category_id}
// // //       onChange={(e) => setItemInput({ ...itemInput, category_id: e.target.value })}
// // //       style={styles.input}
// // //     >
// // //       <option value="">Select Category</option>
// // //       {categories.map((cat) => (
// // //         <option key={cat.category_id} value={cat.category_id}>
// // //           {cat.category_name}
// // //         </option>
// // //       ))}
// // //     </select>
// // //   </div>
  
// // //   <button type="submit" style={styles.button}>
// // //     Add Menu Item
// // //   </button>
// // // </form>


// // // <div style={{ width: '100%' }}>
// // //   <div style={styles.menuGrid}>
// // //     {menuItems
// // //       .filter(item =>
// // //         selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// // //       )
// // //       .map((item, index) => (
// // //         <div key={index} style={styles.menuCard}>
// // //           <h3>{item.name || item.item_name}</h3>
// // //           <p>Price: ₹{item.price}</p>
// // //           <p>Category: {item.category_name}</p>
// // //           <div style={{
// // //             display: 'flex',
// // //             justifyContent: 'center',
// // //             alignItems: 'center',
// // //             gap: '8px',
// // //             marginTop: '10px'
// // //           }}>
// // //             <button
// // //               onClick={() => handleEditClick(item)}
// // //               style={{
// // //                 ...styles.deleteBtn,
// // //                 backgroundColor: '#ffc107',
// // //                 padding: '6px 12px',
// // //                 fontSize: '14px',
// // //                 width: '80px'
// // //               }}
// // //             >
// // //               Edit
// // //             </button>
// // //             <button
// // //               onClick={() => deleteItem(item.item_id)}
// // //               style={{
// // //                 ...styles.deleteBtn,
// // //                 padding: '6px 12px',
// // //                 fontSize: '14px',
// // //                 width: '80px'
// // //               }}
// // //             >
// // //               Delete
// // //             </button>
// // //           </div>
// // //         </div>
// // //       ))}
// // //   </div>

// // //   {/* View Menu Button below all cards */}
// // //   {menuItems.length > 0 && (
// // //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
// // //       <button
// // //         onClick={() => console.log('View Menu clicked')}
// // //         style={{
// // //           ...styles.button,
// // //           width: '220px',
// // //           height: '50px',
// // //           fontSize: '16px',
// // //           borderRadius: '8px'
// // //         }}
// // //       >
// // //         View Menu
// // //       </button>
// // //     </div>
// // //   )}
// // // </div>


// // //         {/* Popup for editing */}
// // //         {showEditPopup && (
// // //           <div style={{
// // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // //             backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
// // //             alignItems: 'center', justifyContent: 'center'
// // //           }}>
// // //             <div style={{
// // //               background: 'white', padding: '30px', borderRadius: '10px',
// // //             width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'
// // //             }}>
// // //               <h2>Edit Menu Item</h2>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Item Name"
// // //                 value={editInput.name}
// // //                 onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// // //                 style={styles.input}
// // //               />
// // //               <input
// // //                 type="number"
// // //                 placeholder="Price"
// // //                 value={editInput.price}
// // //                 onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
// // //                 style={styles.input}
// // //               />
// // //               <select
// // //                 value={editInput.category_id}
// // //                 onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
// // //                 style={styles.input}
// // //               >
// // //                 <option value="">Select Category</option>
// // //                 {categories.map((cat) => (
// // //                   <option key={cat.category_id} value={cat.category_id}>
// // //                     {cat.category_name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <div style={{ display: 'flex', justifyContent: 'center' }}>
// // //                 <button onClick={updateItem} style={styles.button}>
// // //                   Update Item
// // //                 </button>
// // //               </div>

// // //               <div style={{ display: 'flex', justifyContent: 'center' }}>
// // //                 <button
// // //                   onClick={() => {
// // //                     setShowEditPopup(false);
// // //                     setEditingItem(null);
// // //                   }}
// // //                   style={{ ...styles.button, backgroundColor: 'red', }}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MenuPage;



// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';



// // const MenuPage = ({ onViewMenu }) => {
// //   const [categories, setCategories] = useState([]);
// //   const [menuItems, setMenuItems] = useState([]);
// //   const [categoryInput, setCategoryInput] = useState('');
// //   const [itemInput, setItemInput] = useState({ name: '', price: '', category_id: '' });
// //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

// //   const [editingItem, setEditingItem] = useState(null);
// //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' });
// //   const [showEditPopup, setShowEditPopup] = useState(false);
// //   const navigate = useNavigate();



// //   // Fetch categories
// //   useEffect(() => {
// //     axios.get('http://localhost:5000/api/categories')
// //       .then((res) => setCategories(res.data))
// //       .catch((err) => console.error('Error fetching categories:', err));
// //   }, []);

// //   // Fetch menu items
// //   useEffect(() => {
// //     axios.get('http://localhost:5000/api/menu_items/getall')
// //       .then((res) => setMenuItems(res.data))
// //       .catch((err) => console.error('Error fetching menu items:', err));
// //   }, []);

// //   // Add category
// //   const addCategory = async (e) => {
// //     e.preventDefault();
// //     const newCategory = categoryInput.trim();
// //     if (!newCategory) {
// //       alert('Category name is required!');
// //       return;
// //     }

// //     try {
// //       const res = await axios.post('http://localhost:5000/api/categories/add', {
// //         category_name: newCategory
// //       });
// //       setCategories([...categories, res.data]);
// //       setCategoryInput('');
// //     } catch (err) {
// //       console.error('Error adding category:', err);
// //     }
// //   };

// //   const deleteCategory = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
// //       setCategories(categories.filter(c => c.category_id !== id));
// //     } catch (err) {
// //       console.error('Error deleting category:', err);
// //     }
// //   };

// //   const addItem = async (e) => {
// //     e.preventDefault();
// //     const { name, price } = itemInput;
// //     const category_id = selectedCategoryId;
  
// //     if (!name.trim() || !price.trim() || !category_id) {
// //       alert('All fields are mandatory: Item Name, Price, and you must select a category from the sidebar!');
// //       return;
// //     }
  
// //     const selectedCategory = categories.find(c => c.category_id === category_id);
  
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
// //         name,
// //         price,
// //         category_id
// //       });
  
// //       const newItem = {
// //         ...itemInput,
// //         category_id,
// //         category_name: selectedCategory?.category_name || 'Unknown'
// //       };
// //       setMenuItems([...menuItems, newItem]);
// //       setItemInput({ name: '', price: '', category_id: '' });
// //     } catch (err) {
// //       console.error('Error adding menu item:', err);
// //     }
// //   };
  

// //   const deleteItem = async (itemId) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
// //       const updated = menuItems.filter((item) => item.item_id !== itemId);
// //       setMenuItems(updated);
// //     } catch (err) {
// //       console.error('Delete failed:', err);
// //       alert('Could not delete item.');
// //     }
// //   };

// //   const handleEditClick = (item) => {
// //     setEditingItem(item);
// //     setEditInput({
// //       name: item.name || item.item_name,
// //       price: item.price,
// //       category_id: item.category_id
// //     });
// //     setShowEditPopup(true);
// //   };

// //   const updateItem = async (e) => {
// //     e.preventDefault();
// //     if (!editingItem) return;
  
// //     const { name, price, category_id } = editInput;
  
// //     // Fix: Check fields properly
// //     if (
// //       name.trim() === '' ||
// //       price === '' ||
// //       category_id === ''
// //     ) {
// //       alert('All fields are mandatory: Item Name, Price, and Category must be filled!');
// //       return;
// //     }
  
// //     try {
// //       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
// //       // Update frontend
// //       setMenuItems(menuItems.map(item =>
// //         item.item_id === editingItem.item_id
// //           ? { ...item, ...editInput }
// //           : item
// //       ));
  
// //       setShowEditPopup(false);
// //       setEditingItem(null);
// //       alert('Item updated successfully!');
// //     } catch (err) {
// //       console.error('Error updating item:', err);
// //       alert('Could not update item.');
// //     }
// //   };
  
  

// //   const styles = {
// //     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
// //     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '2px solid #ddd', marginLeft:'2px' },
// //     sidebarHeading: { marginBottom: '15px', color: 'maroon', fontSize:'30px' },
// //     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
// //     categoryItem: {
// //       padding: '6px 12px',
// //       borderRadius: '5px',
// //       display: 'flex',
// //       justifyContent: 'space-between',
// //       alignItems: 'center',
// //       cursor: 'pointer'
// //     },
// //     main: {
// //       flex: 1,
// //       padding: '20px',
// //       backgroundColor: '#fffefc',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',  // <-- change from 'flex-start' to 'center'
// //       justifyContent: 'flex-start'
// //     },
    
// //     heading: { 
// //       width: '100%',
// //       textAlign: 'center',
// //       color: 'red',
// //       marginBottom: '20px'
// //     },
    

// //     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
// //     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
// //     input: {
// //       padding: '8px',
// //       fontSize: '16px',
// //       borderRadius: '4px',
// //       border: '1px solid #ccc',
// //       width: '500px'
// //     },
// //     button: {
// //       padding: '8px 16px',
// //       fontSize: '16px',
// //       borderRadius: '4px',
// //       border: 'none',
// //       backgroundColor: '#007bff',
// //       color: 'white',
// //       cursor: 'pointer',
// //       width: '200px',
// //     },
// //     deleteBtn: {
// //       backgroundColor: '#dc3545',
// //       padding: '5px 10px',
// //       fontSize: '14px',
// //       color: 'white',
// //       border: 'none',
// //       borderRadius: '4px',
// //       cursor: 'pointer'
// //     },
// //     menuGrid: { 
// //       display: 'grid', 
// //       gridTemplateColumns: 'repeat(5, 1fr)', 
// //       gap: '20px',
// //       justifyContent: 'center',
// //       marginTop: '20px'
// //     },
    
// //     menuCard: {
// //       border: '1px solid #ccc',
// //       padding: '15px',
// //       width: '220px',
// //       height: '200px',  // Fixed height
// //       borderRadius: '10px',
// //       backgroundColor: '#fdfdfd',
// //       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       justifyContent: 'space-between',
// //       marginTop:'15px'
     
// //     },
// //     itemInputRow: {
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '10px',
// //       flexWrap: 'wrap',
// //       marginBottom: '10px',
// //       width:'600px'
// //     },
// //     itemForm: {
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       margin: '20px 0',
// //     }
    

// //   };

// //   return (
    
// //     <div style={styles.container}>
// //       <div style={styles.sidebar}>
// //         <h3 style={styles.sidebarHeading}>Categories</h3>
// //         <div style={styles.categoryList}>
// //           {categories.map((cat) => (
// //             <div
// //               key={cat.category_id}
// //               style={{
// //                 ...styles.categoryItem,
// //                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
// //               }}
// //               onClick={() => setSelectedCategoryId(cat.category_id)}
// //             >
// //               <span>{cat.category_name}</span>
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   deleteCategory(cat.category_id);
// //                 }}
// //                 style={styles.deleteBtn}
// //               >
// //                 🗑
// //               </button>
// //             </div>
// //           ))}
// //           <button
// //             onClick={() => setSelectedCategoryId(null)}
// //             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
// //           >
// //             Show All
// //           </button>
// //         </div>
// //       </div>

// //       <div style={styles.main}>
// //         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

// //         <form onSubmit={addCategory} style={styles.formRow}>
// //           <input
// //             type="text"
// //             placeholder="Add Category"
// //             value={categoryInput}
// //             onChange={(e) => setCategoryInput(e.target.value)}
// //             style={styles.input}
// //           />
// //           <button type="submit" style={styles.button}>Add Category</button>
// //         </form>

// //         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

// //         <form onSubmit={addItem} style={styles.itemForm}>
// //   <div style={styles.itemInputRow}>
// //     <input
// //       type="text"
// //       placeholder="Item Name"
// //       value={itemInput.name}
// //       onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
// //       style={styles.input}
// //     />
// //     <input
// //       type="number"
// //       placeholder="Price"
// //       value={itemInput.price}
// //       onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
// //       style={styles.input}
// //     />
// //   </div>

// //   <button type="submit" style={styles.button}>
// //     Add Menu Item
// //   </button>
// // </form>



// // <div style={{ width: '100%' }}>
// //   <div style={styles.menuGrid}>
// //     {menuItems
// //       .filter(item =>
// //         selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
// //       )
// //       .map((item, index) => (
// //         <div key={index} style={styles.menuCard}>
// //           <h3>{item.name || item.item_name}</h3>
// //           <p>Price: ₹{item.price}</p>
// //           <p>Category: {item.category_name}</p>
// //           <div style={{
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             gap: '8px',
// //             marginTop: '10px'
// //           }}>
// //             <button
// //               onClick={() => handleEditClick(item)}
// //               style={{
// //                 ...styles.deleteBtn,
// //                 backgroundColor: '#ffc107',
// //                 padding: '6px 12px',
// //                 fontSize: '14px',
// //                 width: '80px'
// //               }}
// //             >
// //               Edit
// //             </button>
// //             <button
// //               onClick={() => deleteItem(item.item_id)}
// //               style={{
// //                 ...styles.deleteBtn,
// //                 padding: '6px 12px',
// //                 fontSize: '14px',
// //                 width: '80px'
// //               }}
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         </div>
// //       ))}
// //   </div>

// //   {/* View Menu Button below all cards */}
// //   {menuItems.length > 0 && (
// //      <div style={{ textAlign: 'center', padding: '50px' }}>
     
// //      {/* other MenuPage content here */}

// //      <button
// //        onClick={onViewMenu}
// //        style={{
// //          padding: '15px 30px',
// //          fontSize: '18px',
// //          backgroundColor: 'orange',
// //          border: 'none',
// //          borderRadius: '8px',
// //          cursor: 'pointer'
// //        }}
// //      >
// //        View Menu
// //      </button>
// //    </div>
// //   )}
// // </div>


// //         {/* Popup for editing */}
// //         {showEditPopup && (
// //           <div style={{
// //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// //             backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
// //             alignItems: 'center', justifyContent: 'center'
// //           }}>
// //             <div style={{
// //               background: 'white', padding: '30px', borderRadius: '10px',
// //             width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'
// //             }}>
// //               <h2>Edit Menu Item</h2>
// //               <input
// //                 type="text"
// //                 placeholder="Item Name"
// //                 value={editInput.name}
// //                 onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
// //                 style={styles.input}
// //               />
// //               <input
// //                 type="number"
// //                 placeholder="Price"
// //                 value={editInput.price}
// //                 onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
// //                 style={styles.input}
// //               />
// //               <select
// //                 value={editInput.category_id}
// //                 onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
// //                 style={styles.input}
// //               >
// //                 <option value="">Select Category</option>
// //                 {categories.map((cat) => (
// //                   <option key={cat.category_id} value={cat.category_id}>
// //                     {cat.category_name}
// //                   </option>
// //                 ))}
// //               </select>
// //               <div style={{ display: 'flex', justifyContent: 'center' }}>
// //                 <button onClick={updateItem} style={styles.button}>
// //                   Update Item
// //                 </button>
// //               </div>

// //               <div style={{ display: 'flex', justifyContent: 'center' }}>
// //                 <button
// //                   onClick={() => {
// //                     setShowEditPopup(false);
// //                     setEditingItem(null);
// //                   }}
// //                   style={{ ...styles.button, backgroundColor: 'red', }}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MenuPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const MenuPage = ({ onViewMenu }) => {
//   const [categories, setCategories] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [categoryInput, setCategoryInput] = useState('');
//   const [itemInput, setItemInput] = useState({ name: '', price: '', description: '', category_id: '' });
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   const [editingItem, setEditingItem] = useState(null);
//   const [editInput, setEditInput] = useState({ name: '', price: '', description: '', category_id: '' });
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const navigate = useNavigate();

//   // Fetch categories
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/categories')
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error('Error fetching categories:', err));
//   }, []);

//   // Fetch menu items
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/menu_items/getall')
//       .then((res) => setMenuItems(res.data))
//       .catch((err) => console.error('Error fetching menu items:', err));
//   }, []);

//   // Add category
//   const addCategory = async (e) => {
//     e.preventDefault();
//     const newCategory = categoryInput.trim();
//     if (!newCategory) {
//       alert('Category name is required!');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/categories/add', {
//         category_name: newCategory
//       });
//       setCategories([...categories, res.data]);
//       setCategoryInput('');
//     } catch (err) {
//       console.error('Error adding category:', err);
//     }
//   };

//   const deleteCategory = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
//       setCategories(categories.filter(c => c.category_id !== id));
//     } catch (err) {
//       console.error('Error deleting category:', err);
//     }
//   };

//   const addItem = async (e) => {
//     e.preventDefault();
//     const { name, price, description, quantity } = itemInput;
// const category_id = selectedCategoryId;


//     if (!name.trim() || !price.trim() || !category_id) {
//       alert('All fields are mandatory: Item Name, Price, Description, and you must select a category from the sidebar!');
//       return;
//     }

//     const selectedCategory = categories.find(c => c.category_id === category_id);

//     try {
//       const res = await axios.post('http://localhost:5000/api/menu_items/add', {
//         name,
//         price,
//         description,
//         category_id,
//         quantity 
//       });
      

//       const newItem = {
//         ...itemInput,
//         category_id,
//         category_name: selectedCategory?.category_name || 'Unknown'
//       };
//       setMenuItems([...menuItems, newItem]);
//       setItemInput({ name: '', price: '', description: '', category_id: '' });
//     } catch (err) {
//       console.error('Error adding menu item:', err);
//     }
//   };

//   const deleteItem = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
//       const updated = menuItems.filter((item) => item.item_id !== itemId);
//       setMenuItems(updated);
//     } catch (err) {
//       console.error('Delete failed:', err);
//       alert('Could not delete item.');
//     }
//   };

//   const handleEditClick = (item) => {
//     setEditingItem(item);
//     setEditInput({
//       name: item.name || item.item_name,
//       price: item.price,
//       description: item.description,
//       category_id: item.category_id
//     });
//     setShowEditPopup(true);
//   };

//   const updateItem = async (e) => {
//     e.preventDefault();
//     if (!editingItem) return;

//     const { name, price, description, category_id } = editInput;

//     if (
//       name.trim() === '' ||
//       price === '' ||
//       description.trim() === '' ||
//       category_id === ''
//     ) {
//       alert('All fields are mandatory: Item Name, Price, Description, and Category must be filled!');
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);

//       setMenuItems(menuItems.map(item =>
//         item.item_id === editingItem.item_id
//           ? { ...item, ...editInput }
//           : item
//       ));

//       setShowEditPopup(false);
//       setEditingItem(null);
//       alert('Item updated successfully!');
//     } catch (err) {
//       console.error('Error updating item:', err);
//       alert('Could not update item.');
//     }
//   };

//   const styles = {
//     container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
//     sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '2px solid #ddd', marginLeft: '2px' },
//     sidebarHeading: { marginBottom: '15px', color: 'maroon', fontSize: '30px' },
//     categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
//     categoryItem: {
//       padding: '6px 12px',
//       borderRadius: '5px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       cursor: 'pointer'
//     },
//     main: {
//       flex: 1,
//       padding: '20px',
//       backgroundColor: '#fffefc',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'flex-start'
//     },
//     heading: {
//       width: '100%',
//       textAlign: 'center',
//       color: 'red',
//       marginBottom: '20px'
//     },
//     formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
//     formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
//     input: {
//       padding: '8px',
//       fontSize: '16px',
//       borderRadius: '4px',
//       border: '1px solid #ccc',
//       width: '500px'
//     },
//     textarea: {
//       padding: '8px',
//       fontSize: '16px',
//       borderRadius: '4px',
//       border: '1px solid #ccc',
//       width: '500px',
//       minHeight: '80px'
//     },
//     button: {
//       padding: '8px 16px',
//       fontSize: '16px',
//       borderRadius: '4px',
//       border: 'none',
//       backgroundColor: '#007bff',
//       color: 'white',
//       cursor: 'pointer',
//       width: '200px',
//     },
//     deleteBtn: {
//       backgroundColor: '#dc3545',
//       padding: '5px 10px',
//       fontSize: '14px',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer'
//     },
//     menuGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(5, 1fr)',
//       gap: '20px',
//       justifyContent: 'center',
//       marginTop: '20px'
//     },
//     menuCard: {
//       border: '1px solid #ccc',
//       padding: '15px',
//       width: '220px',
//       height: '200px',
//       borderRadius: '10px',
//       backgroundColor: '#fdfdfd',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       marginTop: '15px'
//     },
//     itemInputRow: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '10px',
//       flexWrap: 'wrap',
//       marginBottom: '10px',
//       width: '600px'
//     },
//     itemForm: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       margin: '20px 0',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.sidebar}>
//         <h3 style={styles.sidebarHeading}>Categories</h3>
//         <div style={styles.categoryList}>
//           {categories.map((cat) => (
//             <div
//               key={cat.category_id}
//               style={{
//                 ...styles.categoryItem,
//                 backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
//               }}
//               onClick={() => setSelectedCategoryId(cat.category_id)}
//             >
//               <span>{cat.category_name}</span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   deleteCategory(cat.category_id);
//                 }}
//                 style={styles.deleteBtn}
//               >
//                 🗑
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => setSelectedCategoryId(null)}
//             style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
//           >
//             Show All
//           </button>
//         </div>
//       </div>

//       <div style={styles.main}>
//         <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

//         <form onSubmit={addCategory} style={styles.formRow}>
//           <input
//             type="text"
//             placeholder="Add Category"
//             value={categoryInput}
//             onChange={(e) => setCategoryInput(e.target.value)}
//             style={styles.input}
//           />
//           <button type="submit" style={styles.button}>Add Category</button>
//         </form>

//         <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

//         <form onSubmit={addItem} style={styles.itemForm}>
//           <div style={styles.itemInputRow}>
//             <input
//               type="text"
//               placeholder="Item Name"
//               value={itemInput.name}
//               onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
//               style={styles.input}
//             />
//             <textarea
//               placeholder="Description"
//               value={itemInput.description}
//               onChange={(e) => setItemInput({ ...itemInput, description: e.target.value })}
//               style={styles.textarea}
//             />


//             <input
//               type="text"
//               placeholder="Price"
//               value={itemInput.price}
//               onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
//               style={styles.input}
//             />

// <select
//   value={itemInput.quantity}
//   onChange={(e) => setItemInput({ ...itemInput, quantity: e.target.value })}
//   style={styles.input}
// >
//   <option value="">Select Quantity</option>
  
//     <option value="Full / Half / Quarter Plate  ">Full / Half / Quarter  </option>
    
 
//     <option value="Large / Medium / Small"> Small / Medium / Large / Extra Large</option>
//     <option value="500ml / 1 Liter / Pitcher">500ml / 1 Liter / Pitcher </option>
//     <option value="Single Scoop / Double Scoop / Slice / Whole Cake ">Single Scoop / Double Scoop / Slice / Whole Cake </option>
// </select>

            
//           </div>

//           <button type="submit" style={styles.button}>
//             Add Menu Item
//           </button>
//         </form>

//         <div style={{ width: '100%' }}>   <div style={styles.menuGrid}>
//     {menuItems
//       .filter(item =>
//         selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
//       )
//       .map((item, index) => (
//         <div key={index} style={styles.menuCard}>
//           <h3>{item.name || item.item_name}</h3>
//           <p>Price: ₹{item.price}</p>
//           <p>Category: {item.category_name}</p>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             gap: '8px',
//             marginTop: '10px'
//           }}>
//             <button
//               onClick={() => handleEditClick(item)}
//               style={{
//                 ...styles.deleteBtn,
//                 backgroundColor: '#ffc107',
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 width: '80px'
//               }}
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => deleteItem(item.item_id)}
//               style={{
//                 ...styles.deleteBtn,
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 width: '80px'
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//   </div>

//   {/* View Menu Button below all cards */}
//   {menuItems.length > 0 && (
//      <div style={{ textAlign: 'center', padding: '50px' }}>
     
//      {/* other MenuPage content here */}

//      <button
//        onClick={onViewMenu}
//        style={{
//          padding: '15px 30px',
//          fontSize: '18px',
//          backgroundColor: 'orange',
//          border: 'none',
//          borderRadius: '8px',
//          cursor: 'pointer'
//        }}
//      >
//        View Menu
//      </button>
//    </div>
//   )}
// </div>


//         {/* Popup for editing */}
//         {showEditPopup && (
//           <div style={{
//             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//             backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
//             alignItems: 'center', justifyContent: 'center'
//           }}>
//             <div style={{
//               background: 'white', padding: '30px', borderRadius: '10px',
//             width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'
//             }}>
//               <h2>Edit Menu Item</h2>
//               <input
//                 type="text"
//                 placeholder="Item Name"
//                 value={editInput.name}
//                 onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
//                 style={styles.input}
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={editInput.price}
//                 onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
//                 style={styles.input}
//               />
//               <select
//                 value={editInput.category_id}
//                 onChange={(e) => setEditInput({ ...editInput, category_id: e.target.value })}
//                 style={styles.input}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.category_id} value={cat.category_id}>
//                     {cat.category_name}
//                   </option>
//                 ))}
//               </select>
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <button onClick={updateItem} style={styles.button}>
//                   Update Item
//                 </button>
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <button
//                   onClick={() => {
//                     setShowEditPopup(false);
//                     setEditingItem(null);
//                   }}
//                   style={{ ...styles.button, backgroundColor: 'red', }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuPage = ({ onViewMenu }) => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [itemInput, setItemInput] = useState({ name: '', price: '', description: '', category_id: '' });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [editingItem, setEditingItem] = useState(null);
  const [editInput, setEditInput] = useState({ name: '', price: '', description: '', category_id: '' });
  const [showEditPopup, setShowEditPopup] = useState(false);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Fetch menu items
  useEffect(() => {
    axios.get('http://localhost:5000/api/menu_items/getall')
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error('Error fetching menu items:', err));
  }, []);

  // Add category
  const addCategory = async (e) => {
    e.preventDefault();
    const newCategory = categoryInput.trim();
    if (!newCategory) {
      alert('Category name is required!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/categories/add', {
        category_name: newCategory
      });
      setCategories([...categories, res.data]);
      setCategoryInput('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
      setCategories(categories.filter(c => c.category_id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    const { name, price, description, quantity } = itemInput;
const category_id = selectedCategoryId;


    if (!name.trim() || !price.trim() || !category_id) {
      alert('All fields are mandatory: Item Name, Price, Description, and you must select a category from the sidebar!');
      return;
    }

    const selectedCategory = categories.find(c => c.category_id === category_id);

    try {
      const res = await axios.post('http://localhost:5000/api/menu_items/add', {
        name,
        price,
        description,
        category_id,
        quantity 
      });
      

      const newItem = {
        ...itemInput,
        category_id,
        category_name: selectedCategory?.category_name || 'Unknown'
      };
      setMenuItems([...menuItems, newItem]);
      setItemInput({ name: '', price: '', description: '', category_id: '' });
    } catch (err) {
      console.error('Error adding menu item:', err);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu_items/delete/${itemId}`);
      const updated = menuItems.filter((item) => item.item_id !== itemId);
      setMenuItems(updated);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete item.');
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditInput({
      name: item.name || item.item_name,
      price: item.price,
      description: item.description,
      category_id: item.category_id,
      quantity: item.quantity // Add quantity to the input
    });
    setShowEditPopup(true);
  };
  

  const updateItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
  
    const { name, price, description, category_id, quantity } = editInput;
  
    if (name.trim() === '' || price === '' || description.trim() === '' || category_id === '' || !quantity) {
      alert('All fields are mandatory: Item Name, Price, Description, Category, and Quantity must be filled!');
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/menu_items/update/${editingItem.item_id}`, editInput);
  
      setMenuItems(menuItems.map(item =>
        item.item_id === editingItem.item_id
          ? { ...item, ...editInput }
          : item
      ));
  
      setShowEditPopup(false);
      setEditingItem(null);
      alert('Item updated successfully!');
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Could not update item.');
    }
  };
  

  const styles = {
    container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
    sidebar: { width: '220px', backgroundColor: '#f5f5f5', padding: '20px', borderRight: '2px solid #ddd', marginLeft: '2px' },
    sidebarHeading: { marginBottom: '15px', color: 'maroon', fontSize: '30px' },
    categoryList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    categoryItem: {
      padding: '6px 12px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    },
    main: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#fffefc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    heading: {
      width: '100%',
      textAlign: 'center',
      color: 'red',
      marginBottom: '20px'
    },
    formRow: { display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' },
    formColumn: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0', maxWidth: '400px' },
    input: {
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '500px'
    },
    textarea: {
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '500px',
      minHeight: '80px'
    },
    button: {
      padding: '8px 16px',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
      width: '200px',
    },
    deleteBtn: {
      backgroundColor: '#dc3545',
      padding: '5px 10px',
      fontSize: '14px',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      justifyContent: 'center',
      marginTop: '20px'
    },
    menuCard: {
      border: '1px solid #ccc',
      padding: '10px',
      width: '280px',
      height: '350px',
      borderRadius: '10px',
      backgroundColor: '#fdfdfd',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: '15px',
      gap:'1px',
    },
    
    
    itemInputRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '10px',
      width: '600px'
    },
    itemForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px 0',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarHeading}>Categories</h3>
        <div style={styles.categoryList}>
          {categories.map((cat) => (
            <div
              key={cat.category_id}
              style={{
                ...styles.categoryItem,
                backgroundColor: selectedCategoryId === cat.category_id ? '#ffc107' : '#ffe9c7'
              }}
              onClick={() => setSelectedCategoryId(cat.category_id)}
            >
              <span>{cat.category_name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(cat.category_id);
                }}
                style={styles.deleteBtn}
              >
                🗑
              </button>
            </div>
          ))}
          <button
            onClick={() => setSelectedCategoryId(null)}
            style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#6c757d' }}
          >
            Show All
          </button>
        </div>
      </div>

      <div style={styles.main}>
        <h1 style={styles.heading}>🍽️ Our Menu Management 🍽️ </h1>

        <form onSubmit={addCategory} style={styles.formRow}>
          <input
            type="text"
            placeholder="Add Category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Category</button>
        </form>

        <hr style={{ width: '100%', margin: '15px 0', border: '2px solid black' }} />

        <form onSubmit={addItem} style={styles.itemForm}>
  <div style={styles.itemInputRow}>
    <input
      type="text"
      placeholder="Item Name"
      value={itemInput.name}
      onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
      style={styles.input}
    />

    <textarea
      placeholder="Description"
      value={itemInput.description}
      onChange={(e) => setItemInput({ ...itemInput, description: e.target.value })}
      style={styles.textarea}
    />

<input
              type="text"
              placeholder="Price"
              value={itemInput.price}
              onChange={(e) => setItemInput({ ...itemInput, price: e.target.value })}
              style={styles.input}
            />


    <select
  value={itemInput.quantity}
  onChange={(e) => setItemInput({ ...itemInput, quantity: e.target.value })}
  style={styles.input}
>
  <option value="">Select Quantity</option>
  <option value="None ">  </option>

  <option value="Full / Half ">Full / Half   </option>
    <option value="Full / Half / Quarter  ">Full / Half / Quarter  </option>
    
 
    <option value="Large / Medium / Small "> Large / Medium / Small </option>
    
    <option value="Single Scoop / Double Scoop / Family Pack   ">Single Scoop / Double Scoop / Family Pack   </option>
    <option value="Single Plate / Double Plate">Single Plate / Double Plate</option>
    <option value="Mini / Regular / Large">Mini / Regular / Large</option>
<option value="250ml / 500ml / 1 Liter">250ml / 500ml / 1 Liter</option>
<option value="6-inch / 9-inch / 12-inch">6-inch / 9-inch / 12-inch</option>
<option value="Half kg / 1 kg / 2 kg">Half kg / 1 kg / 2 kg</option>
<option value="1 Piece / 2 Pieces / 4 Pieces ">1 Piece / 2 Pieces / 4 Pieces </option>
<option value="half"> Half </option>
<option value="Full"> Full </option>
</select>

  </div>

  <button type="submit" style={styles.button}>
    Add Menu Item
  </button>
</form>

        <div style={{ width: '100%' }}>   <div style={styles.menuGrid}>
    {menuItems
      .filter(item =>
        selectedCategoryId === null || parseInt(item.category_id) === selectedCategoryId
      )
      .map((item, index) => (
        <div key={index} style={styles.menuCard}>
          <h2 style={{ marginTop: '2px' }}>{item.name || item.item_name}</h2>


          <p><strong>Category:</strong> {item.category_name}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Price:</strong> ₹{item.price}</p>
          
          
      


          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '10px'
          }}>
            <button
              onClick={() => handleEditClick(item)}
              style={{
                ...styles.deleteBtn,
                backgroundColor: '#ffc107',
                padding: '6px 12px',
                fontSize: '16px',
                width: '120px'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteItem(item.item_id)}
              style={{
                ...styles.deleteBtn,
                padding: '6px 12px',
                fontSize: '16px',
                width: '120px'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
  </div>

  {/* View Menu Button below all cards */}
  {menuItems.length > 0 && (
     <div style={{ textAlign: 'center', padding: '50px' }}>
     
     {/* other MenuPage content here */}

     <button
       onClick={onViewMenu}
       style={{
         padding: '15px 30px',
         fontSize: '20px',
         backgroundColor: 'orange',
         border: 'none',
         borderRadius: '8px',
         cursor: 'pointer'

       }}
     >
       View Menu
     </button>
   </div>
  )}
</div>


        {/* Popup for editing */}
        {showEditPopup && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  }}>
    <div style={{
      background: 'white', padding: '30px', borderRadius: '10px',
      width: '550px', display: 'flex', flexDirection: 'column', gap: '15px'
    }}>
      <h2>Edit Menu Item</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={editInput.name}
        onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
        style={styles.input}
      />
      
      <textarea
        placeholder="Description"
        value={editInput.description}
        onChange={(e) => setEditInput({ ...editInput, description: e.target.value })}
        style={styles.textarea}
      />

      <select
        value={editInput.quantity}
        onChange={(e) => setEditInput({ ...editInput, quantity: e.target.value })}
        style={styles.input}
      >
        <option value="">Select Quantity</option>
  <option value="  ">  </option>

  <option value="Full / Half ">Full / Half   </option>
    <option value="Full / Half / Quarter  ">Full / Half / Quarter  </option>
    
 
    <option value="Large / Medium / Small "> Large / Medium / Small </option>
    
    <option value="Single Scoop / Double Scoop / Family Pack   ">Single Scoop / Double Scoop /Family Pack   </option>
    <option value="Single Plate / Double Plate">Single Plate / Double Plate</option>
    <option value="Mini / Regular / Large">Mini / Regular / Large</option>
<option value="250ml / 500ml / 1 Liter">250ml / 500ml / 1 Liter</option>
<option value="6-inch / 9-inch / 12-inch">6-inch / 9-inch / 12-inch</option>
<option value="Half kg / 1 kg / 2 kg">Half kg / 1 kg / 2 kg</option>
<option value="1 Piece / 2 Pieces / 4 Pieces">1 Piece / 2 Pieces / 4 Pieces </option>
<option value="half"> Half </option>
<option value="Full"> Full </option>
      </select>
      <input
        type="text"
        placeholder="Price"
        value={editInput.price}
        onChange={(e) => setEditInput({ ...editInput, price: e.target.value })}
        style={styles.input}
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={updateItem} style={styles.button}>
          Update Item
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            setShowEditPopup(false);
            setEditingItem(null);
          }}
          style={{ ...styles.button, backgroundColor: 'red' }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default MenuPage;




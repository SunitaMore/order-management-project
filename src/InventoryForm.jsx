import React, { useState } from "react";

const InventoryForm = ({ addItem }) => {
  const [item, setItem] = useState({ name: "", quantity: "", price: "" });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.quantity && item.price) {
      addItem({ ...item, quantity: Number(item.quantity), price: Number(item.price) });
      setItem({ name: "", quantity: "", price: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={item.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={item.quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={item.price}
        onChange={handleChange}
      />
      <button type="submit" className="inventory_button">Add Item</button>
    </form>
  );
};

export default InventoryForm;

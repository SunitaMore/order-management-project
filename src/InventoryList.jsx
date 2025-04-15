import React, { useState } from "react";

const InventoryList = ({ inventory, updateItem, deleteItem }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setUpdatedData({ ...item });
  };

  const handleUpdate = () => {
    updateItem(updatedData);
    setEditingItem(null);
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <table className="inventory_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              {editingItem === item.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedData.name}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={updatedData.quantity}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={updatedData.price}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingItem(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;

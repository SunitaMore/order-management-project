import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const Table = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [items, setItems] = useState([]);
  const dropdownRef = useRef(null);

  const floorOptions = ['First Floor', 'Second Floor', 'Third Floor'];

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleSelect = (floor) => {
    setSelectedFloor(floor);
    setShowOptions(false);

    if (floor === 'First Floor') {
      const tables = Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);
      setItems(tables);
    } else if (floor === 'Second Floor') {
      const tables = Array.from({ length: 15 }, (_, i) => `Table ${i + 1}`);
      setItems(tables);
    } else if (floor === 'Third Floor') {
      setItems(['Party Hall 1', 'Party Hall 2']);
    } else {
      setItems([]);
    }
  };

  const handleAdd = () => {
    if (!selectedFloor) return;

    if (selectedFloor === 'Third Floor') {
      const hallCount = items.filter((item) => item.includes('Party Hall')).length;
      setItems([...items, `Party Hall ${hallCount + 1}`]);
    } else {
      const tableCount = items.length;
      setItems([...items, `Table ${tableCount + 1}`]);
    }
  };

  const handleRemove = () => {
    if (!selectedFloor || items.length === 0) return;
    setItems(items.slice(0, -1));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="dropdown-wrapper" ref={dropdownRef}>
          <button className="dropdown-btn" onClick={toggleOptions}>
            {selectedFloor || 'Select Floor'}
          </button>
          {showOptions && (
            <ul className="dropdown-list">
              {floorOptions.map((floor) => (
                <li key={floor} onClick={() => handleSelect(floor)}>
                  {floor}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="nav-actions">
          <button className="nav-btn" onClick={handleAdd}>Add Table +</button>
          <button className="nav-btn" onClick={handleRemove}>Remove Table</button>
        </div>
      </nav>

      {selectedFloor && (
        <div className="table-container">
          <h2>{selectedFloor}</h2>
          <div className="table-grid">
            {items.map((item, index) => (
              <div key={index} className="table-card">
                {item}
                <div className="btn-group">
                  <button className="update-btn">Update</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Table;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';

// // // // // // function Menucard() {
// // // // // //   const [menuItems, setMenuItems] = useState([]); // State for menu items
// // // // // //   const [editingItem, setEditingItem] = useState(null); // State for the item being edited
// // // // // //   const [editInput, setEditInput] = useState({ name: '', price: '', category_id: '' }); // State for input fields
// // // // // //   const [showEditPopup, setShowEditPopup] = useState(false); // State for edit popup visibility

// // // // // //   // Fetch menu items on initial load
// // // // // //   useEffect(() => {
// // // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // // //       .then((res) => setMenuItems(res.data))
// // // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // // //   }, []);



// // // // // //   return (
// // // // // //     <div>
// // // // // //       {/* Example UI for menu items and editing */}
// // // // // //       <h1>Menu Items</h1>
// // // // // //       {/* <ul>
// // // // // //         {menuItems.map(item => (
// // // // // //           <li key={item.item_id}>
// // // // // //             {item.name} - {item.price}
// // // // // //             <button onClick={() => setEditingItem(item)}>Edit</button>
// // // // // //             <button onClick={() => deleteItem(item.item_id)}>Delete</button>
// // // // // //           </li>
// // // // // //         ))}
// // // // // //         </ul> */}

// // // // // // <div className="">
// // // // // //     <h2>Category</h2>
// // // // // //     {menuItems.map(item => (
// // // // // //           <span>
// // // // // //             {item.category_name}
// // // // // //             </span>
// // // // // //         ))}
// // // // // // </div>

// // // // // //       <h2>item Name</h2>
// // // // // //       {menuItems.map(item => (
// // // // // //           <p>
// // // // // //             {item.item_name}
// // // // // //             </p>
// // // // // //         ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Menucard;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';

// // // // // function Menucard() {
// // // // //   const [menuItems, setMenuItems] = useState([]);

// // // // //   useEffect(() => {
// // // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // // //       .then((res) => setMenuItems(res.data))
// // // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // // //   }, []);

// // // // //   return (
// // // // //     <div>
// // // // //       <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', margin: '20px 0', color:"red" }}>
// // // // //   Menu Items
// // // // // </h1>


// // // // //       <table border="1" style={{ width: '100%', textAlign: 'left' }}>
// // // // //         <thead>
// // // // //           <tr>
// // // // //             <th>Category</th>
// // // // //             <th>Item Name</th>
// // // // //             <th>Price</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {menuItems.map(item => (
// // // // //             <tr key={item.item_id}>
// // // // //               <td>{item.category_name}</td>
// // // // //               <td>{item.item_name}</td>
// // // // //               <td>{item.price}</td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Menucard;


// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';

// // // // function Menucard() {
// // // //   const [menuItems, setMenuItems] = useState([]);

// // // //   useEffect(() => {
// // // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // // //       .then((res) => setMenuItems(res.data))
// // // //       .catch((err) => console.error('Error fetching menu items:', err));
// // // //   }, []);

// // // //   // Group items by category
// // // //   const groupedItems = menuItems.reduce((groups, item) => {
// // // //     const category = item.category_name;
// // // //     if (!groups[category]) groups[category] = [];
// // // //     groups[category].push(item);
// // // //     return groups;
// // // //   }, {});

// // // //   return (
// // // //     <div style={{ padding: '20px', fontFamily: 'serif', maxWidth: '600px', margin: '0 auto' }}>
// // // //       <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '30px' }}>Menu</h1>

// // // //       {Object.keys(groupedItems).map((category) => (
// // // //         <div key={category} style={{ marginBottom: '40px' }}>
// // // //           {/* Category header */}
// // // //           <div style={{
// // // //             border: '1px solid black',
// // // //             display: 'inline-block',
// // // //             padding: '5px 20px',
// // // //             margin: '0 auto',
// // // //             fontSize: '24px',
// // // //             fontStyle: 'italic',
// // // //             textAlign: 'center'
// // // //           }}>
// // // //             {category}
// // // //           </div>

// // // //           {/* Menu items */}
// // // //           {groupedItems[category].map((item) => (
// // // //             <div key={item.item_id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
// // // //               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
// // // //                 <span>{item.item_name}</span>
// // // //                 <span>{item.price}</span>
// // // //               </div>
// // // //               {item.description && (
// // // //                 <div style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>
// // // //                   {item.description}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Menucard;
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // function Menucard() {
// // //   const [menuItems, setMenuItems] = useState([]);

// // //   useEffect(() => {
// // //     axios.get('http://localhost:5000/api/menu_items/getall')
// // //       .then((res) => setMenuItems(res.data))
// // //       .catch((err) => console.error('Error fetching menu items:', err));

// // //     // Make whole body white
// // //     document.body.style.backgroundColor = 'white';
// // //     return () => { document.body.style.backgroundColor = ''; };
// // //   }, []);

// // //   const groupedItems = menuItems.reduce((groups, item) => {
// // //     const category = item.category_name;
// // //     if (!groups[category]) groups[category] = [];
// // //     groups[category].push(item);
// // //     return groups;
// // //   }, {});

// // //   return (
// // //     <div style={{ minHeight: '100vh' }}>
// // //       <div style={{
// // //         padding: '20px',
// // //         fontFamily: 'serif',
// // //         width: '45%',    // 90% of the screen width
// // //         margin: '0 auto',
// // //         border: '3px solid black',
// // //         backgroundImage: "url('https://www.transparenttextures.com/patterns/wood.png')",
// // //         backgroundColor: "rgba(0, 0, 0, 0.5)",
// // //         backgroundBlendMode: "multiply",

// // //         borderRadius: '20px',
// // //         color: 'white',
// // //       }}>

// // //         {/* <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '30px', color:'red', fontWeight:'bold' }}>Menu Items List</h1> */}

// // //         {Object.keys(groupedItems).map((category) => (
// // //           <div key={category} style={{ marginBottom: '20px' }}>
// // //             {/* Center the category box */}
// // //             <div style={{
// // //               border: '1px solid black',
// // //               backgroundColor: 'orange',
// // //               display: 'flex',            // ✅ make it a flex container
// // //               justifyContent: 'center',   // ✅ center horizontally
// // //               alignItems: 'center',       // ✅ center vertically
// // //               width: '200px',
// // //               height: '50px',
// // //               margin: '0 auto',           // ✅ center the box itself inside parent
// // //               fontSize: '28px',
// // //               fontFamily: "'Courgette', cursive", 
// // //               textAlign: 'center',
// // //               borderRadius: '10px'
// // //             }}>
// // //               {category}
// // //             </div>





// // //             {groupedItems[category].map((item) => (
// // //               <div key={item.item_id} style={{ padding: '10px 0' }}>
// // //                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '23px', fontStyle: 'Italic', margin: '0px 50px' }}>
// // //                   <span>{item.item_name}</span>
// // //                   <span>{item.price}</span>
// // //                 </div>
// // //                 {item.description && (
// // //                   <div style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>
// // //                     {item.description}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Menucard;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // function Menucard({ onBack }) {   // ✅ add `onBack` prop here
// //   const [menuItems, setMenuItems] = useState([]);

// //   useEffect(() => {
// //     axios.get('http://localhost:5000/api/menu_items/getall')
// //       .then((res) => setMenuItems(res.data))
// //       .catch((err) => console.error('Error fetching menu items:', err));

// //     document.body.style.backgroundColor = 'white';
// //     return () => { document.body.style.backgroundColor = ''; };
// //   }, []);

// //   const groupedItems = menuItems.reduce((groups, item) => {
// //     const category = item.category_name;
// //     if (!groups[category]) groups[category] = [];
// //     groups[category].push(item);
// //     return groups;
// //   }, {});

// //   return (
// //     <div>
// //       {/* ✅ BACK BUTTON */}
// //       <button onClick={onBack} style={{
// //         margin: '20px',
// //         padding: '10px 20px',
// //         backgroundColor: 'orange',
// //         border: 'none',
// //         borderRadius: '8px',
// //         cursor: 'pointer',
// //         fontSize: '16px'
// //       }}>
// //         Back to MenuPage
// //       </button>

// //       {/* ✅ your existing code */}
// //       <div style={{ minHeight: '100vh' }}>
// //         <div style={{
// //           padding: '20px',
// //           fontFamily: 'serif',
// //           width: '45%',
// //           margin: '0 auto',
// //           border: '3px solid black',
// //           backgroundImage: "url('https://www.transparenttextures.com/patterns/wood.png')",
// //           backgroundColor: "rgba(0, 0, 0, 0.5)",
// //           backgroundBlendMode: "multiply",
// //           borderRadius: '20px',
// //           color: 'white',
// //         }}>
// //           {Object.keys(groupedItems).map((category) => (
// //             <div key={category} style={{ marginBottom: '20px' }}>
// //               <div style={{
// //                 border: '1px solid black',
// //                 backgroundColor: 'orange',
// //                 display: 'flex',
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 width: '200px',
// //                 height: '50px',
// //                 margin: '0 auto',
// //                 fontSize: '28px',
// //                 fontFamily: "'Courgette', cursive",
// //                 textAlign: 'center',
// //                 borderRadius: '10px'
// //               }}>
// //                 {category}
// //               </div>

// //               {groupedItems[category].map((item) => (
// //                 <div key={item.item_id} style={{ padding: '10px 0' }}>
// //                   <div style={{
// //                     display: 'flex',
// //                     justifyContent: 'space-between',
// //                     fontSize: '23px',
// //                     fontStyle: 'Italic',
// //                     margin: '0px 50px'
// //                   }}>
// //                     <span>{item.item_name}</span>
// //                     <span>{item.quantity}</span>
                    
// //                     <span>{item.price}</span>
// //                   </div>
// //                   {item.description && (
// //                     <div style={{
// //                       fontSize: '14px',
// //                       color: '#555',
// //                       marginTop: '5px'
// //                     }}>
// //                       {item.description}
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Menucard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Menucard({ onBack }) {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/menu_items/getall')
//       .then((res) => setMenuItems(res.data))
//       .catch((err) => console.error('Error fetching menu items:', err));

//     document.body.style.backgroundColor = 'white';
//     return () => { document.body.style.backgroundColor = ''; };
//   }, []);

//   const groupedItems = menuItems.reduce((groups, item) => {
//     const category = item.category_name;
//     if (!groups[category]) groups[category] = [];
//     groups[category].push(item);
//     return groups;
//   }, {});

//   return (
//     <div>
//       {/* ✅ Back Button */}
//       <button onClick={onBack} style={{
//         margin: '20px',
//         padding: '10px 20px',
//         backgroundColor: 'orange',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontSize: '16px'
//       }}>
//         Back to MenuPage
//       </button>

//       <div style={{ minHeight: '100vh' }}>
//         <div style={{
//           padding: '20px',
//           fontFamily: 'serif',
//           width: '60%',
//           margin: '0 auto',
//           border: '3px solid black',
//           backgroundImage: "url('https://www.transparenttextures.com/patterns/wood.png')",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           backgroundBlendMode: "multiply",
//           borderRadius: '20px',
//           color: 'white',
//           marginBottom:'10px',
//         }}>
//           {Object.keys(groupedItems).map((category) => (
//             <div key={category} style={{ marginBottom: '20px' }}>
//               {/* Category Header */}
//               <div style={{
//                 border: '1px solid black',
//                 backgroundColor: 'orange',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '150px',
//                 height: '50px',
//                 margin: '0 auto',
//                 fontSize: '20px',
//                 fontFamily: "'Courgette', cursive",
//                 textAlign: 'center',
//                 borderRadius: '10px'
//               }}>
//                 {category}
//               </div>

//               {groupedItems[category].map((item) => (
//                 <div key={item.item_id} style={{ padding: '5px 0' }}>
//                   {/* ✅ First row: Item Name, Quantity, Price */}
//                   <div style={{
//                     display: 'flex',
//                     fontSize: '17px',
//                     fontStyle: 'italic',
//                     margin: '0 5px',
//                     fontWeight:'bold'
//                   }}>
//                     <span style={{ flex: 4 }}>{item.item_name}</span>
//                     <span style={{ flex: 1, textAlign: 'right' }}>{item.quantity}</span>
//                     <span style={{ flex: 1, textAlign: 'right' }}>{item.price}</span>
//                   </div>

//                   {/* ✅ Description below */}
//                   {item.description && (
//                     <div style={{
//                       fontSize: '12px',
//                       color: '#ddd',
//                       marginTop: '4px',
//                       margin: '0 5px'
//                     }}>
//                       {item.description}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Menucard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menucard({ onBack }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu_items/getall')
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error('Error fetching menu items:', err));

    document.body.style.backgroundColor = 'white';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const groupedItems = menuItems.reduce((groups, item) => {
    const category = item.category_name;
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div>
      {/* ✅ Back Button */}
      <button onClick={onBack} style={{
        margin: '20px',
        padding: '10px 20px',
        backgroundColor: 'orange',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Back to MenuPage
      </button>

      <div style={{ minHeight: '100vh' }}>
        <div style={{
          padding: '10px',
          fontFamily: 'serif',
          width: '50%',
          margin: '0 auto',
          border: '3px solid black',
          backgroundImage: "url('https://www.transparenttextures.com/patterns/wood.png')",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "multiply",
          borderRadius: '20px',
          color: 'white',
          marginBottom: '10px',
        }}>
          {Object.keys(groupedItems).map((category) => (
            <div key={category} style={{ marginBottom: '20px' }}>
              {/* Category Header */}
              <div style={{
                border: '1px solid black',
                backgroundColor: 'orange',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '150px',
                height: '50px',
                margin: '0 auto',
                fontSize: '20px',
                fontFamily: "'Courgette', cursive",
                textAlign: 'center',
                borderRadius: '10px'
              }}>
                {category}
              </div>

              {groupedItems[category].map((item) => (
  <div key={item.item_id} style={{ padding: '10px 0' }}>
    {/* ✅ Single row: Name | Quantity | Price */}
    <div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '17px',
  fontStyle: 'italic',
  fontWeight: 'bold',
  margin: '0 5px',
}}>
  <div style={{
    width: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }}>
    {item.item_name}
  </div>
  <div style={{
    display: 'flex',
    width: '300px', // ✅ total width for quantity+price
  }}>
    <span style={{
  whiteSpace: 'normal',  // ✅ allow wrapping
  wordBreak: 'break-word',
  marginRight: '20px' 
}}>
  {item.quantity}
</span>

    <span style={{
      marginLeft: 'auto',
      whiteSpace: 'nowrap'
    }}>
      ₹{item.price}
    </span>
  </div>
</div>



    {/* ✅ Description */}
    {item.description && (
      <div style={{
        fontSize: '12px',
        color: '#ddd',
        margin: '0 5px',
        marginTop: '4px'
      }}>
        {item.description}
      </div>
    )}
  </div>
))}



            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menucard;

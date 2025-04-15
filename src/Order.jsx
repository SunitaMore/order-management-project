import React, { useState, useRef, useEffect} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Order = () => {
  const [stock, setStock] = useState({});
  const [stockDetails, setStockDetails] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [stockList, setStockList] = useState([]);
  const [stockCount, setStockCount] = useState({});
  //const [selectedPayment, setSelectedPayment] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [products, setProducts] = useState([]);
 
  const [grandTotals, setGrandTotals] = useState({ totalPrice: 0, totalItems: 0 });


  
  

  

  const [billingInfo, setBillingInfo] = useState({
    invoiceNo: "",
    customerName: "",
    address: "",
    email: "",
    mobile: "",
  });
  
  const printRef = useRef();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    contact: "",
     // Added field for payment method
  });

  const resetCustomerForm = () => {
    setCustomerInfo({
      name: '',
      email: '',
      contact: ''
    });
  };
  

  // Handle Payment Selection (Update only paymentMethod in customerInfo)
  const handlePaymentSelection1 = (event) => {
    setCustomerInfo((prevState) => ({
      ...prevState,
      paymentMethod: event.target.value, // Store selected payment method
    }));
  };



  const handleCustomerChange = (event) => {
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit function is called");
  
    try {
      const response = await fetch("http://localhost:5000/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerInfo),
      });
  
      const result = await response.json();
      console.log("Response from server:", result);
  
      if (result.success) {
        alert("Customer details saved successfully!");
  
        // ✅ Preserve customer details for billing
        setCustomerInfo((prev) => ({
          ...prev,
          saved: true, // Add a flag to indicate successful save
        }));
      } else {
        alert("Failed to save customer details: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving customer details.");
    }
  };
  
//fetch invoice number
//   const fetchInvoice = async (invoiceNo) => {
//     try {
//         const response = await fetch(`http://localhost:5000/sales/${invoiceNo}`);
//         console.log("Response:", response);
//         const data = await response.json();
//         console.log("Response Status:", response.status);
//         console.log(data);
//     } catch (error) {
//         console.error("Error fetching invoice:", error);
//     }
// };

// Example usage:
// fetchInvoice(" ");

  
  // const addProduct = (product, category) => {
  //   setSelectedProducts((prevProducts) => {
  //     const existingProduct = prevProducts.find(
  //       (p) => p.name === product.name && p.category === category
  //     );
  //     if (existingProduct) {
  //       return prevProducts.map((p) =>
  //         p.name === product.name && p.category === category
  //           ? { ...p, quantity: p.quantity + 1 }
  //           : p
  //       );
  //     } else {
  //       return [...prevProducts, { ...product, category, quantity: 1 }];
  //     }
  //   });
  // };

  // const removeProduct = (productToRemove) => {
  //   setSelectedProducts((prevProducts) =>
  //     prevProducts.filter(
  //       (product) =>
  //         !(product.name === productToRemove.name && product.category === productToRemove.category)
  //     )
  //   );
  // };

  // const calculateGrandTotals = () => {
  //   let totalItems = 0;
  //   let totalPrice = 0;

  //   selectedProducts.forEach((product) => {
  //     totalItems += product.quantity;
  //     totalPrice += product.quantity * product.amount;
  //   });

  //   return { totalItems, totalPrice };
  // };

  // const handlePaymentSelection = (event) => {
  //   setSelectedPaymentMethod(event.target.value);
  // };

  // const grandTotals = calculateGrandTotals();


    
  // Fetch Stock Details from Backend nadim
  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stock");
        setStockDetails(response.data);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    };

    fetchStockDetails();
  }, []);


  // const handleSelectProduct = (product) => {
  //   setSelectedProducts((prevSelected) => {
  //     const existingProductIndex = prevSelected.findIndex(
  //       (p) => p.id === product.id
  //     );
  
  //     let updatedProducts;
  
  //     if (existingProductIndex !== -1) {
  //       // If product exists, increase quantity
  //       updatedProducts = prevSelected.map((p, index) =>
  //         index === existingProductIndex
  //           ? { ...p, quantity: p.quantity + 1 }
  //           : p
  //       );
  //     } else {
  //       // If product is new, add it with quantity 1
  //       updatedProducts = [...prevSelected, { ...product, quantity: 1 }];
  //     }
  
  //     // Recalculate Grand Total and Total Items
  //     const newTotalPrice = updatedProducts.reduce(
  //       (sum, p) => sum + p.quantity * p.amount,
  //       0
  //     );
  
  //     const newTotalItems = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
  
  //     setGrandTotals({ totalPrice: newTotalPrice, totalItems: newTotalItems });
  
  //     return updatedProducts;
  //   });
  // };
  
  const handleSelectProduct1 = (product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id && p.Quantity > 0
          ? { ...p, Quantity: p.Quantity - 1 }
          : p
      )
    );
  
    setSelectedProducts((prevSelected) => {
      const existingProductIndex = prevSelected.findIndex((p) => p.id === product.id);
      let updatedProducts;
  
      if (existingProductIndex !== -1) {
        // If product exists, increase quantity
        updatedProducts = prevSelected.map((p, index) =>
          index === existingProductIndex ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // If product is new, add it with quantity 1
        updatedProducts = [...prevSelected, { ...product, quantity: 1 }];
      }
  
      // Update grand total and total items
      const newTotalPrice = updatedProducts.reduce((sum, p) => sum + p.quantity * p.amount, 0);
      const newTotalItems = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
  
      setGrandTotals({ totalPrice: newTotalPrice, totalItems: newTotalItems });
  
      return updatedProducts;
    });
  };
  

  

  const removeProduct1 = (productToRemove) => {
    const updatedProducts = selectedProducts.filter((p) => p.id !== productToRemove.id);
    setSelectedProducts(updatedProducts);
    updateGrandTotal(updatedProducts); // Correct function name
  };
  

  // const updateGrandTotal = (products) => {
  //   const totalPrice = products.reduce((sum, product) => sum + product.amount * product.quantity, 0);
  //   setGrandTotals({ totalPrice });
  // };

  const getGrandTotals = () => {
    let totalItems = 0;
    let totalPrice = 0;
  
    selectedProducts.forEach((product) => {
      totalItems += product.quantity; 
      totalPrice += product.quantity * product.amount;
    });
  
    return { totalItems, totalPrice };
  };
  

  
  const handleSelectProduct = (product) => {
    setSelectedProducts((prevProducts) => {
      if (!prevProducts.some((p) => p.id === product.id)) {
        return [...prevProducts, { 
          ...product, 
          quantity: 1,  // Start with 1
          availableStock: product.Quantity - 1, // Reduce stock on first selection
        }];
      }
      return prevProducts;
    });
  
    // Reduce the stock in the main product list
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id
          ? { ...p, Quantity: p.Quantity - 1 } // Reduce stock
          : p
      )
    );
  };
  
  
  
  const updateQuantity = (product, change) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id
          ? { 
              ...p, 
              quantity: Math.max(1, p.quantity + change), 
              availableStock: Math.max(0, p.availableStock - change) 
            }
          : p
      )
    );
  };
  
  

  const removeProduct = (product) => {
    setSelectedProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
  
    // Restore the available stock in the main product list
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id
          ? { ...p, Quantity: p.Quantity + product.quantity } // Restore stock
          : p
      )
    );
  };
  

  // const handlePaymentSelection = (event) => {
  //   setSelectedPaymentMethod(event.target.value);
  // };
  // const handlePaymentSelection = (e) => {
  //   setSelectedPaymentMethod(e.target.value);
  //   console.log("Payment method selected:", e.target.value); // Debugging
  // };


  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

//invoice number in bill
  const updateSaleRecord = async (saleData) => {
  try {
    const response = await fetch("http://your-api-url/update-sale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    });

    const result = await response.json();
    console.log("API Response:", result); // Log API response

    if (result.success) {
      console.log("Sale record updated. Invoice No:", result.invoiceNo);
    } else {
      console.error("Error updating sale:", result.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  

  
  
//bill template
const handleOpenBill = async () => {

// Generate a shorter Invoice Number (Example: INV-5022) Using Random Numbers
const invoiceNo = `INV-${String(Date.now()).slice(-4)}`;


const saleData = {
  invoiceNo,
  c_name: "John Doe",
  c_email: "john@example.com",
  c_contact: "1234567890",
  product: "Laptop",
  price: 1201.00,
  size: 15,
  total: 1201.00,
};

updateSaleRecord(saleData);



  if (!selectedPaymentMethod || !customerInfo.name || !customerInfo.email || !customerInfo.contact) {
    alert("Please fill all details and select a payment method.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/update-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedProducts }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Stock updated successfully!");
      // Clear selected products and reset state if needed
    } else {
      alert("Error updating stock.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to update stock.");
  }




     const billContent = `
    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Order confirmation </title>
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width; initial-scale=1.0;" />
<style type="text/css">
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
  body { margin: 0; padding: 0; background: #e1e1e1; }
  div, p, a, li, td { -webkit-text-size-adjust: none; }
  .ReadMsgBody { width: 100%; background-color: #e1e1e1; }
  .ExternalClass { width: 100%; background-color: #e1e1e1; }
  body { width: 100%; height: 100%; background-color: #e1e1e1 ; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  html { width: 100%; }
  p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
  .visibleMobile { display: none; }
  .hiddenMobile { display: block; }

  @media only screen and (max-width: 600px) {
  body { width: auto !important; }
  table[class=fullTable] { width: 96% !important; clear: both; }
  table[class=fullPadding] { width: 85% !important; clear: both; }
  table[class=col] { width: 45% !important; }
  .erase { display: none; }
  }

  @media only screen and (max-width: 420px) {
  table[class=fullTable] { width: 100% !important; clear: both; }
  table[class=fullPadding] { width: 85% !important; clear: both; }
  table[class=col] { width: 100% !important; clear: both; }
  table[class=col] td { text-align: left !important; }
  .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
  .visibleMobile { display: block !important; }
  .hiddenMobile { display: none !important; }
  }

  
</style>


<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tr>
    <td height="20"></td>
  </tr>
  
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
        <tr class="hiddenMobile">
          <td height="40"></td>
        </tr>
        <tr class="visibleMobile">
          <td height="30"></td>
        </tr>

        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                      <tbody>
                        <tr>
                          <td align="left"> <img src="http://www.supah.it/dribbble/017/logo.png" width="32" height="32" alt="logo" border="0" /></td>
                        </tr>
                        <tr class="hiddenMobile">
                          <td height="40"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                            Hello, Sir.
                            <br> Thank you for purchase from shop_name and for your order.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                      <tbody>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td height="5"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                            Invoice
                          </td>
                        </tr>
                        <tr>
                        <tr class="hiddenMobile">
                          <td height="50"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                           
                          
                          <small>Invoice No:${invoiceNo} </small><br />
                          <p>${new Date().toLocaleDateString()}</p> 
                           
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- /Header -->
<!-- Order Details -->

<table style="width="100%; margin-bottom:40px;" background-color: #ffffff ;  width="480" border="0" cellpadding="0" cellspacing="5" align="center" class="fullPadding">
  <tbody>
    <tr>

     <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
      <th style="font-size: 12px; font-family: 'Open Sans',background-color: white;, sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
        Product
      </th>
      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
        <small>Price</small>
      </th>
       <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
        <small>size</small>
      </th>
      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
        Quantity
      </th>
      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
        Total
      </th>
    </tr>
    <tr>
      <td height="1" colspan="5" style="background: #bebebe;" ></td>
    </tr>
    <tr>
      <td height="10" colspan="5"></td>
    </tr>
    ${selectedProducts
      .map(
        (product) => `
        <tr>
          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000; line-height: 18px; vertical-align: top; padding:10px 0;" class="article">
            ${selectedCompany} ${product.product}
          </td>
           <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 18px; vertical-align: top; padding:10px 0;"><small>${product.amount}</small></td>
          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 18px; vertical-align: top; padding:10px 0;"><small>${product.inches}</small></td>
          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 18px; vertical-align: top; padding:10px 0;" align="center">${product.quantity}</td>
          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; line-height: 18px; vertical-align: top; padding:10px 0;" align="right">₹${product.quantity * product.amount}</td>
        </tr>
        <tr>
          <td height="1" colspan="5" style="border-bottom:1px solid #e4e4e4"></td>
        </tr>`
      )
      .join("")}
  </tbody>
</table>
 </td>
    </tr>
  </tbody>
</table>

        

<!-- /Order Details -->
<!-- Total -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td>

                <!-- Table Total -->
               <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding" 
  style="margin-top: 20px;"> <!-- Added margin-top -->
                  <tbody>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        Total Items
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                       ${getGrandTotals().totalItems || 0}
                      </td>
                    </tr>
                  
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>Grand Total (Incl.Tax)</strong>
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong> ₹${getGrandTotals().totalPrice || 0}</strong>
                      </td>
                    </tr>
                   
                    </tr>
                  </tbody>
                </table>
                <!-- /Table Total -->

              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Total -->
<!-- Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">

                          <tbody>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>BILLING INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                               ${customerInfo.name}<br> ${customerInfo.email}<br>${customerInfo.contact}
                              </td>
                            </tr>
                          </tbody>
                        </table>


                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                          <tbody>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>PAYMENT METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;">
  ${selectedPaymentMethod} <br />
  Worldpay Transaction ID: 
  <a href="#" style="color: #ff0000; text-decoration: underline;">

  </a>
  <br />
</td>

                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr class="hiddenMobile">
                              <td height="35"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>DELIVERY INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                Verheffen Systems Private Limited
          940 Sinegauge Street Camp 2ND Floor, ·<br>  Pune,<br> Maharashtra 411001
                              </td>
                            </tr>
                          </tbody>
                        </table>


                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                          <tbody>
                            <tr class="hiddenMobile">
                              <td height="35"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>DELIVERY METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                UPS: INDIA Delivery Services
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="30"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">

  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                    Have a nice day.
                  </td>

                </tr>
                 <tr>
                  <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                    Thank you for your purchase!
                  </td>

                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="spacer">
          <td height="50"></td>
        </tr>

      </table>
    </td>
  </tr>
  <tr>
    <td height="20"></td>
  </tr>
</table>
<style>
.print-btn { 
          display: block; 
          width: 20%; 
          padding: 10px; 
          margin-bottom: 10px; 
          background: #007bff; 
          color: white; 
          border: none; 
          cursor: pointer;
        }
        /* Hide print button when printing */
        @media print {
          .print-btn { display: none; }
        }
</style>
<button class="print-btn" onclick="window.print()">Print Bill</button> `
;
  
  //   // Create a Blob with the Word document MIME type
  //    const blob = new Blob(['\ufeff', billContent], { type: "application/msword" }); 
  
  //   // Create a URL and trigger download
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "Bill_Summary.doc";
  //   document.body.appendChild(a);
  //   a.click();
  
  //   // Cleanup
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };
  // Open a new popup window for printing
  // Open a new window for printing
  const billWindow = window.open("", "_blank", "width=350,height=500");
  billWindow.document.open();
  billWindow.document.write(billContent);
  billWindow.document.close();
  setTimeout(() => {
    window.location.reload();
  }, 1000);


};

// useEffect(() => {
//   fetch("http://localhost:5000/getStock/")
//       .then((res) => res.json())
//       .then((data) => setStockList(data))
//       .catch((error) => console.error("Error fetching stock:", error));
// }, []);


const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    amount: "",
    size: "",
  });

  const [company, setCompany] = useState('');

  // Open modal
  const openPopup = () => setIsOpen(true);
  // Close modal
  const closePopup = () => setIsOpen(false);

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  // Save Product (Send data to backend)
  const saveProduct = () => {
    if (!company || !product.name || !product.amount || !product.size) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      company,
      name: product.name,
      amount: product.amount,
      inches: product.inches,
  };

  // Send new stock to the backend
  fetch("http://localhost:5000/addStock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log("Stock added:", data);

      // ✅ Immediately update stock list
      setStockList((prevStock) => [...prevStock, data]);

      // ✅ Clear input fields after saving
      setProduct({ name: "", amount: "", inches: "" });
      setCompany("");
  })
  .catch((error) => console.error("Error adding stock:", error));


    try {
      const response =  axios.post("http://localhost:5000/stock_details", {
        company:company,
        product: product.name,
        amount: product.amount,
        inches:(product.size),
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error saving product:", error);
    }

    console.log("Company Name:", company); // ✅ Logs the company name correctly
    console.log("Product Data:", product); 
    alert("Product Added Successfully!");
    setProduct({name: "", amount: "", size: "" }); // Reset fields
    setCompany("")
    closePopup();
  };

  const ProductDetails = ({ id }) => {
    const [product, setProduct] = useState(null);
  

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;
  }

  // const handleSidebarClick = (category) => {
  //   setSelectedItem(category); // Set selected category
  // };

  useEffect(() => {
    fetch("http://localhost:5000/api/stock") // Ensure this URL is correct
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging log
        setStockDetails(data);
      })
      .catch((err) => console.error("Error fetching stock:", err));
  }, []);
  
  
  

  // Fetch all companies
  useEffect(() => {
    fetch("http://localhost:5000/api/stock_details")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Company:", data); // Debug log
        setCompanies(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);
  
  // Fetch products for selected company
  // const fetchProducts = (data) => {
  //   setSelectedCompany(data);
  //   fetch(`http://localhost:5000/api/stock_details?company=${data}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.error("Error fetching products:", err));
  // };
  

  const fetchProducts = (companyName) => {
    setSelectedCompany(companyName); // Set selected company
  
    fetch(`http://localhost:5000/api/company?company=${encodeURIComponent(companyName)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data); // Debugging step
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };
  

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePaymentSelection = (e) => {
    const method = e.target.value;
    setSelectedPaymentMethod(method);
    setShowPaymentForm(true); // ✅ Open form when a method is selected
  };


    return (
        <div className="content">

<h3>{selectedItem ? `${selectedItem} Stock Details` : "Select an Item"}</h3>

<div className="details-container">
  {/* Sidebar for selecting items */}
  {/* <aside className="sidebar">
    <ul>
      {Object.entries(stockDetails).map(([id, details]) => (
        <li 
          key={id} 
          className={selectedItem === id ? "active" : ""} 
          onClick={() => setSelectedItem(id)}
        >
          {details.company} {/* Show product name instead of ID 
        </li>
      ))}
    </ul>
  </aside> */}

<aside className="sidebar">
  <ul>
    {companies.length > 0 ? (
      companies.map((company, index) => (
        <li key={company + index} onClick={() => fetchProducts(company)}>
          {company}
        </li>
      ))
    ) : (
      <p>Loading companies...</p> // ✅ Prevents empty sidebar
    )}
  </ul>
</aside>


  
 {/* Stock Details - Right Side */}
{/* <div className="stock-details">
  {selectedCompany ? (
    <div>
      <h2 style={{fontSize:"26px"}}>Products for {selectedCompany}</h2>
      <div className="stock-grid">
  {Array.isArray(products) && products.length > 0 ? (
    products.map((product, index) => {
      const selectedItem = selectedProducts.find((p) => p.id === product.id);
      const selectedQuantity = selectedItem ? selectedItem.quantity : 0;

      return (
        <div
          key={product.id || index}
          className="stock-item"
          onClick={() => product.Quantity > 0 && handleSelectProduct(product)}
          style={{
            cursor: product.Quantity > 0 ? "pointer" : "not-allowed",
            opacity: product.Quantity > 0 ? 1 : 0.5
          }}
        >
          <p><strong>Product:</strong> {product.product || "N/A"}</p>
          <p><strong>Amount:</strong> ₹{product.amount || "N/A"}</p>
          <p><strong>Inches:</strong> {product.inches ? `${product.inches}"` : "N/A"}</p>
          <p><strong>Available Stock:</strong> {product.Quantity || 0}</p>
          <p><strong>Selected Stock:</strong> {selectedQuantity}</p>
        </div>
      );
    })
  ) : (
    <p>No products found for this company.</p>
  )}
</div>

    </div>
  ) : (
    <p>Select a company to see details</p>
  )}
</div>






      
{selectedProducts.length > 0 && (
 <div className="product-details-table">
  <div className="table_contain">
 <table border={1} cellPadding={9} cellSpacing={2} >
   <thead>
     <tr>
       <th>Company</th>
       <th>Product</th>
       <th>Price</th>
       <th>Size (Inches)</th>
       <th>Total Items</th>
       <th>Total Price</th>
       <th>Remove</th>
     </tr>
   </thead>
   <tbody>
     {selectedProducts.map((product, index) => (
       <tr key={index}>
         <td>{selectedCompany}</td>
         <td>{product.product}</td>
         <td>₹{product.amount}</td>
         <td>{product.inches}</td>
         <td>{product.quantity}</td>
         <td>₹{product.quantity * product.amount}</td>
         <td>
           <button
             onClick={() => removeProduct(product)}
             style={{
               backgroundColor: "red",
               color: "white",
               border: "none",
               cursor: "pointer",
             }}
           >
             ×
           </button>
         </td>
       </tr>
     ))}
   </tbody>
   <tfoot>
     <tr>
       <td colSpan={4} style={{ textAlign: "right" }}>Total Items:</td>
       <td>{grandTotals.totalItems}</td>
       <td>₹{grandTotals.totalPrice}</td>
       <td></td>
     </tr>
   </tfoot>
 </table>
</div> */}

 {/* Stock Details - Right Side */}
<div className="stock-details">
  {selectedCompany ? (
    <div>
      <h2 style={{ fontSize: "26px" }}>Products for {selectedCompany}</h2>
      <div className="stock-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => {
            const selectedItem = selectedProducts.find((p) => p.id === product.id);
            const isAlreadySelected = !!selectedItem;

            return (
              <div
                key={product.id || index}
                className="stock-item"
                onClick={() => !isAlreadySelected && product.Quantity > 0 && handleSelectProduct(product)}
                style={{
                  cursor: product.Quantity > 0 ? "pointer" : "not-allowed",
                  opacity: product.Quantity > 0 ? 1 : 0.5,
                  border: isAlreadySelected ? "2px solid gray" : "1px solid black",
                  padding: "10px",
                  margin: "5px"
                }}
              >
                <p><strong>Product:</strong> {product.product || "N/A"}</p>
                <p><strong>Amount:</strong> ₹{product.amount || 0}</p>
                <p><strong>Inches:</strong> {product.inches ? `${product.inches}"` : "N/A"}</p>
                <p><strong>Available Stock:</strong> {selectedItem ? selectedItem.availableStock : product.Quantity || 0}</p>
              </div>
            );
          })
        ) : (
          <p>No products found for this company.</p>
        )}
      </div>
    </div>
  ) : (
    <p>Select a company to see details</p>
  )}
</div>

{/* Selected Products Table */}
{selectedProducts.length > 0 && (
  <div className="product-details-table">
    <div className="table_contain">
      <table border={1} cellPadding={9} cellSpacing={2}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Product</th>
            <th>Price</th>
            <th>Size (Inches)</th>
            <th>Items</th>
            <th>Add items</th>
            <th>Minus items</th>
            <th>Total Price</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={index}>
              <td>{selectedCompany}</td>
              <td>{product.product || "N/A"}</td>
              <td>₹{product.amount || 0}</td>
              <td>{product.inches || "N/A"}</td>
              <td>{product.quantity || 0}</td>
              <td>
  <button 
    onClick={(e) => {
      e.preventDefault(); // Prevent any default action
      if (product.availableStock <= 0) {
        alert("Out of Stock! No more items can be selected.");
      } else {
        updateQuantity(product, 1);
      }
    }}
  >
    +
  </button>
</td>

              <td>
                <button onClick={() => updateQuantity(product, -1)} disabled={product.quantity <= 1}>−</button>
              </td>
              <td>₹{(product.quantity * product.amount) || 0}</td>
              <td>
                <button
                  onClick={() => removeProduct(product)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "5px"
                  }}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
  <tr>
    <td colSpan={5} style={{ textAlign: "right" }}>Total Items:</td>
    <td colSpan={2}>{getGrandTotals().totalItems || 0}</td>
    <td>₹{getGrandTotals().totalPrice || 0}</td>
    <td></td>
  </tr>
</tfoot>

      </table>
    </div>



      
                <div className="payment-section">
  <h3 style={{ marginTop: "40px" }}>Choose Payment Method</h3>
  <div className="payment-options">
    {["Credit Card", "Debit Card", "UPI", "Cash on Delivery"].map((method) => (
      <label key={method}>
        <input
          type="radio"
          value={method}
          name="paymentMethod"
          onChange={handlePaymentSelection}
        />
        {method}
      </label>
    ))}
  </div>
  {/* Payment Form - Visible only when a method is selected */}
  {showPaymentForm && (
        <div className="payment-form">
          <h6>Enter {selectedPaymentMethod} Details</h6>
          <form>
            {selectedPaymentMethod !== "Cash on Delivery" ? (
              <>
                <label>Card/UPI Number:</label>
                <input type="text" className="form-input" required />

                <label>Expiry Date:</label>
                <input type="date" className="form-input" required />

                <label>CVV:</label>
                <input type="password" className="form-input" required />
              </>
            ) : (
              <p>No details required for Cash on Delivery.</p>
            )}

            <div className="button-group" style={{marginTop:"8px"}}>
              <button type="submit" className="btn btn-success" style={{marginRight:"10px"}}>
                Confirm Payment
              </button>
              <button type="button" className="btn btn-danger" onClick={() => setShowPaymentForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    
  

  {/* <button className="generate-bill" onClick={generateBill} disabled={!selectedPayment}>
    Generate Bill
  </button> */}
</div>



{/* Customer Details Form - Always Visible */}
<div className="customer-details">
  <h3 style={{fontSize:"18px"}}>Customer Details</h3>
  <form>
    <label>Name :</label>
    <input
      style={{ marginLeft: "32px", marginBottom: "10px" }}
      type="text"
      name="name"
      placeholder="Customer Name"
      value={customerInfo.name}
      onChange={handleCustomerChange}
    />
    <br />
    <label>Email :</label>
    <input
      style={{ marginLeft: "35px", marginBottom: "10px" }}
      type="email"
      name="email"
      placeholder="Email Address"
      value={customerInfo.email}
      onChange={handleCustomerChange}
    />
    <br />
    <label>Contact :</label>
    <input
      style={{ marginLeft: "18px" }}
      type="text"
      name="contact"
      placeholder="Contact Number"
      value={customerInfo.contact}
      onChange={handleCustomerChange}
    />
    <button style={{marginLeft:"10px"}} type="button" onClick={handleSubmit}>Submit</button>
  </form>
</div>


  



<button
  style={{
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor:
    selectedPaymentMethod &&
      customerInfo.name &&
      customerInfo.email &&
      customerInfo.contact
        ? "blue"
        : "gray",
    color: "white",
    border: "none",
    cursor:
    selectedPaymentMethod &&
      customerInfo.name &&
      customerInfo.email &&
      customerInfo.contact
        ? "pointer"
        : "not-allowed",
  }}
  disabled={
    !selectedPaymentMethod||
    !customerInfo.name ||
    !customerInfo.email ||
    !customerInfo.contact
  }
  onClick={handleOpenBill} // Replace with your actual function
>
  Generate Bill
</button>



                  </div>
                
              
            )}
          </div>
        </div>
      );
    }

export default Order;

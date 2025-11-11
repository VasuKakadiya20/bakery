// // import React from "react";

// // function Products() {
// //   return <h1>📦 Products Page</h1>;
// // }

// // export default Products;

// // Product ID,Product Name,description,Status,Price,cetogery id



// // import React, { useState } from "react";
// // import { Switch, FormControlLabel, TextField, Button, MenuItem } from "@mui/material";
// // import "./productAdd.css";
// // import { useEffect } from "react";
// // import { fetchDataFromapi } from "../../utils";

// // export default function ProductAdd() {
// //   const [product, setProduct] = useState({
// //     id: "",
// //     name: "",
// //     description: "",
// //     status: true,
// //     price: "",
// //     category: "",
// //     imgUrl: "",
// //   });
// //   const [categories,setcategories] = useState([])

// //   useEffect(()=>{
// //     fetchDataFromapi("/category").then((res)=>{
// //       setcategories(res)
// //     })
// //   },[])
// //   // const categories = ["Snacks", "Bakery", "Beverages", "Dairy"];

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setProduct({ ...product, [name]: value });
// //   };

// //   const handleStatusChange = () => {
// //     setProduct({ ...product, status: !product.status });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Submitted Product:", product);
// //     alert(`Product "${product.name}" submitted!`);
// //     setProduct({
// //       id: "",
// //       name: "",
// //       description: "",
// //       status: true,
// //       price: "",
// //       category: "",
// //       imgUrl: "",
// //     });
// //   };

// //   return (
// //     <div className="add-category-container">
// //       <h3>Add Product</h3>
// //       <form className="add-category-form" onSubmit={handleSubmit}>
// //         <div className="forms-group">
// //           <label>Product ID</label>
// //           <TextField
// //             name="id"
// //             value={product.id}
// //             onChange={handleChange}
// //              placeholder="Enter Product ID"
// //             required
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //           />
// //         </div>

// //         <div className="forms-group">
// //           <label>Product Name</label>
// //           <TextField
// //             name="name"
// //             value={product.name}
// //             onChange={handleChange}
// //             placeholder="Enter Product name"
// //             required
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //           />
// //         </div>

// //         <div className="forms-group">
// //           <label>Description</label>
// //           <TextField
// //             name="description"
// //             value={product.description}
// //             onChange={handleChange}
// //             placeholder="Enter Product Description"
// //             multiline
// //             rows={3}
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //           />
// //         </div>

// //         <div className="forms-group">
// //           <label>Price</label>
// //           <TextField
// //             name="price"
// //             value={product.price}
// //             onChange={handleChange}
// //             placeholder="Enter Product Price"
// //             type="number"
// //             required
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //           />
// //         </div>

// //         <div className="forms-group">
// //           <label>Category</label>
// //           <TextField
// //             name="category"
// //             value={product.category}
// //             onChange={handleChange}
// //             placeholder="Select Category"
// //             select
// //             required
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //           >
// //             {categories.map((cat) => (
// //               <MenuItem key={cat} value={cat}>
// //                 {cat.name}
// //               </MenuItem>
// //             ))}
// //           </TextField>
// //         </div>

// //         {/* <div className="forms-group">
// //           <label>Image URL</label>
// //           <TextField
// //             name="imgUrl"
// //             value={product.imgUrl}
// //             onChange={handleChange}
// //             placeholder="Enter image URL"
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //           />

// //           {product.imgUrl && (
// //             <div className="img-preview">
// //               <img src={product.imgUrl} alt="Preview" />
// //             </div>
// //           )}
// //         </div> */}

// //         <div className="forms-group">
// //            <label>Product Status</label>
// //           <FormControlLabel
// //             control={
// //               <Switch
// //                 checked={product.status}
// //                 onChange={handleStatusChange}
// //                 color="success"
// //               />
// //             }
// //             label={product.status ? "Active" : "Inactive"}
// //           />
// //         </div>

// //         <button type="submit" className="btn-submit" variant="contained">
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import {
//   Switch,
//   FormControlLabel,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import "./productAdd.css";
// import { fetchDataFromapi, postdata } from "../../utils";
// import { useNavigate } from "react-router-dom";

// export default function ProductAdd() {
//     const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     Id: "",
//     Name: "",
//     Description: "",
//     Status: "Active",
//     price: "",
//     category: "",
//     profileImage:"",
//   });

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchDataFromapi("/category/").then((res) => {
//       setCategories(res);
//     });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleStatusChange = () => {
//     setProduct({ ...product, Status: !product.Status });
//   };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!product.Id || !product.Name || !product.price || !product.category) {
//   //     alert("Please fill all required fields!");
//   //     return;
//   //   }

//   //   try {
//   //     const formData = {
//   //       Id: product.Id,
//   //       Name: product.Name,
//   //       Description: product.Description,
//   //       Status: product.Status,
//   //       price: product.price,
//   //       category: product.category,
//   //       profileImage:product.profileImage
//   //     };
//   //     const res = await postdata("/product/create", formData);

//   //     console.log("Product added:", res);
//   //     alert("✅ Product added successfully!");
//   //     navigate("/productslist")

//   //     setProduct({
//   //       Id: "",
//   //       Name: "",
//   //       Description: "",
//   //       Status: "Active",
//   //       price: "",
//   //       category: "",
//   //       profileImage: "",
//   //     });
//   //   } catch (error) {
//   //     console.error("Error adding product:", error);
//   //     alert("❌ Failed to add product!");
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("Id", product.Id);
//   formData.append("Name", product.Name);
//   formData.append("Description", product.Description);
//   formData.append("Status", product.Status);
//   formData.append("price", product.price);
//   formData.append("category", product.category);
//   formData.append("profileImage", selectedFile); // <== file object

//   try {
//     const res = await axios.post("product/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     console.log("Product added:", res.data);
//   } catch (err) {
//     console.error("Upload failed:", err);
//   }
// };

//   return (
//     <div className="add-category-container">
//       <h3>Add Product</h3>
//       <form className="add-category-form" onSubmit={handleSubmit}>
//         <div className="forms-group">
//           <label>Product ID</label>
//           <TextField
//             name="Id"
//             value={product.Id}
//             onChange={handleChange}
//             placeholder="Enter Product ID"
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Product Name</label>
//           <TextField
//             name="Name"
//             value={product.Name}
//             onChange={handleChange}
//             placeholder="Enter Product Name"
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Description</label>
//           <TextField
//             name="Description"
//             value={product.Description}
//             onChange={handleChange}
//             placeholder="Enter Product Description"
//             multiline
//             rows={3}
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Price</label>
//           <TextField
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             placeholder="Enter Product Price"
//             type="number"
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Category</label>
//           <TextField
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             placeholder="Select Category"
//             select
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           >
//             {categories.map((cat, index) => (
//               <MenuItem key={index} value={cat.name}>
//                 {cat.name}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>

//            <div className="forms-group">
//           <label>Image URL</label>
//          <input
//   type="file"
//   name="profileImage"
//   accept="image/*"
//   onChange={(e) => setSelectedFile(e.target.files[0])}
// />


//           {product.profileImage && (
//             <div className="img-preview">
//               <img src={product.profileImage} alt="Preview" />
//             </div>
//           )}
//         </div>

//         <div className="forms-group">
//           <label>Product Status</label>
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={product.Status}
//                 onChange={handleStatusChange}
//                 color="success"
//               />
//             }
//             label={product.Status ? "Active" : "Inactive"}
//           />
//         </div>

//         <button type="submit" className="btn-submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

import "./productAdd.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { postdata, fetchDataFromapi } from "../../utils";
import { Switch, FormControlLabel, TextField, MenuItem } from "@mui/material";

export default function ProductAdd() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    Id: "",
    Name: "",
    Description: "",
    Status: "Active",
    price: "",
    category: "",
    // profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchDataFromapi("/category/").then((res) => {
      setCategories(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleStatusChange = () => {
    setProduct({
      ...product,
      Status: product.Status === "Active" ? "Inactive" : "Active",
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(async () => {
    const formData = new FormData();
    formData.append("Id", product.Id);
    formData.append("Name", product.Name);
    formData.append("Description", product.Description);
    formData.append("Status", product.Status);
    formData.append("price", product.price);
    formData.append("category", product.category);
    // if (selectedFile) formData.append("profileImage", selectedFile);

    try {
      const res = await postdata("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product added:", res.data);
      toast.success("Product added successfully!");
      setTimeout(() => navigate("/productslist"), 2000);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error("Error adding product!");
    } finally {
      setLoading(false);
    }
  }, 1000);
};

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="add-category-container">
        <h3>Add Product</h3>
        <form className="add-category-form" onSubmit={handleSubmit}>
          <div className="forms-group">
            <label>Product ID</label>
            <TextField
              name="Id"
              value={product.Id}
              onChange={handleChange}
              placeholder="Enter Product ID"
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Product Name</label>
            <TextField
              name="Name"
              value={product.Name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Description</label>
            <TextField
              name="Description"
              value={product.Description}
              onChange={handleChange}
              placeholder="Enter Product Description"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Price</label>
            <TextField
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter Product Price"
              type="number"
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Category</label>
            <TextField
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Select Category"
              select
              required
              fullWidth
              variant="outlined"
              size="small"
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* <div className="forms-group">
          <label>Upload Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])} // ✅ FIXED
          />
          {selectedFile && (
            <div className="img-preview">
              <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
            </div>
          )}
        </div> */}

          <div className="forms-group">
            <label>Product Status</label>
            <FormControlLabel
              control={
                <Switch
                  checked={product.Status === "Active"}
                  onChange={handleStatusChange}
                  color="success"
                />
              }
              label={product.Status}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submit..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

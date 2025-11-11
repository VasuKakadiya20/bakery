// import React from 'react'

// function Settings() {
//   return (
//     <div>
//       <h1>⚙️ Settings page</h1>
//     </div>
//   )
// }

// export default Settings
// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import "./profile.css";

// export default function Settings() {
//   const [product, setProduct] = useState({
//     name: "Vasu Kakadiya",
//     EmailId: "Vasu@gmail.com",
//     Number: "5019273648",
//     password: "1414",
//     imgUrl: "https://res.cloudinary.com/dld4ymcrd/image/upload/v1762431115/user_g1zy4i.png",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProduct({ ...product, imgUrl: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Save All Data");
//     console.log(product);
//   };

//   return (
//     <div className="add-category-container">
//       <h3>User Details</h3>
//       <form className="add-category-form" onSubmit={handleSubmit}>
//         <div className="profile-img-container">
//           <img
//             src={
//               product.imgUrl
//             }
//             alt="Profile"
//           />
//           <label className="img-upload-label">
//             <AddPhotoAlternateIcon />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: "none" }}
//             />
//           </label>
//         </div>

//         <div className="forms-group">
//           <label>User Name</label>
//           <TextField
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Email Id</label>
//           <TextField
//             name="EmailId"
//             value={product.EmailId}
//             onChange={handleChange}
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Phone Number</label>
//           <TextField
//             name="Number"
//             value={product.Number}
//             onChange={handleChange}
//             type="number"
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <div className="forms-group">
//           <label>Password</label>
//           <TextField
//             name="password"
//             value={product.password}
//             onChange={handleChange}
//             type="text"
//             required
//             fullWidth
//             variant="outlined"
//             size="small"
//           />
//         </div>

//         <button type="submit" className="btn-submit" variant="contained">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

// password, user name , email id, number,user img

import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./profile.css";
import { fetchDataFromapi, updateData } from "../../utils";
import { toast, ToastContainer } from "react-toastify";

export default function Settings() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    imgUrl: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData && adminData._id) {
      fetchAdminData(adminData._id);
    }
  }, []);

  const fetchAdminData = async (id) => {
    try {
      const res = await fetchDataFromapi(`/admin/${id}`);
      // console.log("admin Data Setting", res)
      setAdmin({
        name: res.Data.Name,
        email: res.Data.Email,
        phone: res.Data.phonenumber,
        password: res.Data.password,
        imgUrl: res.Data.userimg,
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdmin({ ...admin, imgUrl: reader.result });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (admin.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    const adminData = JSON.parse(localStorage.getItem("adminData"));

    setTimeout(async () => {
      const formData = new FormData();
      formData.append("Name", admin.name);
      formData.append("Email", admin.email);
      formData.append("phonenumber", admin.phone);
      formData.append("password", admin.password);
      if (file) {
        formData.append("userimg", file);
      }

      try {
        await updateData(`/admin/${adminData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error('Error updating profile');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="add-category-container">
        <h3>User Details</h3>
        <form className="add-category-form" onSubmit={handleSubmit}>
          <div className="profile-img-container">
            <img
              src={admin.imgUrl || "https://res.cloudinary.com/dld4ymcrd/image/upload/v1762431115/user_g1zy4i.png"}
              alt="Profile"
            />
            <label className="img-upload-label">
              <AddPhotoAlternateIcon />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="forms-group">
            <label>User Name</label>
            <TextField
              name="name"
              value={admin.name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Email Id</label>
            <TextField
              name="email"
              value={admin.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Phone Number</label>
            <TextField
              name="phone"
              value={admin.phone}
              onChange={handleChange}
              type="number"
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Password</label>
            <TextField
              name="password"
              value={admin.password}
              onChange={handleChange}
              type="text"
              required
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </>
  );
}

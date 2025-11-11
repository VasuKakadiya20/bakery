import {
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
} from "@mui/material";
import "./productAdd.css";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromapi, updateData } from "../../utils";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    Id: "",
    Name: "",
    Description: "",
    Status: "Active",
    price: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDataFromapi(`/product/${ id}`).then((res) => {
      // console.log("this is update product before data:", res)
      setProduct({
        Id: res.product?.Id,
        Name: res.product?.Name,
        Description: res.product?.Description,
        Status: res.product?.Status,
        price: res.product?.price,
        category: res.product?.category || "",
      });
    });

    fetchDataFromapi("/category").then((res) => {
      setCategories(res);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleStatusChange = () => {
    setProduct({ ...product, Status: product.Status === "Active" ? "Inactive" : "Active" });
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setTimeout(async() => {
  //     try {
  //     const updateddata = {
  //       Id: product.Id,
  //       Name: product.Name,
  //       Description: product.Description,
  //       Status: product.Status,
  //       price: product.price,
  //       category: product.category,
  //     };

  //     const res = await updateData(`/product/${id}`, updateddata);
  //     console.log("Product updated:", res);
  //     toast.success('Product updated successfully!');
  //     setTimeout(() => navigate("/productslist", { replace: true }), 2000);
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //     toast.error("Failed to update product!")
  //   }finally {
  //     setLoading(false);
  //   }
  //   }, 1000);
  // };

    const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
      try {
      const updateddata = {
        Id: product.Id,
        Name: product.Name,
        Description: product.Description,
        Status: product.Status,
        price: product.price,
        category: product.category,
      };

      const res = await updateData(`/product/${id}`, updateddata);
      // console.log("Product updated:", res);
      toast.success('Product updated successfully!');
      setTimeout(() => navigate("/productslist", { replace: true }), 2000);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product!")
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={1500} theme="colored" />
      <div className="add-category-container">
        <h3>Edit Product</h3>
        <form className="add-category-form" onSubmit={handleUpdate}>
          <div className="forms-group">
            <label>Product ID</label>
            <TextField
              name="Id"
              value={product.Id}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Product Name</label>
            <TextField
              name="Name"
              value={product.Name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Description</label>
            <TextField
              name="Description"
              value={product.Description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Price</label>
            <TextField
              name="price"
              value={product.price}
              onChange={handleChange}
              type="number"
              fullWidth
              size="small"
            />
          </div>

          <div className="forms-group">
            <label>Category</label>
            <TextField
              name="category"
              value={product.category}
              onChange={handleChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">select Category</MenuItem>
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

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
              {loading ? "Updating..." : "Update"}  
          </button>
        </form>
      </div>
    </>
  );
}
import React, { useState } from "react";
import "./Category.css";
import { useNavigate } from "react-router-dom";
import { postdata } from "../../utils";
import { toast, ToastContainer } from "react-toastify";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryID) {
      toast.error('Please Fill In All Fields!')
      return;

    }
    try {
      const response = await postdata("/category/create", {
        CategoryID: categoryID,
        name: categoryName,
      });

      // console.log("Category added successfully:", response);
      toast.success('Category added successfully!');
      setCategoryName("");
      setCategoryID("");
      setTimeout(() => navigate("/Categorieslist"), 3000);
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error('Failed to Add Category !')
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="add-category-container">
        <h3>Add New Category</h3>
        <form onSubmit={handleSubmit} className="add-category-form">
          <div className="form-group">
            <label>Category ID :</label>
            <input
              type="text"
              placeholder="Enter Category ID"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Category Name :</label>
            <input
              type="text"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategoryPage;
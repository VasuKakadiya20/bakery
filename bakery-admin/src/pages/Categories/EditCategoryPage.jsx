import React, { useState, useEffect } from "react";
import "./Category.css";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromapi, updateData } from "../../utils";
import { toast, ToastContainer } from "react-toastify";

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [categoryID, setCategoryID] = useState("");

  useEffect(() => {
    fetchDataFromapi(`/category/${id}`).then((res) => {
      setCategoryName(res.name);
      setCategoryID(res.CategoryID);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateData(`/category/${id}`, {
        CategoryID: categoryID,
        name: categoryName,
      });
      toast.success('Category updated successfully!');
      console.log("Category updated successfully:", response);
      setTimeout(() => { navigate("/Categorieslist") }, 2000);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error('Failed to update category!')
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="add-category-container">
        <h3>Edit Category</h3>
        <form onSubmit={handleUpdate} className="add-category-form">
          <div className="form-group">
            <label>Category ID :</label>
            <input
              type="text"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category Name :</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCategoryPage;

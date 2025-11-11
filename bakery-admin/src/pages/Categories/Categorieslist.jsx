import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import "./Categorieslist.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletedata, fetchDataFromapi } from "../../utils";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


const SingleCategoryPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryProduct, setcategoryProduct] = useState([])
  const itemsPerPage = 5;

  const filteredData = categoryProduct.filter((item) => {
    const nameMatch = item?.name?.toLowerCase()?.includes(search.toLowerCase());
    const idMatch = item?.CategoryID?.toLowerCase()?.includes(search.toLowerCase()); 
    return nameMatch || idMatch;
  }
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchDataFromapi(`/category`).then((res) => {
      setcategoryProduct(res)
      // console.log("category", res)
    })
  }, [])

  const deletedatac = (_id) => {
    deletedata(`/category/${_id}`).then((res) => {
      toast.success('Category Deleted successfully!', {
        duration: 3000,
      });
      fetchDataFromapi(`/category`).then((res) => {
        setcategoryProduct(res)
        // console.log("Category", res)
      })
    })
  }

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/editcategory/${id}`);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="product-table-container">
        <div className="table-top">
          <h3>Category List</h3>
          <div className="textbox">
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr className="table-header">
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.CategoryID}</td>
                <td>{item.name}</td>
                <td>
                  <ModeEditIcon onClick={() => handleEdit(item._id)} style={{ cursor: "pointer" }} />
                  <DeleteIcon onClick={() => deletedatac(item._id)} style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCategoryPage;
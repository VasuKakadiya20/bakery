import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import "./productlist.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletedata, fetchDataFromapi } from "../../utils";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProductTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productData, setproductData] = useState([])
  const itemsPerPage = 10;

  const filteredData = productData.filter((item) => {
    const idMatch = item?.Id?.toLowerCase()?.includes(search);
    const nameMatch = item?.Name?.toLowerCase()?.includes(search.toLowerCase());
    const pricematch = item?.price?.toString()?.includes(search);
    const categorymatch = item?.category?.toLowerCase()?.includes(search);
    return nameMatch || idMatch || pricematch || categorymatch;
  });

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
    fetchDataFromapi('/product').then((res) => {
      setproductData(res);
      // console.log("product",res)
    })
  }, [])

  const deletedatac = (_id) => {
    deletedata(`/product/${_id}`).then((res) => {
      toast.success("product deleted successfully!")
      fetchDataFromapi(`/product`).then((res) => {
        setproductData(res)
      })
    })
  }

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <>
     <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="product-table-container">
        <div className="table-top">
          <h3>Product List</h3>
          <div className="textbox">
            <input
              type="text"
              placeholder="Search Data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr className="table-header">
              <th>Product ID</th>
              <th>Product Name</th>
              <th>description</th>
              <th>Status</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.Id}</td>
                <td>
                  <span className="product-img">{item.img}</span> {item.Name}
                </td>
                <td>
                  {item.Description && item.Description.length > 50
                    ? item.Description.substr(0, 50) + "..."
                    : item.Description}
                </td>

                <td>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={item.Status === "Active"}
                        disabled={item.Status === "Inactive"}
                        color="success"
                      />
                    }
                    label={item.Status}
                  />
                </td>
                <td>$ {item.price}</td>
                <td>{item.category}</td>
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

export default ProductTable;
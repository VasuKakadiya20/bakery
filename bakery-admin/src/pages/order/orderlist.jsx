import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const PendingSwitch = styled(Switch)(({ theme }) => ({
  "&.Mui-disabled": {
    color: "#2e7d32 !important", 
  },
  "&.Mui-disabled + .MuiSwitch-track": {
    backgroundColor: "rgb(175, 205, 177) !important", 
    opacity: "1 !important",
  },
}));

const orders = [
  { id: 1, name: "French Fries", customer: "Jhon Leo", location: "New Town", status: "Pending", time: "10:05", price: 10 ,qty:2},
  { id: 2, name: "Mango Pie", customer: "Kristien", location: "Old Town", status: "Cancelled", time: "14:05", price: 9 ,qty:3},
  { id: 3, name: "Fried Egg Sandwich", customer: "Jack Suit", location: "Oxford Street", status: "Delivered", time: "12:05", price: 19 ,qty:1},
  { id: 4, name: "Lemon Yogurt Parfait", customer: "Alesdro Guitto", location: "Church hill", status: "Delivered", time: "12:05", price: 18 ,qty:9},
  { id: 5, name: "Spicy Grill Sandwich", customer: "Jacob Sahwny", location: "Palace Road", status: "Delivered", time: "12:05", price: 21 ,qty:7},
  { id: 6, name: "Chicken Sandwich", customer: "Peter Gill", location: "Street 21", status: "Pending", time: "12:05", price: 15 ,qty:5},
  { id: 7, name: "Sandwich", customer: "Jack Suit", location: "40. Street", status: "Delivered", time: "11:05", price: 19 ,qty:8},
  { id: 8, name: "Spaghetti", customer: "Jack Suit", location: "Oxford Street", status: "Delivered", time: "12:05", price: 19 ,qty:4},
  { id: 9, name: "Fried Rice", customer: "Jack Suit", location: "Hilltown Street", status: "Delivered", time: "12:05", price: 19 ,qty:6},
  { id: 10, name: "Noodels", customer: "Jack Suit", location: "Oxford Street", status: "Delivered", time: "12:05", price: 19 ,qty:2},
];

const OrderList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const pendingorder = orders.filter((order)=> order.status === "Pending")

  const filteredOrders = pendingorder.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search)
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="product-table-container">
      <div className="table-top">
        <h3>Pending Orders</h3>
        <div className="textbox">
            <input
          type="text"
          placeholder="Search Orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
      </div>

      <table>
        <thead>
          <tr className="table-header">
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Customer Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Quentity</th>
            <th>Delivered Time</th>
            <th>Total Price</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.customer}</td>
              <td>{order.location}</td>
              <td>
                <FormControlLabel
                  control={
                    <PendingSwitch
                      checked={order.status === "Delivered" || order.status === "Pending"}
                      disabled={order.status === "Cancelled" || order.status === "Pending"}
                      color="success"
                    />
                  }
                  label={order.status}
                />
              </td>
              <td>{order.qty}</td>
              <td>{order.time}</td>
              <td>${order.price}</td>
                <td>
                <ModeEditIcon/>
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
  );
};

export default OrderList;
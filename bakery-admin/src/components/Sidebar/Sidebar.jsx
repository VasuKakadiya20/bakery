import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Sidebar.css"
import 'remixicon/fonts/remixicon.css';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";

function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);
   const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

   const handleDeshbordClick = () => {
    toggleDropdown("Deshbord");
    navigate("/"); 
  };

   const handleSettingsClick = () => {
    toggleDropdown("Settings");
    navigate("/settings"); 
  };

  return (
    <div className="sidebar">
      <ul className="menu">

        <li>
          <button
            className="dropdown-btn"
            onClick={handleDeshbordClick}
          >
            <FaTachometerAlt /> Deshbord
            <FaChevronDown
              className={`chevron ${openDropdown === "Deshbord" ? "rotates" : ""}`}
            />
          </button>
        </li>

        <li>
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("products")}
          >
            <i class="ri-shopping-basket-2-line"></i> Products
            <FaChevronDown
              className={`chevron ${openDropdown === "products" ? "rotate" : ""}`}
            />
          </button>
          {openDropdown === "products" && (
            <ul className="submenu">  
              <li>
                <Link to="/products">➤ Add Product</Link>
              </li>  
              <li>
                <Link to="/productslist">➤ Product List</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("categories")}
          >
           <i class="ri-equalizer-2-line"></i> Category
            <FaChevronDown
              className={`chevron ${openDropdown === "categories" ? "rotate" : ""}`}
            />
          </button>
          {openDropdown === "categories" && (
            <ul className="submenu">
              <li>
                <Link to="/categories">➤ Add Category</Link>
              </li>
              <li>
                <Link to="/Categorieslist">➤ Category List</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("orders")}
          >
            <FaShoppingCart /> Orders
            <FaChevronDown
              className={`chevron ${openDropdown === "orders" ? "rotate" : ""}`}
            />
          </button>
          {openDropdown === "orders" && (
            <ul className="submenu">
              <li>
                <Link to="/orderlist">➤ Pending Orders</Link>
              </li>
              <li>
                <Link to="/corderList">➤ Completed Orders</Link>
              </li>
            </ul>
          )}
        </li>

          <li>
          <button
            className="dropdown-btn"
               onClick={handleSettingsClick}
          >
           <i class="ri-settings-5-fill"></i> Settings
            <FaChevronDown
              className={`chevron ${openDropdown === "Settings" ? "rotates" : ""}`}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
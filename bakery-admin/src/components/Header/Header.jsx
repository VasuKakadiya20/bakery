import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaUser,
  FaInbox,
  FaCog,
  FaLock,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import logo from "../../assets/logo3.png";
import defaultProfile from "../../assets/profile.jpg";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "../../App";
import { fetchDataFromapi } from "../../utils";
import toast, { Toaster } from 'react-hot-toast';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(mycontext);

  const [admin, setAdmin] = useState({
    name: "",
    imgUrl: "",
  });

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData && adminData._id) {
      fetchAdminData(adminData._id);
    }
  }, []);

  const fetchAdminData = async (id) => {
    try {
      const res = await fetchDataFromapi(`/admin/${id}`);
      // console.log("Admin Data:",res)
      setAdmin({
        name: res.Data.Name,
        imgUrl: res.Data.userimg,
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const notifications = [
    {
      id: 1,
      title: "12 ways to improve your bakery dashboard",
      time: "30 seconds ago",
      unread: true,
    },
    {
      id: 2,
      title: "You have newly registered customers",
      time: "45 minutes ago",
      unread: true,
    },
    {
      id: 3,
      title: "Your account was logged in from an unauthorized IP",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 4,
      title: "A new order has been submitted",
      time: "1 day ago",
      unread: false,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    context.setislogin(false);
    toast.success('Logout successfully!', {
      duration: 2000,
    });
    setTimeout(() => navigate("/login", { replace: true }), 2000);
  };

  const openprofile = () => {
    toggleProfile()
    navigate("/settings")
  }

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  return (
    <>
      <header className="header mt-2 mb-2">
        <div className="header-left">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h2>BAKERY</h2>
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search here..." />
          <FaSearch className="search-icon" />
        </div>

        <div className="header-right">
          <div className="notifications-container" ref={notificationsRef}>
            <div className="icon" onClick={toggleNotifications}>
              <FaBell />
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>

            {isNotificationsOpen && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <span className="unread-count">{unreadCount} new</span>
                </div>

                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.unread ? "unread" : ""
                        }`}
                    >
                      <div className="notification-content">
                        <div className="notification-title">
                          {notification.title}
                        </div>
                        <div className="notification-time">
                          {notification.time}
                        </div>
                      </div>
                      {notification.unread && <div className="unread-dot"></div>}
                    </div>
                  ))}
                </div>

                <div className="notifications-footer">
                  <button className="view-all-btn">View all Notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="profile-container" ref={profileRef}>
            <div className="profile" onClick={toggleProfile}>
              <img
                src={admin?.imgUrl || defaultProfile}
                alt="profile"
                className="profile-pic"
              />
              <span className="profile-name">
                {admin?.name || "Admin"}
              </span>
            </div>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="user-info">
                    <img
                      src={admin?.imgUrl || defaultProfile}
                      alt="profile"
                    />
                    <div>
                      <div className="user-name">{admin?.name || "Admin"}</div>
                      <div className="user-welcome">
                        Welcome, {admin?.name?.split(" ")[0] || "Admin"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dropdown-menus">
                  <div className="menu-item" onClick={openprofile}>
                    <FaUser className="menu-icon" />
                    <span>Profile</span>
                  </div>

                  <div className="menu-item">
                    <FaInbox className="menu-icon" />
                    <span>Inbox</span>
                  </div>

                  <div className="menu-item" onClick={openprofile}>
                    <FaCog className="menu-icon" />
                    <span>Account Settings</span>
                  </div>

                  <div className="menu-divider"></div>

                  <div className="menu-item">
                    <FaLock className="menu-icon" />
                    <span>Lock</span>
                  </div>

                  <div className="menu-item" onClick={handleLogout}>
                    <FaSignOutAlt className="menu-icon" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
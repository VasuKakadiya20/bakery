// import React, { useContext, useEffect } from 'react'
// import { mycontext } from '../../App'
// import "./login.css";
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const context = useContext(mycontext)
//   useEffect(()=>{
//     context.setislogin(false)
//   },[])
//   const navigate = useNavigate()

//     const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email === "a@gmail.com" && password === "12") {
//       context.setislogin(true);
//       navigate("/")
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//  return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2 className="text-center mb-4">Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <label>Email Address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group mb-4">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login

import "./login.css";
import { mycontext } from "../../App";
import { postdata } from "../../utils";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const context = useContext(mycontext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    context.setislogin(false);
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  // setTimeout(async() => {
  //     try {
  //     const res = await axios.post(`http://localhost:4000/admin/login`, {
  //       Email: email,
  //       password: password,
  //     });
  //     console.log("response data:",res)
  //     if(res.status == 200){
  //       toast.success("Login successful!")
  //       console.log("backend Data:",res)
  //       localStorage.setItem("adminData", JSON.stringify(res.data.admin));
  //       context.setislogin(true);
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     toast.error("Invalid email or password")
  //   } finally {
  //     setLoading(false);
  //   }
  // }, 1000);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  setTimeout(async() => {
      try {
      const res = await postdata(`/admin/login`, {
        Email: email,
        password: password,
      });
      // console.log("response",res)
      if(res.status == 200){
        toast.success("Login successful!")
        // console.log("backend Data:",res)
        localStorage.setItem("adminData", JSON.stringify(res.admin));
        context.setislogin(true);
        navigate("/");
      }else{
        toast.error("Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid email or password")
    } finally {
      setLoading(false);
    }
  }, 1000);
  };

  return (
   <>
     <div className="login-page">
      <div className="login-box">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
           <p className="text-center mt-3" style={{ fontSize: 14 }}>
            Not a member ? <Link to="/singup">Signup now</Link>
          </p>
        </form>
      </div>
    </div>
   </>
  );
}

export default Login;

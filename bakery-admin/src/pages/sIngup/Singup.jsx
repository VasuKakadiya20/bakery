import React, { useContext, useEffect, useState } from "react";
import { mycontext } from "../../App";
import "./signup.css";
import { useNavigate, Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
import { postdata } from "../../utils";
import { toast, ToastContainer } from "react-toastify";


export default function Signup() {
  const context = useContext(mycontext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    context.setislogin(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await postdata("/admin/create", {
        Name: name,
        Email: email,
        password: password,
        phonenumber: phonenumber,
      });

      toast.success("Signup successful — you can now login");
      setTimeout(() => navigate("/login"), 2000);
      setName("");
      setEmail("");
      setPassword("");
      setphonenumber("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Signup error:", err);
      const message =
        err?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="login-page">
        <div className="login-box">
          <h2 className="text-center mb-3">Create Account</h2>
          <p className="text-center" style={{ color: "#666", marginTop: -6, marginBottom: 18 }}>Register an admin account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter phone Number"
                value={phonenumber}
                onChange={(e) => setphonenumber(e.target.value)}
                required
              />
            </div>

            <div className="form-row" style={{ display: "grid", gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center mt-3" style={{ fontSize: 14 }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

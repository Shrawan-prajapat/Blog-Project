import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userRole = auth?.token?.user?.role;
    if (userRole) {
      navigate(`/${userRole}/dashboard`);
    }
  }, [auth?.token, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      let res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let user = await res.json();
      if (!user.success) throw new Error(user.message || "Login failed");

      localStorage.setItem("token", JSON.stringify(user.token));
      setAuth({ ...auth, token: user.token });

      toast.success(user.message);
      setTimeout(() => navigate(`/${user.user.role}/dashboard`), 2000);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/12428480/pexels-photo-12428480.jpeg?auto=compress&cs=tinysrgb&w=3600&lazy=load')", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          minHeight: "91vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
          <div
            className="card p-4 shadow-lg rounded"
            style={{
              maxWidth: "450px",
              width: "100%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h4 className="text-center" style={{ color: "#ffffff" }}>Sign In</h4>
            <p className="text-center" style={{ fontSize: "14px", color: "#e0e0e0" }}>
              Use your email and password to access your account
            </p>
            <form onSubmit={handleSubmit}>
            <style>
                {`
                  input::placeholder {
                    color: rgba(255, 255, 255, 0.7) !important;
                  }
                `}
              </style>
              <div className="mb-3 input-group">
                <span className="input-group-text" style={{ backgroundColor: "transparent", border: "none", color: "#ffffff" }}>
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  style={{ background: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.4)" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" style={{ backgroundColor: "transparent", border: "none", color: "#ffffff" }}>
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  style={{ background: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.4)" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-end mb-3">
                <Link to="/forgot-password" className="text-decoration-none" style={{ color: "#ffd700" }}>
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(to right, #4CAF50, #2E8B57)",
                  color: "#ffffff",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  transition: "0.3s",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                onMouseOut={(e) => (e.target.style.opacity = "1")}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="text-center mt-3">
              <p style={{ color: "#ffffff" }}>
                Don’t have an account? <Link to="/register" className="text-decoration-none" style={{ color: "#ffd700" }}>Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Login;

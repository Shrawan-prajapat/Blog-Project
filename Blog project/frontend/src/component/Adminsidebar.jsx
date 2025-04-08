import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

const Adminsidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const logoutUser = () => {
    toast.success("User Logged Out Successfully");
    setAuth({ ...auth, token: null });
    
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
   <>
    <div
      className="d-flex flex-column p-4 sidebar shadow-lg"
      style={{
        width: "280px",
        height: "100vh",
        background: "linear-gradient(to bottom, #0A192F, #1B98E0)",
        color: "#fff",
      }}
    >
      <h4 className="text-center mb-4 fw-bold">Admin Panel</h4>
      <ul className="nav flex-column">
        {[  
          { to: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { to: "/posts", icon: <FaFileAlt />, label: "Blog" },
          { to: "/admin/users", icon: <FaUser />, label: "Users" },
          { to: "/admin/profile", icon: <FaUserCircle />, label: "Profile" },
        ].map((item, index) => (
          <li key={index} className="nav-item mb-2">
            <Link
              to={item.to}
              className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded ${
                location.pathname === item.to ? "bg-light text-dark fw-bold" : "text-white"
              }`}
              style={{ transition: "0.3s" }}
            >
              {item.icon} {item.label}
            </Link>
          </li>
        ))}

        {/* Logout Button */}
        <li className="nav-item mt-3">
          <button
            className="btn btn-danger btn-sm w-100"
            onClick={logoutUser}
            style={{
              transition: "0.3s",
              borderRadius: "5px",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Logout
          </button>
        </li>
      </ul>

      <div className="mt-auto text-center">
        <p className="small text-white-50">Terms of Service · Privacy · Content Policy</p>
      </div>
    </div>
        <ToastContainer position="top-center" autoClose={2000} />
   </>
  );
};

export default Adminsidebar;

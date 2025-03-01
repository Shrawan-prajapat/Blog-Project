import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Header = () => {
  const navigate= useNavigate();
  const [auth,setAuth]=useAuth();
  const logoutUser=()=>{
   setAuth({
      ...auth,
      token:null
   })
   toast.success("User Logout Successfully")
   localStorage.removeItem('token')
   setTimeout(() => {
      navigate('/')
   });
  }
  return (
   <>
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ backgroundColor: "  #f4a35d #2c3e50   ", padding: "10px 0" }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand text-dark fw-bold" href="#">
              MyApp
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to={`/`} className="nav-link text-dark">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/register`} className="nav-link text-dark">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                 <button className="btn btn-danger btn-sm" onClick={()=> logoutUser()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      
    </div>
    <ToastContainer position="top-center" autoClose={2000} />
   </>
  );
};

export default Header;

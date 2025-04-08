import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();


  return (
    <>
      <div
        className="shadow p-3  bg-body-tertiary"
        style={{ background: "linear-gradient(to right, #0D1B2A, #1B98E0)"
        }}
      >
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand text-white fw-bold" to="/">
              DevSphere
              </Link>
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
                  {!auth?.token ? (
                    <>
                      <li className="nav-item">
                        <Link to={`/`} className="nav-link text-white">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={`/register`} className="nav-link text-white">
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                    <li className="nav-item">
                      <Link to={`/about`} className="nav-link text-white">
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/contact`} className="nav-link text-white">
                        Contact
                      </Link>
                    </li>
                  </>
                  )}
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

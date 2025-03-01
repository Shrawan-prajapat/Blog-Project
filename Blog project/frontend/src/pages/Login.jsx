import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth?.token?.role=='admin'){
      navigate('/admin/dashboard')
    }else if(auth?.token?.role=='manager'){
      navigate('/manager/dashboard')
    }else{
      navigate('/user/dashboard')
    }
  },[auth?.token])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        toast.error("All fields are required...");
        return;
      }

      let res = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let user = await res.json();

      if (user.success) {


        localStorage.setItem("token", JSON.stringify(user?.user));

        setAuth({
          ...auth,
          token: user?.user,
        });
        let userrole = user?.user?.role;
        toast.success(user?.message)
        if (userrole == 'admin') {
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 2000);
        }else if(userrole == 'manager'){
          setTimeout(() => {
            navigate("/manager/dashboard");
          }, 2000);
        }else if(userrole == 'user'){
          setTimeout(() => {
            navigate("/user/dashboard");
          }, 2000);
        }

      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed! Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center ">
        <div className="card p-4 shadow border-0" style={{ width: "400px", borderRadius: "12px", background: "#fff" }}>
          <h5 className="text-center text-dark">Sign In to Account</h5>
          <p className="text-center text-muted" style={{ fontSize: "14px" }}>Use your email and password to access your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control p-2"
                placeholder="Enter your email"
                style={{ borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="name" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control p-2"
                placeholder="Enter your password"
                style={{ borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>
            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-decoration-none" style={{ fontSize: "14px", color: "#f4a261" }}>
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ background: "linear-gradient(to right, #e9a500, #f4a261)", padding: "10px", borderRadius: "8px", border: "none" }}
            >
              Continue
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-dark" style={{ fontSize: "14px" }}>
              Didn’t have an account? <Link to="/register" className="text-decoration-none" style={{ color: "#f4a261" }}>Create New Account</Link>
            </p>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </>
  );
};

export default Login;

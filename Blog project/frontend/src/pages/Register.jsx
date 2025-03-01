import React, { useState } from "react";
import Header from "../component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("All fields are required...");
        return;
      }

      let res = await fetch(`http://localhost:8000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      let user = await res.json();

      if (user.success) {
        toast.success(user.message);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed! Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container  d-flex justify-content-center align-items-center">
        <div className="card border-0 p-4 shadow-lg" style={{ width: "400px" }}>
          <h4 className="text-center text-black mb-3">Create your an account</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button
            type="submit"
            className="btn w-100 text-white"
            style={{ background: "linear-gradient(to right, #e9a500, #f4a261)", padding: "10px", borderRadius: "8px", border: "none" }}
          >
            Continue
          </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Register;

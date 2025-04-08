import React, { useState } from "react";
import Header from "../component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCity, FaPhone, FaImage } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !gender || !city || !contact) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("city", city);
    formData.append("contact", contact);
    
    if (image) formData.append("userimage", image);

    try {
      let res = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: formData,
      
      });

      let user = await res.json();
      if (!user.success) throw new Error(user.message || "Registration failed");

      toast.success(user.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Registration failed:", err);
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
            <h4 className="text-center" style={{ color: "#ffffff" }}>Sign Up</h4>
            <p className="text-center" style={{ fontSize: "14px", color: "#e0e0e0" }}>
              Create an account to get started!
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
                  <FaUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  style={{ background: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.4)" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className="mb-3">
                <label className="form-label" style={{ color: "#ffffff" }}>Gender</label>
                <div className="d-flex gap-3">
                  <div>
                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                    <label className="ms-2" style={{ color: "#ffffff" }}>Male</label>
                  </div>
                  <div>
                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                    <label className="ms-2" style={{ color: "#ffffff" }}>Female</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" style={{ backgroundColor: "transparent", border: "none", color: "#ffffff" }}>
                  <FaCity />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your city"
                  style={{ background: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.4)" }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" style={{ backgroundColor: "transparent", border: "none", color: "#ffffff" }}>
                  <FaPhone />
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your contact"
                  style={{ background: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.4)" }}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" style={{ backgroundColor: "transparent", border: "none", color: "#ffffff" }}>
                  <FaImage />
                </span>
                <input
                  type="file"
               
                  className="form-control"
                  placeholder=""
                  style={{ background: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.4)" }}
                  
                  onChange={(e) => setImage(e.target.files[0])}
                />
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
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="text-center mt-3">
              <p style={{ color: "#ffffff" }}>
                Already have an account? <Link to="/" className="text-decoration-none" style={{ color: "#ffd700" }}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Register;

import React, { useState,useEffect } from "react";
import Adminsidebar from "../../component/Adminsidebar";
import Header from "../../component/Header";
import { useAuth } from "../../context/AuthContext";

const Admin = () => {
  const [auth, setAuth] = useAuth();
  const [no, setNo] = useState("");

  
    const fetchUser = async () => {
      try {
        let res = await fetch(`http://localhost:8000/admin/alluser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth?.token}`
          }
        });
        let data = await res.json();
        if (data.success) {
         setNo(data.users.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);


  return (
    <div>

      <Header />

      <div className="d-flex">

        <Adminsidebar />


        <div className="container p-4 mt-5" >
          <div className="row">
            <div className="col">
              <h1 className="fw-bold text-dark">Hello, Admin!</h1>
              <p className="text-muted">Welcome to your admin dashboard.</p>
            </div>
            <div className="col-md-9">
              <div className="row">
              <div className="col-md-3">
            <div className="card">
              <div className="card-header">
               Users
              </div>
              <div className="card-body">
                <h5 className="card-title">Count: {no}</h5>
              
              </div>
            </div>

            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

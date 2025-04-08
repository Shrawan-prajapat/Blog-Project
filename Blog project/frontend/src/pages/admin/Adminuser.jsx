import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Adminsidebar from '../../component/Adminsidebar';
import { useAuth } from '../../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";

const Adminuser = () => {
  const [auth,setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
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
        setUsers(data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const deleteUser = async (userid) => {
    try {
      let res = await fetch(`http://localhost:8000/admin/deleteuser?userid=${userid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token}`  
        }
      });
      let data = await res.json();
      if (data.success) {
        toast.error(data.message);
        fetchUser();
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
   <>
    <div className="bg-light min-vh-100">
      <Header />
      <div className="d-flex">
        <Adminsidebar />
        <div className="container p-4">
          <div className="row mb-4">
            <div className="col text-center">
              <h1 className="fw-bold text-primary">Admin Users</h1>
            </div>
          </div>
          <div className="card shadow-lg p-4 border-0 rounded-3">
            <div className="table-responsive">
              <table className="table  table-hover text-center">
                <thead className="table-primary text-white">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">City</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((val, index) => (
                      <tr key={index} className="align-middle">
                        <th scope="row">{index + 1}</th>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.gender}</td>
                        <td>{val.city}</td>
                        <td>{val.contact}</td>
                        <td>
                          <img src={val.image} width={80} height={80} className="rounded-pill border border-dark" alt="User" />
                        </td>
                        <td>
                          <button onClick={() => deleteUser(val?._id)} className='btn btn-danger btn-sm'>
                            <FaTrash />
                          </button>&nbsp;
                          <button onClick={() => navigate(`/admin/edituser`, { state: val })} className='btn btn-success btn-sm'>
                            <FaEdit />
                          </button>&nbsp;
                          <button onClick={() => navigate(`/admin/moredetails`, { state: val })} className='btn btn-info btn-sm mt-2'>
                            <FaInfoCircle />
                          </button>
                        </td>
                        <td>
                          <select onChange={(e) => changeRole(val?._id, e.target.value)} className='form-control'>
                            <option value="">---select role---</option>
                            { ["admin", "manager", "user"].map((role, index) => (
                                <option key={index} value={role} selected={val?.role === role}>
                                  {role}
                                </option>
                              ))
                            }
                          </select>
                        </td>  
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Adminuser;

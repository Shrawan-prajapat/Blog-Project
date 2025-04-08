import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../component/Header';
import Adminsidebar from '../../component/Adminsidebar';

const Adminprofile = () => {
    const [auth, setAuth] = useAuth();
    const [user, setUser] = useState(null);
   

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/admin/viewprofile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth?.token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch admin profile');
                }
                
                const data = await response.json();
                setUser(data.admin);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchAdminProfile();
    }, [auth]);

   

    return (
        <>
            <Header />
            <div className="d-flex">
                <Adminsidebar />
                <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
                    <div className="container">
                        <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                            <div className="card-header bg-gradient bg-primary text-white p-4">
                                <h3 className="mb-0 fw-bold">Admin Profile</h3>
                                <small className="text-light">Account Details</small>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
                                            <div className="mb-3">
                                                <strong className="text-muted">Name:</strong>
                                                <span className="ms-2">{user?.name || "N/A"}</span>
                                            </div>
                                            <div className="mb-3">
                                                <strong className="text-muted">Email:</strong>
                                                <span className="ms-2">{user?.email || "N/A"}</span>
                                            </div>
                                            <div className="mb-3">
                                                <strong className="text-muted">Gender:</strong>
                                                <span className="ms-2">{user?.gender || "N/A"}</span>
                                            </div>
                                            <div className="mb-3">
                                                <strong className="text-muted">City:</strong>
                                                <span className="ms-2">{user?.city || "N/A"}</span>
                                            </div>
                                            <div className="mb-3">
                                                <strong className="text-muted">Contact:</strong>
                                                <span className="ms-2">{user?.contact || "N/A"}</span>
                                            </div>
                                            <div>
                                                <strong className="text-muted">Role:</strong>
                                                <span className="ms-2">{user?.role || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-3 bg-white rounded shadow-sm text-center">
                                            <div className="mb-4">
                                                {user?.image ? (
                                                    <img 
                                                        src={user.image} 
                                                        className="rounded-circle shadow" 
                                                        alt="Profile" 
                                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white shadow" 
                                                        style={{ width: '150px', height: '150px', margin: '0 auto' }}
                                                    >
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <strong className="text-muted">Status:</strong>
                                                <span className={`badge ${user?.status === "active" ? "bg-success" : "bg-danger"} ms-2 px-3 py-2`}>
                                                    {user?.status === "active" ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                            <div>
                                                <strong className="text-muted">Created At:</strong>
                                                <span className="ms-2">{new Date(user?.createdAt).toLocaleDateString() || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Adminprofile;
import React from "react";
import Adminsidebar from "../component/Adminsidebar";
import Header from "../component/Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="d-flex">
        {/* Sidebar */}
        <Adminsidebar />

        {/* Main Content */}
        <div className="container mt-5">
          <div className="row align-items-center">
            {/* Left Side - Contact Info */}
            <div className="col-md-6">
              <h2 className="fw-bold text-dark">Let's Connect & Grow Together!</h2>
              <p className="text-muted">
                Have questions about our platform? Need assistance?  
                Our team is here to help you improve customer engagement, boost sales, and maximize your potential.  
                Choose a convenient way to connect with us.
              </p>

              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card text-center p-4 shadow-sm border-0">
                    <i className="fas fa-phone-alt text-primary fa-2x mb-2"></i>
                    <h6>Call Us</h6>
                    <p className="text-muted fw-bold">+44 20 3514 0663</p>
                    <a href="#" className="text-primary small">
                      View global numbers
                    </a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-center p-4 shadow-sm border-0">
                    <i className="fas fa-comments text-info fa-2x mb-2"></i>
                    <h6>Live Chat</h6>
                    <button className="btn btn-info btn-sm">Start Chat</button>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-center p-4 shadow-sm border-0">
                    <i className="fas fa-calendar-check text-success fa-2x mb-2"></i>
                    <h6>Request a Demo</h6>
                    <button className="btn btn-success btn-sm">Schedule Now</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="col-md-6 text-center">
              <img
                src="https://source.unsplash.com/500x350/?customer,service"
                alt="Customer Support"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

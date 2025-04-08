import React from "react";
import Adminsidebar from "../component/Adminsidebar";
import Header from "../component/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="d-flex">
        {/* Sidebar */}
        <Adminsidebar />

        {/* Main Content */}
        <div className="container mt-5">
          <h2 className="text-primary">About DevSphere</h2>
          <p className="lead">
            DevSphere is a platform designed to help developers collaborate, manage projects, and share knowledge.
          </p>
          <p>
            Our mission is to empower developers with the tools they need to create, learn, and grow in the tech industry.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

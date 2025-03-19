import React from "react";
import "../css/Dashboard.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="dashboard-footer">
      <p>© {currentYear} EventMaster. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
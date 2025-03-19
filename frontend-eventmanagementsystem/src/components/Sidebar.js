import React from "react";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();
  const location = useLocation(); 
const navigate = useNavigate();
  return (
    <aside className="dashboard-sidebar">
      <ul>
      <li 
      onClick={() => navigate("/dashboard")} 
      className={location.pathname === "/dashboard" ? "active" : ""}
    >
      <span className="sidebar-icon">👥</span> Manage Events
    </li>
        {/* <li>
          <span className="sidebar-icon">👥</span>
          Attendees
        </li> */}

        <li 
      onClick={() => navigate("/events")} 
      className={location.pathname === "/events" ? "active" : ""}
    >
      <span className="sidebar-icon">👥</span> Events
    </li>
        {/* <li>
          <span className="sidebar-icon">⚙️</span>
          Settings
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
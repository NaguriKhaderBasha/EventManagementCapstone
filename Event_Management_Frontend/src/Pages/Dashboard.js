import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../css/Dashboard.css";

const Dashboard = () => {
  // Correctly fetch dashboard data from Redux store
  const dashboardData = useSelector(state => state.auth.dashboardData);
  console.log(dashboardData,"aaaaaa");
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-main">
        <Sidebar />
        <main className="dashboard-content">
          <h2>Dashboard Overview</h2>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">📅 {dashboardData.totalEvents} Total Events</div>
            <div className="stat-card">🔴 {dashboardData.activeEvents} Active Events</div>
            <div className="stat-card">👥 {dashboardData.totalAttendees} Attendees</div>
            <div className="stat-card">💰 ${dashboardData.totalRevenue} Revenue</div>
          </div>

          {/* Upcoming Events Table */}
          <div className="content-card">
            <h3>Upcoming Events</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Id </th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Attendees</th>
                  
                </tr>
              </thead>
              <tbody>
                {dashboardData.upcomingEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.eventDate}</td>
                    <td>{event.attendees}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, deleteEvent } from "../redux/slices/eventSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EventModal from "../components/EventModal"; // Import modal
import "../css/Event.css";


const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For edit mode
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    setSelectedEvent(null); // Reset for adding new event
    setModalOpen(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event); // Pass event details for editing
    setModalOpen(true);
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(eventId));
    }
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="event-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="event-content">
          <h2>All Events</h2>
          <button className="add-btn" onClick={handleAddEvent}>+ Add Event</button>
          
          <table className="event-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length > 0 ? (
                currentEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.eventDate}</td>
                    <td>{event.status}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(event)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(event.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
              <button key={i + 1} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Modal for Add/Edit */}
      {modalOpen && <EventModal event={selectedEvent} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Events;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveEvent } from "../services/api"; // Import saveEvent API function

const EventModal = ({ event, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    
    name: event?.name || "",
    eventDate: event?.eventDate || "",
    status: event?.status || "active", // Default to "Active"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(saveEvent({ event, formData }))
      .then(() => onClose())
      .catch((error) => console.error("Error saving event:", error));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Date:</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />

          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button type="submit">{event ? "Update Event" : "Add Event"}</button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://localhost:7211/api"; // Your .NET backend

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Login`, credentials);
    //  console.log(response.data);
    return response.data; // Should return { name, email }
  } catch (error) {
    throw  "Invalid credentials";
  }
};
export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const response = await axios.get(`${API_BASE_URL}/Event`);
  console.log(response,"fetched");
  return response.data;
});

export const deleteEvent = createAsyncThunk("event/deleteEvent", async (eventId, { dispatch }) => {
  await axios.delete(`${API_BASE_URL}/Event/${eventId}`);
  dispatch(fetchEvents()); // Refresh events after deletion
});

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/UserRegister/register`, userData);
  return response.data;
};


// Add or update an event
export const saveEvent = createAsyncThunk("event/saveEvent", async ({ event, formData }, { dispatch }) => {
  const method = event ? "PUT" : "POST";
  const url = event ? `${API_BASE_URL}/Event/${event.id}` : `${API_BASE_URL}/Event`;
  console.log(method);
  console.log(url);
  if(method=='PUT'){
  formData["id"]=event.id;
  }
  console.log(formData,"formdata");
  try {
    await axios({
      method,
      url,
      data: formData,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(fetchEvents()); // Refresh list after add/edit
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
});
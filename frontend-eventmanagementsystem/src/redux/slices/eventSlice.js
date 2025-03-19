import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, deleteEvent } from "../../services/api";

const eventSlice = createSlice({
  name: "event",
  initialState: { events: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        console.log(action.payload, "payload");
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event.id !== action.meta.arg);
      });
  },
});

export { fetchEvents, deleteEvent };
export default eventSlice.reducer;

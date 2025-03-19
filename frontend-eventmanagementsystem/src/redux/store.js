import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventReducer from "./slices/eventSlice"; // ✅ Import eventReducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer, // ✅ Add eventReducer here
  },
});

export default store;

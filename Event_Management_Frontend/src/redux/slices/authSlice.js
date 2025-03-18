import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  dashboardData: JSON.parse(localStorage.getItem("dashboardData")) || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log( localStorage.getItem("user"),"loginSuccess");
      localStorage.setItem("isAuthenticated", "true");
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
      localStorage.setItem("dashboardData", JSON.stringify(action.payload));
      console.log( localStorage.getItem("dashboardData"),"dashbaord");
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.dashboardData = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("dashboardData");
    },
  },
});

export const { loginSuccess, setDashboardData, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

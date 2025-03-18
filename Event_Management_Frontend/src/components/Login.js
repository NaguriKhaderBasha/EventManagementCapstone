import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, setDashboardData } from "../redux/slices/authSlice";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(response);
      dispatch(loginSuccess(response.user));
      dispatch(setDashboardData(response.dashboardData)); // Store dashboard data
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
}

export default Login;

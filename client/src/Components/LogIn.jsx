import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import "./LogIn.css";
import "./styles.css";

function LogInPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsSignedIn } = useAuth(); // grab setIsSignedIn from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios("http://localhost:4000/api/login", {
        method: "POST",
        data: credentials,
      });

      localStorage.setItem("token", data.token);

      setIsSignedIn(true); // set isSignedIn to true in context

      navigate("/home");
      console.log("Login successful:", data);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LogInPage;

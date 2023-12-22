// LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from JSON server and store it in localStorage
    const fetchData = async () => {
      try {
        const response = await fetch(
          " https://655500aa63cafc694fe75243.mockapi.io/aman"
        );
        const data = await response.json();
        localStorage.setItem("users", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation
    if (name === "username") {
      setLoginData({
        ...loginData,
        [name]: value.slice(0, 50), // Limit to 50 characters
      });
    } else if (name === "password") {
      setLoginData({
        ...loginData,
        [name]: value.slice(0, 50), // Limit to 50 characters
      });
    }
  };

  const handleLogin = () => {
    // Check if either username or password is missing
    if (!loginData.username && !loginData.password) {
      toast.error("Username and password are required");
      return;
    }

    if (!loginData.username) {
      toast.error("Username is required");
      return;
    }

    if (!loginData.password) {
      toast.error("Password is required");
      return;
    }

    // Check user credentials in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const user = storedUsers.find(
      (u) =>
        u.username === loginData.username && u.password === loginData.password
    );

    if (user) {
      console.log("Login successful");
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      console.error("Invalid credentials");
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
    style={{
      backgroundImage:
        "url(https://static.vecteezy.com/system/resources/previews/001/937/563/non_2x/online-education-application-learning-worldwide-on-computer-mobile-website-background-social-distance-concept-the-classroom-training-course-library-illustration-flat-vector.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: "90%",
        maxWidth: "400px",
        padding: "10px",
        position: "relative",
        opacity: "0.9",
        border: "solid red 1px",
        backgroundColor: "rgba(173, 216, 230, 0.7)",
      }}
    >
        <Form>
          <Form.Group controlId="formUsername">
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Enter username"
              maxLength={50}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF", // Line below input
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter password"
              maxLength={50}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF", // Line below input
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
          </Form.Group>
          <div className="text-center" style={{ margin: "10px" }}>
            Don't have an account? <NavLink to="/r">Create one</NavLink>.
          </div>
          <div></div>

          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

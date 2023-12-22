import { toast } from "react-toastify";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation
    if (name === "username" && value.length > 30) {
      console.error("Username is required");
      toast.error("Username is required");
      return;
    }

    if (name === "password" && value.length > 50) {
      console.error("Password is required");
      toast.error("Password is required");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    // Add your validation logic here
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Save user data to JSON server
      fetch("https://655500aa63cafc694fe75243.mockapi.io/aman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User registered:", data);
          // Save user information in localStorage
          localStorage.setItem("currentUser", JSON.stringify(data));
          // Show alert after successful registration
          toast.success("Registration successful! Now you can log in.");
          // Navigate to dashboard or profile page after successful registration
          navigate("/dashboard");
        })
        .catch((error) => console.error("Error registering user:", error));
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
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              maxLength="30"
              isInvalid={errors.username}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF",
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              maxLength="50"
              isInvalid={errors.firstName}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF",
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              maxLength="50"
              isInvalid={errors.lastName}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF",
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              maxLength="50"
              isInvalid={errors.email}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF",
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              maxLength="50"
              isInvalid={errors.password}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF",
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              maxLength="50"
              isInvalid={errors.confirmPassword}
              style={{
                width: "100%",
                borderBottom: "2px solid #007BFF",
                marginBottom: "10px",
                background: "transparent",
                border: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ margin: "10px", width: "43%" }}
          >
            Register
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            style={{ margin: "10px", width: "43%" }}
          >
            Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;

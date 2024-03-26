import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../components-css/LoginSignup.css";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validatePassword = (password) => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(password);
  };

  const checkUserExists = async (username, email) => {
    const response = await fetch(`http://localhost:9000/api/users`);
    const users = await response.json();
    return users.some(
      (user) => user.username === username || user.email === email
    );
  };

  // A pseudo "hashing" function to obfuscate the userID
  const pseudoHashUserID = (userID) => {
    const base64encoded = btoa(userID.toString()); // Base64 encode (not secure hashing!)
    return base64encoded;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default page reload on form submission
    const endpoint = action === "Login" ? "/api/users" : "/api/user";

    if (action === "Login") {
      // Handle login
      try {
        const usersResponse = await fetch(`http://localhost:9000${endpoint}`);
        const users = await usersResponse.json();
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (!user) {
          alert("Invalid username or password");
          return;
        }

        // Pseudo-hash the userID
        const hashedUserID = pseudoHashUserID(user.user_id);
        navigate(`/main/${hashedUserID}`);
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
      }
    } else {
      // Sign up validations and logic
      if (!validateUsername(username)) {
        alert("Username must be at least 3 characters long.");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!validatePassword(password)) {
        alert(
          "Password must contain at least one number, one uppercase, one lowercase, one special character, and be at least 8 characters long."
        );
        return;
      }

      const userExists = await checkUserExists(username, email);
      if (userExists) {
        alert("Username or email already exists.");
        return;
      }

      try {
        const newUser = { username, email, password };
        const response = await fetch(`http://localhost:9000${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(
            errorData.message || "Failed to create account. Please try again."
          );
          return;
        }

        const createdUser = await response.json();
        const hashedUserID = pseudoHashUserID(createdUser.user_id);
        navigate(`/main/${hashedUserID}`);
        alert("Account created successfully. Please log in.");
        setAction("Login");
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred during sign up. Please try again.");
      }
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="header">
        <div className="text">{action}</div>
      </div>
      {/* Rest of your component */}
      <div className="inputs">
        {/* Email input for Sign Up */}
        {action === "Sign Up" && (
          <div className="input">
            <FontAwesomeIcon icon={faEnvelope} className="icons" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {/* Username input */}
        <div className="input">
          <FontAwesomeIcon icon={faUser} className="icons" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* Password input */}
        <div className="input">
          <FontAwesomeIcon icon={faLock} className="icons" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        {/* Toggle between Sign Up and Login */}
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Already have an account?
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Create Account
        </div>
      </div>
      <button type="submit" className="submit" id="subBtn">
        {action === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default LoginSignup;

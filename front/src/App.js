
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./grocry/HomePage";
import Login from "./grocry/Login";
import Register from "./grocry/Register";
import GroceryList from "./grocry/GroceryList";
import AboutUs from "./grocry/aboutUs"; // Import About Us component
import ContactUs from "./grocry/contactus"; // Import Contact Us component
import NavBar from "./components/NavBar"; // Import your NavBar component
// import StylishFooter from "./components/white-footer"; // Import your footer if needed
import UserProfile from "./grocry/UserProfile"
const App = () => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (accessToken, refreshToken) => {
    setToken(accessToken);
    setRefreshToken(refreshToken);
    setErrorMessage(""); // Clear previous error messages
  };

  const handleError = (message) => {
    setErrorMessage(message); // Set error message
  };

  return (
    <Router>
      <div className="app-container">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display errors */}
        
        {/* Navigation Bar */}
        <NavBar isLoggedIn={!!token} /> {/* Pass login state to NavBar */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} onError={handleError} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/GroceryList"
            element={
              token ? (
                <GroceryList
                  token={token}
                  refreshToken={refreshToken}
                  setToken={setToken}
                />
              ) : (
                <Login onLogin={handleLogin} onError={handleError} />
              )
            }
          />
          <Route path="/grocry/aboutUs" element={<AboutUs />} /> {/* About Us Route */}
          <Route path="/grocry/contactus" element={<ContactUs />} /> {/* Contact Us Route */}
          <Route path="/grocry/UserProfile" element={<UserProfile />} />
          </Routes>

        {/* Footer */}
        {/* <StylishFooter /> */}
      </div>
    </Router>
  );
};
  
export default App;


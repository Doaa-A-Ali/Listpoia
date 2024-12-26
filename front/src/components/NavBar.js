import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import logo from "../asset/images/logo-removebg-preview.png";

function NavBar({ isLoggedIn }) { // Accept isLoggedIn as a prop
  const [navActive, setNavActive] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleMenu = () => {
    setNavActive((prev) => !prev);
  };

  const handleGroceryListClick = () => {
    if (isLoggedIn) {
      navigate("/GroceryList");
    } else {
      handleLoginPrompt();
    }
  };

  const handleLoginPrompt = () => {
    const userAction = window.confirm(
      "You need to log in to manage your grocery list. Would you like to log in or register?"
    );
    if (userAction) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <header className="flex justify-between items-center p-2 bg-white bg-opacity-70 backdrop-blur-md border-b border-gray-300 sticky top-0 z-50 shadow-sm">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <img src={logo} className="h-20 w-20 ml-12" alt="Logo" />
      </div>


      {/* Right Section: Button */}
      <div className="flex items-center md:ml-auto">
        {/* Hamburger Menu for Mobile */}
        <button
          className="flex flex-col gap-1 ml-4 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-transform ${
              navActive ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-opacity ${
              navActive ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-transform ${
              navActive ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${ 
          navActive ? "block" : "hidden" 
        } md:flex flex-col md:flex-row  ml-4 gap-6 absolute md:static top-16 right-5 bg-white md:bg-transparent rounded-lg shadow-md md:shadow-none p-5 md:p-0`}
      >
        <Link to="/" className="hover:text-orange-500 text-xl">
          Home
        </Link>
        <Link to="./grocry/aboutUs" className="hover:text-orange-500 text-xl">
          About Us
        </Link>
        <Link to="./grocry/contactus" className="hover:text-orange-500 text-xl">
          Contact Us
        </Link>
        <Link to="/grocry/UserProfile" className=" hover:text-orange-500 text-xl">
    User Profile
</Link>
        <button
          className="hover:text-orange-500 mr-4 text-xl "
          onClick={handleGroceryListClick}
        >
          Manage Your Grocery List
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
import React, { useState } from "react";
import axios from "axios";
import Login from "../asset/Login.jpg"
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setSuccess("");
  
    // Basic validation
    if (!formData.username || !formData.lastName || !formData.email || !formData.mobile || !formData.password || !formData.cpassword) {
      setError("All fields are required.");
      return;
    }
  
    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      setSuccess(response.data.message); // Set success message
      setFormData({
        username: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
    } catch (error) {
      // Log the full error response to the console
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  return (
    <div className="bg-[#faf5df] h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto font-[sans-serif] bg-[#f1d38e] border rounded-2xl shadow p-6">
        <div className="text-center mb-16">
          <img src={Login} alt="logo" className="w-20 inline-block" />
          <h4 className="text-[#cd8f08] text-base font-semibold mt-6">
            Sign up for your account
          </h4>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
        {success && <p className="text-green-500 text-center">{success}</p>} {/* Success message */}
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-[#cd8f08] text-sm mb-2 block">First Name</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="bg-[#faf5df] w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-[#fee861] transition-all"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="text-[#cd8f08] text-sm mb-2 block">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-[#faf5df] w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-[#fee861] transition-all"
                placeholder="Enter last name"
                required
              />
            </div>
            <div>
              <label className="text-[#cd8f08] text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#faf5df] w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-[#fee861] transition-all"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="text-[#cd8f08] text-sm mb-2 block">Mobile No.</label>
              <input
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className="bg-[#faf5df] w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-[#fee861] transition-all"
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div>
              <label className="text-[#cd8f08] text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#faf5df] w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-[#fee861] transition-all"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="text-[#cd8f08] text-sm mb-2 block">Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                value={formData.cpassword}
                onChange={handleChange}
                className="bg-[#faf5df] w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-[#fee861] transition-all"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
          <div className="!mt-12">
            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-[#cd8f08] hover:bg-[#fee861] hover:text-[#cd8f08] hover:shadow-lg"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
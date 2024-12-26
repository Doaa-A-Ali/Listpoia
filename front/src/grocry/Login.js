// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Login = ({ onLogin, onError }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true); // Set loading state
//         try {
//             const response = await fetch('http://localhost:5000/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const responseBody = await response.text();

//             if (!response.ok) {
//                 let errorMessage = 'Login failed';
//                 try {
//                     const errorData = JSON.parse(responseBody);
//                     errorMessage = errorData.message || errorMessage;
//                 } catch (parseError) {
//                     errorMessage = responseBody; // Fallback to plain text
//                 }
//                 throw new Error(errorMessage);
//             }

//             const data = JSON.parse(responseBody);
//             // Call onLogin with both tokens
//             onLogin(data.accessToken, data.refreshToken);

//             // Navigate to the Grocery List after successful login
//             navigate('/grocery-list'); // Redirect to the Grocery List page

//         } catch (error) {
//             console.error('Login error:', error);
//             onError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-[#faf5df] font-[sans-serif] min-h-screen grid grid-cols-1 md:grid-cols-2">
//             {/* Left Side: Login Form */}
//             <div className="flex flex-col items-center justify-center py-6 px-4">
//                 <div className="max-w-md w-full">
//                     <a href="javascript:void(0)">
//                         <img src="logo.png" alt="logo" className="w-20 mb-8 mx-auto block" />
//                     </a>
//                     <div className="p-8 rounded-2xl bg-[#f1d38e] shadow">
//                         <h2 className="text-[#cd8f08] text-center text-2xl font-bold">Login</h2>
//                         <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
//                             <div>
//                                 <label className="text-[#cd8f08] text-sm mb-2 block" htmlFor="email">Email</label>
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="w-full text-gray-800 text-sm border bg-[#faf5df] px-4 py-3 rounded-md outline-[#fee861]"
//                                     placeholder="Enter email"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="text-[#cd8f08] text-sm mb-2 block" htmlFor="password">Password</label>
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="w-full text-gray-800 text-sm bg-[#faf5df] px-4 py-3 rounded-md outline-[#fee861]"
//                                     placeholder="Enter password"
//                                 />
//                             </div>
//                             <div className="flex items-center space-x-3">
//                                 <input
//                                     id="remember-me"
//                                     name="remember-me"
//                                     type="checkbox"
//                                     className="h-4 w-4 shrink-0 text-[#fee861] border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="remember-me" className="ml-3 block text-sm text-[#cd8f08]">Remember me</label>
//                             </div>
//                             <div className="text-sm">
//                                 <a href="javascript:void(0);" className="text-[#cd8f08] hover:underline font-semibold">
//                                     Forgot your password?
//                                 </a>
//                             </div>
//                             <div className="!mt-8">
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-[#cd8f08] hover:bg-[#fee861] hover:text-[#cd8f08] hover:shadow-lg focus:outline-none"
//                                 >
//                                     {loading ? 'Logging in...' : 'Login'}
//                                 </button>
//                             </div>
//                             <p className="text-gray-800 text-sm !mt-8 text-center">
//                                 Don't have an account?
//                                 <a href="javascript:void(0);" className="text-[#cd8f08] hover:underline ml-1 whitespace-nowrap font-semibold">
//                                     Register here
//                                 </a>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Side: Image */}
//             <div className="hidden md:flex items-center justify-center bg-gray-200">
//                 <img src="shopping-list.jpg" alt="Shopping list illustration" className="object-cover h-full w-full" />
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ds from "../asset/Login.jpg";

const Login = ({ onLogin, onError = (error) => console.error(error) }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with:", email, password); // Debugging line
    setLoading(true);

    const controller = new AbortController(); // Create an AbortController for timeout
    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort fetch request after 5 seconds
      console.error("Login request timed out");
      onError("Login request timed out");
    }, 5000); // Set timeout to 5 seconds

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal, // Pass the signal to the request
      });

        clearTimeout(timeoutId); // Clear timeout if request is successful

      console.log("Response Status:", response.status); // Log response status

      //   if (!response.ok) {
      //     const responseBody = await response.text();
      //     let errorMessage = "Login failed";
      //     console.log(errorMessage);

      //     try {
      //       const errorData = JSON.parse(responseBody);
      //       errorMessage = errorData.message || errorMessage;
      //     } catch (parseError) {
      //       errorMessage = responseBody;
      //     }
      //     throw new Error(errorMessage);
      //   }

      const data = await response.json();
      console.log("Login Success:", data);

      // Ensure tokens are present
      if (data.accessToken && data.refreshToken) {
        onLogin(data.accessToken, data.refreshToken); // Call onLogin with tokens
        console.log("Navigating to GroceryList...");
        navigate("/GroceryList");
      } else {
        throw new Error("Missing tokens in response");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Fetch request was aborted");
        onError("Request was aborted due to timeout");
      } else {
        console.error("Login error:", error);
        onError(error.message); // Handle error
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-[#faf5df] font-[sans-serif] min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <img src="logo.png" alt="logo" className="w-20 mb-8 mx-auto block" />
          <div className="p-8 rounded-2xl bg-[#f1d38e] shadow">
            <h2 className="text-[#cd8f08] text-center text-2xl font-bold">
              Login
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="text-[#cd8f08] text-sm mb-2 block"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gray-800 text-sm border bg-[#faf5df] px-4 py-3 rounded-md outline-[#fee861]"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label
                  className="text-[#cd8f08] text-sm mb-2 block"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-800 text-sm bg-[#faf5df] px-4 py-3 rounded-md outline-[#fee861]"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-[#fee861] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-[#cd8f08]"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="javascript:void(0);"
                  className="text-[#cd8f08] hover:underline font-semibold"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-[#cd8f08] hover:bg-[#fee861] hover:text-[#cd8f08] hover:shadow-lg focus:outline-none"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?
                <a
                  href="javascript:void(0);"
                  className="text-[#cd8f08] hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center bg-gray-200">
        <img
          src={ds}
          alt="Shopping list illustration"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default Login;

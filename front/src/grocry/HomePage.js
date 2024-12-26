// import React, { useState } from "react";
// import WhiteFooter from '../components/white-footer';
// import first from "../asset/images/first.png";
// import PopularMeals from '../components/PopularMeals';
// import NavBar from '../components/NavBar';

// const HomePage = () => {
//   const [navActive, setNavActive] = useState(false);

//   const toggleMenu = () => {
//     setNavActive(!navActive);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-5 font-sans">
//       {/* <NavBar /> */}
      
//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center gap-5 bg-gradient-to-r from-red-500 to-orange-500 p-10 rounded-lg shadow-2xl my-10">
        
//         {/* Image Section */}
//         <div className="w-full md:w-1/2 flex justify-center">
//           <img 
//             src={first} 
//             alt="A shopping basket with groceries" 
//             className="max-w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105" 
//             style={{ height: '300px', objectFit: 'cover' }} // Fixed height with object fit
//           />
//         </div>

//         {/* Text Section */}
//         <div className="w-full md:w-1/2 text-left flex flex-col ml-5"> 
//           <h1 className="text-3xl font-bold text-white mb-3 transition-transform transform hover:translate-x-1">
//             Grocery Shopping List
//           </h1>
//           <h3 className="text-lg text-white mb-5">
//             Plan your weekly shopping list and manage it effortlessly with us!
//           </h3>
//           <button className="bg-green-600 text-white w-60 px-8 py-3 rounded-2xl shadow-lg hover:bg-green-800 transition transform hover:scale-105">
//             Start Adding Items
//           </button>
//         </div>
//       </section>

//       <PopularMeals />

//       {/* Footer */}
//       {/* <WhiteFooter /> */}
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect, useRef } from "react";
import WhiteFooter from "../components/white-footer";
import first from "../asset/images/first5.png";
import bgImage from "../asset/images/bg-grocery.jpg";
import PopularMeals from "../components/PopularMeals";
// import NavBar from "./components/NavBar";
import FestiveGroceryLists from "../components/FestiveGroceryLists";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Refs for sections
  const heroRef = useRef(null);
  const mealsRef = useRef(null);
  const festiveRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe sections
    const sections = [heroRef.current, mealsRef.current, festiveRef.current];
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div
      className="font-sans min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      {/* <NavBar /> */}

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className={`transition duration-500 ${
          activeSection === "hero" ? "blur-none" : "blur-sm"
        } flex flex-col md:flex-row items-center gap-5 bg-gradient-to-r from-red-500 via-orange-500 to-green-500 p-10 rounded-lg shadow-2xl my-10 backdrop-blur-md bg-opacity-80`}
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={first}
            alt="A shopping basket with groceries"
            className="max-w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
        <div className="w-full md:w-1/2 text-left flex flex-col">
          <h1 className="text-4xl font-extrabold text-white mb-3 transition-transform transform hover:translate-x-1">
            Grocery Shopping List
          </h1>
          <h3 className="text-lg text-white mb-5 leading-relaxed">
            Plan your weekly shopping effortlessly with our curated lists and
            personalized suggestions!
          </h3>
          <button className="bg-green-600 text-white w-60 px-8 py-3 rounded-2xl shadow-lg hover:bg-green-800 transition transform hover:scale-105">
            Start Adding Items
          </button>
        </div>
      </section>

      {/* Popular Meals Section */}
      <section
        id="meals"
        ref={mealsRef}
        className={`transition duration-500 ${
          activeSection === "meals" ? "blur-none" : "blur-sm"
        }`}
      >
        <PopularMeals />
      </section>

      {/* Festive Grocery Lists Section */}
      <section
        id="festive"
        ref={festiveRef}
        className={`transition duration-500 ${
          activeSection === "festive" ? "blur-none" : "blur-sm"
        }`}
      >
        <FestiveGroceryLists />
      </section>

      {/* Footer */}
      <div className="mt-16">
        <WhiteFooter />
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import newYear from "../asset/images/newYear.png";
import Christmas from "../asset/images/Christmas.png";
import winter from "../asset/images/winter.png";

function FestiveGroceryList() {
  const [festivals, setFestivals] = useState([]);

  // Fetch festivals from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/festivals")
      .then((response) => setFestivals(response.data))
      .catch((error) => console.error("Error fetching festivals:", error));
  }, []);

  // Map festival names to images
  const festivalImages = {
    "🎉 New Year’s Eve": newYear,
    "🎄 Christmas": Christmas,
    "❄️ Winter Festival": winter,
  };

  return (
    <section className="bg-gradient-to-br from-[#e8f5f9] to-[#fefefe] py-16 px-6 sm:px-12 lg:px-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#2A9D8F] mb-4 tracking-wide">
          Festive Grocery Lists
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Prepare for upcoming occasions with curated grocery shopping lists inspired by Arab festivals and traditions. Celebrate with ease and joy!
        </p>
      </div>

      {/* Festival Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {festivals.map((festival, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Dynamic Image */}
            <div className="relative">
              <img
                src={festivalImages[festival.name] || winter} // Default image
                alt={`${festival.name}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#FF8C42] mb-3">
                {festival.name}
              </h3>
              <p className="text-gray-600 mb-4">{festival.description}</p>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                {festival.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FestiveGroceryList;

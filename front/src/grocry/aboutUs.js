import React from 'react';
import list from '../asset/images/list.png';
import images from '../asset/images/image.jpg';


function AboutUs() {
  return (
    <>
      {/* <NavBar /> */}
      <section className="bg-[#FFF7E7] py-10 px-4 sm:px-8 lg:px-16">
        {/* About Us Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#FF4842] mb-4">About Us</h2>
          <h4 className="text-2xl font-semibold text-[#2A9D8F]">Welcome to Listopia, Your Smart Grocery Companion!</h4>
          <p className="text-[#FF8C42] max-w-3xl mx-auto mt-4 text-lg">
            At Listopia, we believe that grocery shopping should be simple, efficient, and stress-free. 
            Our mission is to transform the way you manage your grocery lists and daily essentials by offering a user-friendly platform designed to meet all your needs.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <div>
            <img
              src={list}
              alt="list"
              className="rounded-2xl shadow-md w-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#2A9D8F] mb-4">Our Vision</h3>
            <p className="text-[#6C757D] text-lg leading-relaxed">
              Whether you're organizing your weekly meals, managing a tight budget, or simply avoiding forgotten items, 
              Listopia is here to simplify your life and help you stay organized.
            </p>
            <h3 className="text-2xl font-semibold text-[#2A9D8F] mb-4 mt-12">Our Story</h3>
            <p className="text-[#6C757D] text-lg leading-relaxed">
              Listopia was created with one simple goal: to make grocery shopping as seamless as possible. 
              It started as a solution for busy families and individuals looking for a better way to plan their shopping 
              and has grown into a powerful platform that’s accessible to everyone.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-[#2A9D8F] mb-6">Why Choose Listopia?</h3>
            <ul className="list-disc ml-5 text-[#6C757D] text-lg space-y-4">
              <li><span className="font-medium text-[#FF4842]">User-Friendly Design:</span> Easy-to-use interface that anyone can navigate.</li>
              <li><span className="font-medium text-[#FF4842]">Smart Tools:</span> Features that help you save time and money while staying organized.</li>
              <li><span className="font-medium text-[#FF4842]">Personalized for You:</span> Tailored recommendations to suit your preferences and needs.</li>
              <li><span className="font-medium text-[#FF4842]">Community-Driven:</span> A space where users can share ideas, tips, and recipes to make shopping even better.</li>
            </ul>
            <h3 className="text-2xl font-semibold text-[#2A9D8F] mb-6 mt-12">Join Us on This Journey</h3>
            <p className="text-[#6C757D] text-lg leading-relaxed">
              Listopia is more than just a tool—it’s a lifestyle upgrade. By choosing us, you’re joining a growing community of shoppers 
              who value convenience, efficiency, and innovation.
            </p>
          </div>
          <div>
            <img
              src={images}
              alt="Our Story"
              className="rounded-2xl shadow-md w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;

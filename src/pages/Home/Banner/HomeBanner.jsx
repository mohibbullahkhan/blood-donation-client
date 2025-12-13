import React from "react";

const HomeBanner = () => {
  return (
    <div className="relative h-[600px] w-full bg-gray-700">
      {/* Background Image/Overlay Mimic (Placeholder for the original image) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder-blood-donation-hero.jpg')",
          opacity: 0.3,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white p-4">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 drop-shadow-lg">
          Join as a Donor
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl font-light text-center max-w-3xl mb-10 drop-shadow-md">
          Blood is the most precious gift that anyone can give to another
          person. Donating blood not only saves the life, but also saves donors'
          lives.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Join as a Donor Button */}
          {/* In a real app, this would use a Link component (e.g., from React Router) */}
          <button
            // Replace with actual navigation logic (e.g., onClick={() => navigate('/register')})
            onClick={() => console.log("Redirect to Registration Page")}
            className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 ease-in-out 
                       bg-red-600 hover:bg-red-700 text-white transform hover:scale-105"
          >
            Join as a Donor
          </button>

          {/* Search Donors Button */}
          {/* In a real app, this would use a Link component (e.g., from React Router) */}
          <button
            // Replace with actual navigation logic (e.g., onClick={() => navigate('/search')})
            onClick={() => console.log("Redirect to Search Page")}
            className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 ease-in-out 
                       bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 text-white transform hover:scale-105"
          >
            Search Donors
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

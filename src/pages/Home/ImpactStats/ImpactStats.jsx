import React from "react";

const ImpactStats = () => {
  const statsData = [
    {
      id: 1,
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", // Heartbeat/Health Icon Path (SVG)
      count: 2578,
      label: "Success Smiles",
    },
    {
      id: 2,
      icon: "M18 7h-2.5c-1.1 0-2 .9-2 2s.9 2 2 2H18v2h-4v2h-2v-2h-2v-2h2v-2h-4V7H6v10h12V7z", // Stethoscope Icon Path (Placeholder, simplified)
      count: 3235,
      label: "Happy Donors",
    },
    {
      id: 3,
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm8 2l-2.09 2.09c-2.83-1.4-5.67-1.4-8.5 0L6 13c-2.76 0-5 2.24-5 5v3h22v-3c0-2.76-2.24-5-5-5z", // Group/Recipient Icon Path (SVG)
      count: 3568,
      label: "Happy Recipients",
    },
    {
      id: 4,
      icon: "M19 12h-2v4h-4v-4H9v4H5v-4H3v6h18v-6h-2zM12 1L8 5h8z", // Building/Award Icon Path (Placeholder, simplified)
      count: 1364,
      label: "Total Awards",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Optional: Section Header if needed, otherwise skip */}
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-800">OUR IMPACT</h2>
          <div className="w-12 h-1 bg-red-600 mx-auto"></div>
        </div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-white border border-gray-100 rounded-lg shadow-sm transition duration-300 hover:shadow-xl hover:border-red-100"
            >
              {/* Icon */}
              <div className="mb-4">
                <svg
                  className="w-10 h-10 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Using a generic SVG structure. You would replace 'd' with actual icon paths if using a library like Heroicons */}
                  <path d={stat.icon} />
                </svg>
              </div>

              {/* Count */}
              <div className="text-4xl md:text-5xl font-extrabold mb-1 text-red-600">
                {stat.count.toLocaleString()}
              </div>

              {/* Label */}
              <p className="text-base text-gray-700 font-medium text-center tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;

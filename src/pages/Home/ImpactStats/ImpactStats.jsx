import React from "react";

import {
  HeartHandshake,
  Users,
  HeartPulse,
  Award,
  Droplet,
} from "lucide-react";

const ImpactStats = () => {
  const statsData = [
    {
      id: 1,
      Icon: HeartHandshake,
      count: 2578,
      label: "Lives Touched",
    },
    {
      id: 2,
      Icon: Users,
      count: 3235,
      label: "Active Donors",
    },
    {
      id: 3,
      Icon: HeartPulse,
      count: 3568,
      label: "Blood Units Collected",
    },
    {
      id: 4,
      Icon: Award,
      count: 1364,
      label: "Campaigns Launched",
    },
  ];

  return (
    <div className="py-10 md:py-14 bg-red-50/70">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Droplet className="w-10 h-10 mx-auto text-red-600 mb-3" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-red-600">Impact</span> So Far
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These numbers reflect the incredible generosity of our community and
            the vital difference every donation makes.
          </p>
        </div>

        {/* Stats Grid  */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center p-6 md:p-10 bg-white rounded-xl shadow-2xl transition duration-500 transform hover:scale-[1.03] hover:shadow-red-300/50 border-t-4 border-red-600"
            >
              {/* Icon Container  */}
              <div className="mb-4 p-3 bg-red-100/70 rounded-full">
                <stat.Icon
                  className="w-10 h-10 text-red-600"
                  aria-hidden="true"
                />
              </div>

              {/* Count  */}
              <div className="text-4xl md:text-6xl font-black mb-2 text-red-700 tracking-tight">
                {stat.count.toLocaleString()}
              </div>

              {/* Label  */}
              <p className="text-base md:text-lg text-gray-800 font-semibold text-center uppercase tracking-wider mt-1">
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

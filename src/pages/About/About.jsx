// import React from "react";
// import {
//   HeartHandshake,
//   Target,
//   Users,
//   Building,
//   MapPin,
//   Clock,
//   Droplet,
//   Globe,
// } from "lucide-react";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 sm:py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* === Header Section === */}
//         <header className="text-center mb-16">
//           <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
//             Our Mission: Bridging the Need for Blood
//           </h1>
//           <p className="mt-4 text-xl text-red-600 font-semibold flex items-center justify-center">
//             <HeartHandshake className="w-6 h-6 mr-2" /> Saving Lives, One
//             Donation at a Time
//           </p>
//           <div className="mt-6 h-1 w-24 bg-red-500 mx-auto rounded-full"></div>
//         </header>

//         {/* === Section 1: Our Core Mission & Vision === */}
//         <section className="bg-white p-8 md:p-12 rounded-2xl shadow-xl mb-16 border-t-8 border-red-700">
//           <div className="md:flex md:space-x-12">
//             <div className="md:w-1/2 mb-8 md:mb-0">
//               <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
//                 <Target className="w-8 h-8 mr-3 text-red-600" /> Our Vision
//               </h2>
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 We envision a world where no life is lost due to the lack of
//                 timely blood transfusions. Our platform was created out of a
//                 deep commitment to connect compassionate donors with urgent
//                 patient needs, making the donation process simple, fast, and
//                 reliable.
//               </p>
//             </div>

//             <div className="md:w-1/2">
//               <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
//                 <Globe className="w-8 h-8 mr-3 text-red-600" /> The Problem We
//                 Solve
//               </h2>
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 Traditional blood donation systems often suffer from delays and
//                 mismatched inventory. We use technology to provide real-time
//                 updates on pending requests, geographical filtering, and instant
//                 notifications, ensuring the right type of blood reaches the
//                 right patient precisely when it's needed.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* === Section 2: How We Work (Our Impact Model) === */}
//         <section className="mb-16">
//           <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
//             How Our Platform Works
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-yellow-500 transition duration-300 hover:shadow-2xl">
//               <Droplet className="w-10 h-10 text-yellow-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-800 mb-3">
//                 Instant Request Creation
//               </h3>
//               <p className="text-gray-600">
//                 Hospitals or verified requesters submit urgent donation needs
//                 instantly. The request includes location, blood type, and
//                 required date.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-blue-500 transition duration-300 hover:shadow-2xl">
//               <MapPin className="w-10 h-10 text-blue-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-800 mb-3">
//                 Location-Based Matching
//               </h3>
//               <p className="text-gray-600">
//                 Our system matches pending requests to eligible donors nearby,
//                 drastically cutting down the response time for critical
//                 situations.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-green-500 transition duration-300 hover:shadow-2xl">
//               <Clock className="w-10 h-10 text-green-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-800 mb-3">
//                 Commitment and Tracking
//               </h3>
//               <p className="text-gray-600">
//                 Donors pledge their commitment, and the request status is
//                 updated in real-time, providing transparency and accountability
//                 to all parties.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* === Section 3: Our Community and Call to Action === */}
//         <section className="bg-red-50 p-10 md:p-16 rounded-2xl shadow-inner">
//           <div className="text-center">
//             <h2 className="text-4xl font-extrabold text-red-700 mb-6 flex items-center justify-center">
//               <Users className="w-8 h-8 mr-3" /> Join Our Lifesaving Community
//             </h2>
//             <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
//               We are more than just a platform; we are a network of
//               heroes—donors, hospitals, and volunteers—united by the goal of
//               making blood accessible. Your involvement, whether through a
//               single donation pledge or continuous volunteering, powers our
//               mission.
//             </p>

//             {/* Statistics/Metrics Placeholder */}
//             <div className="grid grid-cols-3 gap-6 mt-10">
//               <div className="p-4 bg-white rounded-xl shadow-md">
//                 <p className="text-4xl font-extrabold text-red-600">3500+</p>
//                 <p className="text-sm font-semibold text-gray-600 mt-1">
//                   Lives Touched
//                 </p>
//               </div>
//               <div className="p-4 bg-white rounded-xl shadow-md">
//                 <p className="text-4xl font-extrabold text-red-600">95%</p>
//                 <p className="text-sm font-semibold text-gray-600 mt-1">
//                   Request Fulfillment Rate
//                 </p>
//               </div>
//               <div className="p-4 bg-white rounded-xl shadow-md">
//                 <p className="text-4xl font-extrabold text-red-600">12+</p>
//                 <p className="text-sm font-semibold text-gray-600 mt-1">
//                   Districts Covered
//                 </p>
//               </div>
//             </div>

//             <div className="mt-12">
//               <a
//                 href="/register" // Link to your registration/donation page
//                 className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-2xl text-white bg-red-600 hover:bg-red-800 transition duration-300 transform hover:scale-105"
//               >
//                 <HeartHandshake className="w-6 h-6 mr-3" /> Become a Donor Today
//               </a>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from "react";
import {
  HeartHandshake,
  Target,
  Users,
  MapPin,
  Clock,
  Droplet,
  Globe,
} from "lucide-react";

const About = () => {
  // Founder Information
  const founder = {
    name: "Mohibbullah Khan",
    profilePic: "https://mohibbullahkhan.netlify.app/IMG_6993.JPG",
    story:
      "The motivation for this platform stemmed from a personal crisis. Witnessing a loved one struggle to find a matching blood donor during a critical time, and the agonizing wait that followed, illuminated a devastating gap in emergency medical response. Mohibbullah realized that in the age of instant connectivity, the process of finding blood was still tragically slow and fragmented. He created this platform not just as a technology solution, but as a commitment to prevent others from experiencing the same helpless fear.",
    vision:
      "He wanted to turn a moment of personal vulnerability into a universal safety net, ensuring that every person in need, regardless of location or status, has immediate access to a lifesaving donation. He believes technology must serve humanity at its most critical juncture.",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Header and Founder Story Section === */}
        <section className="bg-white p-8 md:p-12 rounded-2xl shadow-xl mb-16 border-t-8 border-red-700">
          <header className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Our Mission: Fuelled by a Founder's Promise
            </h1>
            <p className="mt-4 text-xl text-red-600 font-semibold flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 mr-2" /> Saving Lives, One
              Donation at a Time
            </p>
          </header>

          <div className="md:flex md:space-x-12 items-center">
            <div className="md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
              <img
                src={founder.profilePic}
                alt={`Photo of ${founder.name}`}
                className="w-40 h-40 object-cover rounded-full border-4 border-red-500 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800 mt-4">
                {founder.name}
              </h3>
              <p className="text-md text-red-600 font-medium">
                Founder & Visionary
              </p>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
                <Target className="w-8 h-8 mr-3 text-red-600" /> Why This
                Platform Exists
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {founder.story}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-semibold italic">
                "{founder.vision}"
              </p>
            </div>
          </div>
        </section>

        {/* === Section 2: How We Work (Our Impact Model) === */}
        <section className="mb-16">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
            Bridging the Gap with Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-yellow-500 transition duration-300 hover:shadow-2xl">
              <Droplet className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Instant Request Creation
              </h3>
              <p className="text-gray-600">
                Hospitals or verified requesters submit urgent donation needs
                instantly. The request includes location, blood type, and
                required date for maximum visibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-blue-500 transition duration-300 hover:shadow-2xl">
              <MapPin className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Location-Based Matching
              </h3>
              <p className="text-gray-600">
                Our system matches pending requests to eligible donors nearby
                using geographical filtering, drastically cutting down the
                response time for critical situations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-green-500 transition duration-300 hover:shadow-2xl">
              <Clock className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Commitment and Tracking
              </h3>
              <p className="text-gray-600">
                Donors pledge their commitment, and the request status is
                updated in real-time, providing transparency and accountability
                to requesters and patients.
              </p>
            </div>
          </div>
        </section>

        {/* === Section 3: Our Community and Call to Action === */}
        <section className="bg-red-50 p-10 md:p-16 rounded-2xl shadow-inner">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-red-700 mb-6 flex items-center justify-center">
              <Users className="w-8 h-8 mr-3" /> Join Our Lifesaving Community
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
              We are more than just a platform; we are a network of
              heroes—donors, hospitals, and volunteers—united by the goal of
              making blood accessible. Your involvement, whether through a
              single donation pledge or continuous volunteering, powers our
              mission.
            </p>

            {/* Statistics/Metrics Placeholder */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="p-4 bg-white rounded-xl shadow-md">
                <p className="text-4xl font-extrabold text-red-600">3500+</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  Lives Touched
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-md">
                <p className="text-4xl font-extrabold text-red-600">95%</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  Request Fulfillment Rate
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-md">
                <p className="text-4xl font-extrabold text-red-600">12+</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  Districts Covered
                </p>
              </div>
            </div>

            <div className="mt-12">
              <a
                href="/register" // Link to your registration/donation page
                className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-2xl text-white bg-red-600 hover:bg-red-800 transition duration-300 transform hover:scale-105"
              >
                <HeartHandshake className="w-6 h-6 mr-3" /> Become a Donor Today
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

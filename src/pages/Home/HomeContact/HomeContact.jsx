import React from "react";

const HomeContact = () => {
  return (
    <div className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            GET IN TOUCH
          </h2>
          {/* Prominent Red Line Separator */}
          <div className="w-16 h-1.5 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            We are here to support your journey as a donor. Reach out to our
            dedicated team for assistance or inquiries.
          </p>
        </div>

        {/* Content Grid: Contact Details (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 1. Contact Details & Information (Occupies 1/3 width) */}
          <div className="lg:col-span-1 p-6 bg-white rounded-lg shadow-xl border-t-4 border-red-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Reach Our Team
            </h3>

            <div className="space-y-8">
              {/* Phone Number */}
              <div className="flex items-start">
                {/* Custom Icon Styling */}
                <div className="text-red-600 p-3 rounded-full bg-red-50 mr-4 text-xl">
                  &#9742; {/* Phone Icon */}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Call Us
                  </h4>
                  <a
                    href="tel:+12345678900"
                    className="text-gray-600 text-xl font-medium hover:text-red-600 transition"
                  >
                    +1 234 567 8900
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    Available Mon - Fri, 9am - 5pm
                  </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start">
                {/* Custom Icon Styling */}
                <div className="text-red-600 p-3 rounded-full bg-red-50 mr-4 text-xl">
                  &#9993; {/* Email Icon */}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Email Us
                  </h4>
                  <a
                    href="mailto:support@bloodbank.org"
                    className="text-gray-600 text-xl font-medium hover:text-red-600 transition"
                  >
                    support@bloodbank.org
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Location Address */}
              <div className="flex items-start">
                {/* Custom Icon Styling */}
                <div className="text-red-600 p-3 rounded-full bg-red-50 mr-4 text-xl">
                  &#9974; {/* Location Icon */}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Visit Our Main Center
                  </h4>
                  <p className="text-gray-600 text-lg">
                    123 Donor Lane, City, State 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Contact Form (Occupies 2/3 width) */}
          <div className="lg:col-span-2 p-8 bg-white rounded-lg shadow-xl border-t-4 border-red-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              {/* Name and Email */}
              <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                />
              </div>

              {/* Phone and Subject */}
              <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                />
              </div>

              {/* Message */}
              <textarea
                placeholder="Your Message..."
                rows="7"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition duration-150"
                required
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-[1.005]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;

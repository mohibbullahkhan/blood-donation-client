import React from "react";
// Import modern icons for a professional look
import { Phone, Mail, MapPin, Send, Heart } from "lucide-react";

const HomeContact = () => {
  return (
    <div className="py-8 md:py-16 bg-gray-50/70">
      {" "}
      {/* Slightly muted background */}
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Heart className="w-10 h-10 mx-auto text-red-600 mb-3" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            GET IN <span className="text-red-600">TOUCH</span>
          </h2>
          {/* Enhanced Red Line Separator */}
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your questions are vital. Reach out to our dedicated support team
            for inquiries about donation, eligibility, or collaboration.
          </p>
        </div>

        {/* Content Grid: Contact Details (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* 1. Contact Details & Information (Occupies 2/5 width) */}
          <div className="lg:col-span-2 p-8 bg-white rounded-2xl shadow-2xl border-l-4 border-red-600 self-stretch flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Mail className="w-7 h-7 mr-3 text-red-600" />
                Reach Our Team Directly
              </h3>

              <div className="space-y-10">
                {/* Phone Number */}
                <ContactInfo
                  Icon={Phone}
                  title="Call Us"
                  content="+1 234 567 8900"
                  link="tel:+12345678900"
                  caption="Available Mon - Fri, 9am - 5pm"
                />

                {/* Email Address */}
                <ContactInfo
                  Icon={Mail}
                  title="Email Us"
                  content="support@bloodbank.org"
                  link="mailto:support@bloodbank.org"
                  caption="We aim to respond within 24 hours"
                />

                {/* Location Address */}
                <ContactInfo
                  Icon={MapPin}
                  title="Visit Our Main Center"
                  content="123 Donor Lane, City, State 12345"
                  caption="Appointments recommended for visits"
                  isLink={false}
                />
              </div>
            </div>

            {/* Thematic Footer Accent */}
            <div className="mt-8 pt-4 border-t border-red-100">
              <p className="text-sm text-red-500 font-medium">
                "Every drop counts, and every query matters."
              </p>
            </div>
          </div>

          {/* 2. Contact Form (Occupies 3/5 width) */}
          <div className="lg:col-span-3 p-10 bg-white rounded-2xl shadow-2xl border-r-4 border-red-600">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200 shadow-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200 shadow-sm"
                  required
                />
              </div>

              {/* Phone and Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Your Phone Number (Optional)"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200 shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200 shadow-sm"
                  required
                />
              </div>

              {/* Message */}
              <textarea
                placeholder="Your Message, questions, or feedback..."
                rows="7"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition duration-200 shadow-sm"
                required
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-xl flex items-center justify-center space-x-2 transform hover:scale-[1.01]"
              >
                <Send className="w-5 h-5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for cleaner contact detail rendering
const ContactInfo = ({
  Icon,
  title,
  content,
  link,
  caption,
  isLink = true,
}) => (
  <div className="flex items-start space-x-4">
    {/* Icon Container with Strong Red Theme */}
    <div className="p-3 rounded-full bg-red-100 text-red-600 shadow-md flex-shrink-0">
      <Icon className="w-6 h-6" />
    </div>

    <div>
      <h4 className="font-semibold text-gray-800 text-xl mb-0.5">{title}</h4>
      {isLink ? (
        <a
          href={link}
          className="text-gray-900 text-xl font-medium hover:text-red-600 transition duration-300 border-b border-dashed border-transparent hover:border-red-600"
        >
          {content}
        </a>
      ) : (
        <p className="text-gray-900 text-xl font-medium">{content}</p>
      )}
      <p className="text-gray-500 text-sm mt-1">{caption}</p>
    </div>
  </div>
);

export default HomeContact;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6 md:pt-16 md:pb-8 border-t-4 border-red-600">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          {/* 1. Logo & Mission Statement */}
          <div className="col-span-2 md:col-span-1 pr-8">
            <h3 className="text-3xl font-bold text-red-500 mb-4 tracking-wider">
              BloodBuddies
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Giving the gift of life. Our mission is to connect donors and
              recipients to save lives every day.
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>{" "}
                {/* Placeholder for Facebook Icon */}
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition duration-300"
              >
                <i className="fab fa-twitter"></i>{" "}
                {/* Placeholder for Twitter Icon */}
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition duration-300"
              >
                <i className="fab fa-instagram"></i>{" "}
                {/* Placeholder for Instagram Icon */}
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-red-600/50 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Donor Resources */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-red-600/50 pb-2">
              Donor Hub
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/register"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  Register as Donor
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  Donation Process
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  Find a Center
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-red-500 transition duration-300 text-sm"
                >
                  Before You Donate
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Contact Information */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-red-600/50 pb-2">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="text-red-500 mr-3">&#9742;</span>
                <a
                  href="tel:+12345678900"
                  className="text-gray-400 hover:text-red-500"
                >
                  +8801793748096
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 mr-3">&#9993;</span>
                <a
                  href="mailto:info@lifestream.org"
                  className="text-gray-400 hover:text-red-500"
                >
                  info@bloodbuddies.org
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 mr-1 ">&#9974;</span>
                <p className="text-gray-400">
                  Darial, Bakerganj, Barishal, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Copyright and Bottom Bar --- */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BloodBuddies Center. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

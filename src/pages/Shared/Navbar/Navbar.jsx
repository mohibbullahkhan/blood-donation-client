// import React from "react";
// // Assuming you are using 'react-router-dom' based on the original code structure
// import { Link, NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";

// const Navbar = () => {
//   const { user, logOut } = useAuth();

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {
//         console.log("User logged out successfully");
//       })
//       .catch((error) => {
//         console.error("Logout Error:", error);
//       });
//   };

//   // Define the main navigation links
//   const navLinks = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `font-medium transition duration-200 ${
//               isActive
//                 ? "text-red-600 border-b-2 border-red-600"
//                 : "text-gray-600 hover:text-red-500 hover:bg-transparent"
//             }`
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/request-donation"
//           className={({ isActive }) =>
//             `font-medium transition duration-200 ${
//               isActive
//                 ? "text-red-600 border-b-2 border-red-600"
//                 : "text-gray-600 hover:text-red-500 hover:bg-transparent"
//             }`
//           }
//         >
//           Search Donor
//         </NavLink>
//       </li>

//       <li>
//         <NavLink
//           to="/donation-requests"
//           className={({ isActive }) =>
//             `font-medium transition duration-200 ${
//               isActive
//                 ? "text-red-600 border-b-2 border-red-600"
//                 : "text-gray-600 hover:text-red-500 hover:bg-transparent"
//             }`
//           }
//         >
//           Blood Donation requests
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `font-medium transition duration-200 ${
//               isActive
//                 ? "text-red-600 border-b-2 border-red-600"
//                 : "text-gray-600 hover:text-red-500 hover:bg-transparent"
//             }`
//           }
//         >
//           About
//         </NavLink>
//       </li>
//       {user && (
//         <>
//           <li>
//             <NavLink
//               to="/support-us"
//               className={({ isActive }) =>
//                 `font-medium transition duration-200 ${
//                   isActive
//                     ? "text-red-600 border-b-2 border-red-600"
//                     : "text-gray-600 hover:text-red-500 hover:bg-transparent"
//                 }`
//               }
//             >
//               Support Us
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `font-medium transition duration-200 ${
//                   isActive
//                     ? "text-red-600 border-b-2 border-red-600"
//                     : "text-gray-600 hover:text-red-500 hover:bg-transparent"
//                 }`
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>
//         </>
//       )}
//     </>
//   );

//   return (
//     <div className="shadow-lg bg-white sticky top-0 z-50">
//       <div className="navbar container mx-auto px-4 py-2">
//         {/* Navbar Start (Logo and Mobile Dropdown) */}
//         <div className="navbar-start">
//           {/* Mobile Dropdown Menu (DaisyUI) */}
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               {/* Hamburger Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-gray-700"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-white border border-gray-100 rounded-box z-10 mt-3 w-52 p-2 shadow-xl"
//             >
//               {navLinks}
//             </ul>
//           </div>

//           {/* Logo */}
//           <Link
//             to="/"
//             className="text-3xl font-extrabold text-gray-800 tracking-wider"
//           >
//             <span className="text-red-600">Blood</span>Buddies
//           </Link>
//         </div>

//         {/* Navbar Center (Desktop Menu) */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal space-x-2 px-1">{navLinks}</ul>
//         </div>

//         {/* Navbar End (Auth and Action Buttons) */}
//         <div className="navbar-end space-x-2">
//           {/* Primary Action Button: Be a Donor */}
//           <Link
//             className="btn hidden sm:flex bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700 font-semibold shadow-md transition duration-300"
//             to="/register" // Updated to a more appropriate link
//           >
//             Be a Donor
//           </Link>

//           {/* Auth Display */}
//           {user ? (
//             <div className="dropdown dropdown-end">
//               {/* Profile Picture / Dropdown Trigger */}
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="w-10 rounded-full border-2 border-red-500">
//                   <img
//                     alt="User Avatar"
//                     src={
//                       user.photoURL ||
//                       "https://via.placeholder.com/150/ef4444/ffffff?text=U"
//                     } // Placeholder if no photo
//                   />
//                 </div>
//               </div>
//               {/* User Dropdown Menu */}
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-white border border-gray-100 rounded-box z-10 mt-3 w-52 p-2 shadow-xl"
//               >
//                 <li className="p-2 text-gray-800 font-semibold border-b mb-1">
//                   {user.displayName || "Donor"}
//                 </li>
//                 {/* <li>
//                   <Link to="/profile">Profile</Link>
//                 </li> */}
//                 <li>
//                   <Link to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li>
//                   <a
//                     onClick={handleLogOut}
//                     className="text-red-600 hover:bg-red-50"
//                   >
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             // Login Button for unauthenticated users
//             <Link
//               className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-none font-semibold transition duration-300"
//               to="/login"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from "react";
import { Link, NavLink } from "react-router";
import { Moon, Sun } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();

  /* ================= THEME TOGGLE ================= */
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  /* ================================================= */

  const handleLogOut = () => {
    logOut().catch((error) => console.error("Logout Error:", error));
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition duration-200 px-2 py-1 ${
      isActive
        ? "text-red-600 border-b-2 border-red-600"
        : "text-base-content hover:text-red-500"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/request-donation" className={navLinkClass}>
          Search Donor
        </NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests" className={navLinkClass}>
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/support-us" className={navLinkClass}>
              Support Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4">
        {/* ================= LEFT ================= */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-base-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow-xl"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold tracking-wide">
            <span className="text-red-600">Blood</span>
            <span className="text-base-content">Buddies</span>
          </Link>
        </div>

        {/* ================= CENTER ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end gap-2">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Be a Donor */}
          <Link
            to="/register"
            className="btn hidden sm:flex bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Be a Donor
          </Link>

          {/* AUTH */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-red-500">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt="User"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow-xl"
              >
                <li className="font-semibold text-base-content border-b">
                  {user.displayName || "Donor"}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn bg-base-200 hover:bg-base-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

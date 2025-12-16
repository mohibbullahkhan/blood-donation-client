import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router"; // Changed 'react-router' to 'react-router-dom'
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const bloodLocation = useLoaderData();

  // Data processing for districts and upazilas
  const districtDuplicate = bloodLocation.map((c) => c.name);
  const district = [...new Set(districtDuplicate)];
  const selectedDistrict = useWatch({ control, name: "district" });

  const UpozelaByDistrict = (districtName) => {
    if (!districtName) return [];

    const selectedDistrictData = bloodLocation.find(
      (c) => c.name === districtName
    );
    // Assuming upazilas is an array of strings
    return selectedDistrictData ? selectedDistrictData.upazilas : [];
  };

  const handleRegistration = (data) => {
    const profileImg = data.avatar[0];

    // 1. Register User (Firebase)
    registerUser(data.email, data.password)
      .then((result) => {
        // 2. Upload Image (ImgBB)
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const photoURL = res.data.data.url;

            // 3. Create User in Database (MongoDB/Backend)
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
              bloodGroup: data.bloodGroup,
              district: data.district,
              upazila: data.upazila,
              // Add initial status or role if needed, e.g., role: 'donor', status: 'active'
            };

            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("user created in the database");
              }
            });

            // 4. Update User Profile (Firebase)
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };

            updateUserProfile(userProfile)
              .then(() => {
                console.log("user profile updated done");
                // Navigate after successful registration and profile update
                navigate(location.state?.from || "/");
              })
              .catch((error) => console.log("Profile Update Error:", error));
          })
          .catch((error) => console.log("Image Upload Error:", error));
      })
      .catch((error) => {
        console.log("Registration Error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-red-100">
        {/* Header Section */}
        <div className="p-8 bg-red-600 text-white">
          <h3 className="text-3xl font-extrabold text-center tracking-tight">
            Join Blood Buddies
          </h3>
          <p className="text-center mt-1 text-red-100">
            Register to become a life-saver!
          </p>
        </div>

        {/* Form Section */}
        <form
          className="p-8 space-y-4"
          onSubmit={handleSubmit(handleRegistration)}
        >
          {/* Email and Name fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
              placeholder="Your Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">Name is required.</p>
            )}
          </div>

          {/* Avatar field (Styling for file input is tricky; using default for simplicity) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo (Avatar)
            </label>
            <input
              type="file"
              {...register("avatar", { required: true })}
              className="w-full p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 rounded-lg border border-gray-300 transition duration-150"
            />
            {errors.avatar && (
              <p className="text-red-500 text-xs mt-1">Avatar is required.</p>
            )}
          </div>

          {/* Blood Group and Location (2 columns on medium/large screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                {...register("bloodGroup", { required: true })}
                defaultValue=""
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 appearance-none transition duration-150"
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs mt-1">
                  Blood group is required.
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <select
                {...register("district", { required: true })}
                defaultValue=""
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 appearance-none transition duration-150"
              >
                <option value="" disabled>
                  Pick a District
                </option>
                {district.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-xs mt-1">
                  District is required.
                </p>
              )}
            </div>
          </div>

          {/* Upazila (Occupies full width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upazila
            </label>
            <select
              {...register("upazila", { required: true })}
              defaultValue=""
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 appearance-none transition duration-150"
              disabled={!selectedDistrict} // Disable if no district is selected
            >
              <option value="" disabled>
                {selectedDistrict
                  ? "Pick an Upazila"
                  : "Select a District first"}
              </option>
              {UpozelaByDistrict(selectedDistrict).map((upazila, i) => (
                <option key={i} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-red-500 text-xs mt-1">Upazila is required.</p>
            )}
          </div>

          {/* Password fields */}
          <div className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                    message:
                      "Must contain uppercase, lowercase, number, and special character",
                  },
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                placeholder="Secure Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message ||
                    "Password is required (min 6 chars)."}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message ||
                    "Confirm password is required."}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 text-white font-semibold bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Register to Donate
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-red-600 font-medium hover:text-red-700 underline transition duration-150"
              to="/login"
            >
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

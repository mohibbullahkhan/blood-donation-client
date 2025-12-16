import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-red-100">
        <div className="p-8 bg-red-600 text-white">
          <h3 className="text-3xl font-extrabold text-center tracking-tight">
            Welcome Back, Blood Buddies
          </h3>
          <p className="text-center mt-1 text-red-100">
            Sign in to manage your donations.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="p-8 space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
              placeholder="Enter your Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required.</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
              placeholder="Your Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs mt-1">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-red-600 hover:text-red-700 transition duration-150"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 text-white font-semibold bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 pt-4">
            New to Blood Buddies?{" "}
            <Link
              state={location.state}
              className="text-red-600 font-medium hover:text-red-700 underline transition duration-150"
              to="/register"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

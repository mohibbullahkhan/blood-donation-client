import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
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
  const districtDuplicate = bloodLocation.map((c) => c.name);
  const district = [...new Set(districtDuplicate)];
  const selectedDistrict = useWatch({ control, name: "district" });

  const UpozelaByDistrict = (districtName) => {
    if (!districtName) return [];

    const selectedDistrictData = bloodLocation.find(
      (c) => c.name === districtName
    );
    return selectedDistrictData ? selectedDistrictData.upazilas : [];
  };

  const handleRegistration = (data) => {
    const profileImg = data.avatar[0];
    registerUser(data.email, data.password)
      .then((result) => {
        // store the image and get the photo URL
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to Blood Buddies</h3>
      <p className="text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}
          {/* name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}
          {/* Avatar field */}
          <label className="label">Your Avatar</label>
          <input
            type="file"
            {...register("avatar", { required: true })}
            className="file-input"
            placeholder="Your Avatar"
          />
          {errors.avatar?.type === "required" && (
            <p className="text-red-500">Avatar is required.</p>
          )}
          {/* Blood Group */}
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            defaultValue="Select blood group"
            className="select"
          >
            <option disabled={true}>Select blood group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.bloodGroup?.type === "required" && (
            <p className="text-red-500">Blood group is required.</p>
          )}
          {/* District */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">District</legend>
            <select
              {...register("district", { required: true })}
              defaultValue="Pick a region"
              className="select"
            >
              <option disabled={true}>Pick a region</option>
              {district.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.district?.type === "required" && (
            <p className="text-red-500">District is required.</p>
          )}
          {/* Upazila */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Upazila</legend>
            <select
              {...register("upazila", { required: true })}
              defaultValue="Pick a Upazila"
              className="select"
            >
              <option disabled={true}>Pick a Upazila</option>
              {UpozelaByDistrict(selectedDistrict).map((upazila, i) => (
                <option key={i} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.upazila?.type === "required" && (
            <p className="text-red-500">Upazila is required.</p>
          )}
          {/* password */}
          <label className="label">Password</label>
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
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {/* confirm password */}
          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword?.type === "required" && (
            <p className="text-red-500">Confirm password is required</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link
            state={location.state}
            className="text-blue-400 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

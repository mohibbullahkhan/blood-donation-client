// import React, { useState, useCallback } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import useAuth from "../../../hooks/useAuth";
// import { useLoaderData, useNavigate } from "react-router"; // Changed Link to useNavigate for clean import
// import Swal from "sweetalert2";
// import { PlusCircle, Loader2, HeartHandshake, MapPin } from "lucide-react";

// // --- Configuration ---
// const BASE_API_URL = "https://blood-donation-server-alpha.vercel.app";
// const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
// // ---------------------

// const CreateDonationRequest = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const bloodLocation = useLoaderData();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 1. Initialize useForm hook
//   const {
//     register,
//     control, // Necessary for useWatch
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       requesterName: user?.displayName || "",
//       requesterEmail: user?.email || "",
//       donationDate: new Date().toISOString().substring(0, 10),
//     },
//   });

//   // 2. Use useWatch after control is defined
//   const districtDuplicate = bloodLocation.map((c) => c.name);
//   const recipientDistrict = [...new Set(districtDuplicate)];
//   const selectedDistrict = useWatch({
//     control,
//     // Ensure this matches the name attribute of the District SelectField
//     name: "recipientDistrict",
//   });
//   const UpozelaByDistrict = (districtName) => {
//     if (!districtName) return [];

//     const selectedDistrictData = bloodLocation.find(
//       (c) => c.name === districtName
//     );
//     return selectedDistrictData ? selectedDistrictData.upazilas : [];
//   };

//   // 3. Define the helper function ONCE using useCallback
//   //   const UpozelaByDistrict = useCallback(
//   //     (districtName) => {
//   //       if (!districtName) return [];

//   //       const selectedDistrictData = bloodLocation.find(
//   //         (c) => c.name === districtName
//   //       );
//   //       // Returns an array of upazila objects: [{ name: '...' }, ...]
//   //       return selectedDistrictData ? selectedDistrictData.upazilas : [];
//   //     },
//   //     [bloodLocation]
//   //   );

//   // Derive unique districts list (used for the District dropdown)
//   //   const districtDuplicate = bloodLocation.map((c) => c.name);
//   //   const districtOptions = [...new Set(districtDuplicate)];

//   // --- Submission Handler ---
//   const onSubmit = async (data) => {
//     if (user?.status === "blocked") {
//       Swal.fire({
//         icon: "warning",
//         title: "Access Restricted",
//         text: "Your account is currently blocked and cannot create new donation requests.",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     let swalInstance;

//     Swal.fire({
//       title: "Submitting Request...",
//       icon: "info",
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       didOpen: () => {
//         Swal.showLoading();
//         swalInstance = Swal.getPopup();
//       },
//       customClass: { title: "text-red-600" },
//     });

//     const submissionPayload = {
//       ...data,
//       requesterName: user.displayName,
//       requesterEmail: user.email,
//     };

//     try {
//       const response = await fetch(`${BASE_API_URL}/donation-requests`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json" /* Add Auth Header Here */,
//         },
//         body: JSON.stringify(submissionPayload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(
//           errorData.message ||
//             `Failed to create request with status ${response.status}.`
//         );
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Success! 🩸",
//         html: `Your request for <b>${data.bloodGroup}</b> blood for <b>${data.recipientName}</b> has been successfully posted.`,
//         timer: 3000,
//         showConfirmButton: false,
//         toast: true,
//         position: "top-end",
//         customClass: {
//           popup: "bg-green-50 shadow-2xl border-l-4 border-green-600",
//         },
//       });

//       navigate("/dashboard/my-donation-requests");
//     } catch (error) {
//       console.error("Donation request error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: error.message,
//         confirmButtonText: "Close",
//       });
//     } finally {
//       setIsSubmitting(false);
//       if (swalInstance && Swal.isVisible()) {
//         Swal.close(swalInstance);
//       }
//     }
//   };

//   // Reusable Input Field Component
//   const InputField = ({
//     label,
//     name,
//     type = "text",
//     register,
//     errors,
//     readOnly = false,
//     options = {},
//   }) => {
//     const baseClasses =
//       "w-full px-4 py-3 border rounded-lg transition duration-300 text-base shadow-sm";
//     const fieldClasses = readOnly
//       ? `${baseClasses} bg-gray-100 text-gray-600 border-gray-200 cursor-not-allowed`
//       : `${baseClasses} bg-white text-gray-900 border-red-300 focus:ring-red-500 focus:border-red-500`;

//     return (
//       <div className="mb-6">
//         <label
//           className="block text-sm font-semibold text-gray-700 mb-2"
//           htmlFor={name}
//         >
//           {label} {options.required && <span className="text-red-500">*</span>}
//         </label>
//         {type === "textarea" ? (
//           <textarea
//             id={name}
//             {...register(name, options)}
//             rows="4"
//             readOnly={readOnly}
//             className={fieldClasses}
//             disabled={isSubmitting}
//           ></textarea>
//         ) : (
//           <input
//             type={type}
//             id={name}
//             {...register(name, options)}
//             readOnly={readOnly}
//             className={fieldClasses}
//             disabled={isSubmitting}
//             min={
//               type === "date"
//                 ? new Date().toISOString().substring(0, 10)
//                 : undefined
//             }
//           />
//         )}
//         {errors[name] && (
//           <p className="mt-1 text-sm text-red-600 font-medium">
//             This field is required.
//           </p>
//         )}
//         {(errors[name]?.type === "min" ||
//           errors[name]?.type === "minLength") && (
//           <p className="mt-1 text-sm text-red-600 font-medium">
//             Validation failed.
//           </p>
//         )}
//       </div>
//     );
//   };

//   // Reusable Select Field Component
//   const SelectField = ({ label, name, register, errors, children }) => (
//     <div className="mb-6">
//       <label
//         className="block text-sm font-semibold text-gray-700 mb-2"
//         htmlFor={name}
//       >
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <select
//         id={name}
//         {...register(name, { required: true })}
//         className="w-full px-4 py-3 border rounded-lg bg-white text-gray-900 border-red-300 focus:ring-red-500 focus:border-red-500 shadow-sm transition duration-300"
//         disabled={isSubmitting}
//       >
//         <option value="">Select an option</option>
//         {children}
//       </select>
//       {errors[name] && (
//         <p className="mt-1 text-sm text-red-600 font-medium">
//           Please select an option.
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-2xl rounded-2xl border-t-4 border-red-600">
//       <header className="pb-6 mb-8 border-b-2 border-red-100">
//         <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
//           <PlusCircle className="mr-3 text-red-600" size={30} />
//           <span className="tracking-tight">Create New Donation Request</span>
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Fill out the details below to request blood for a recipient.
//         </p>
//       </header>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
//           <div className="md:col-span-2">
//             <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
//               <HeartHandshake className="mr-2" size={20} /> Requester Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//               <InputField
//                 label="Requester Name"
//                 name="requesterName"
//                 register={register}
//                 errors={errors}
//                 readOnly={true}
//               />
//               <InputField
//                 label="Requester Email"
//                 name="requesterEmail"
//                 register={register}
//                 errors={errors}
//                 readOnly={true}
//               />
//             </div>
//             <hr className="my-6 border-red-50" />
//           </div>

//           <div className="md:col-span-2">
//             <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
//               <MapPin className="mr-2" size={20} /> Recipient & Location
//             </h2>
//           </div>

//           <InputField
//             label="Recipient Name"
//             name="recipientName"
//             register={register}
//             errors={errors}
//             options={{ required: true }}
//           />

//           <SelectField
//             label="Required Blood Group"
//             name="bloodGroup"
//             register={register}
//             errors={errors}
//           >
//             {BLOOD_GROUPS.map((group) => (
//               <option key={group} value={group}>
//                 {group}
//               </option>
//             ))}
//           </SelectField>

//           <SelectField
//             label="Recipient District"
//             name="recipientDistrict" // Register name changed to match useWatch
//             register={register}
//             errors={errors}
//           >
//             {recipientDistrict.map((d, i) => (
//               <option key={i} value={d}>
//                 {d}
//               </option>
//             ))}
//           </SelectField>

//           <SelectField
//             label="Recipient Upazila"
//             name="recipientUpazila"
//             register={register}
//             errors={errors}
//           >
//             {/* CORRECTED FIX: Map the array of upazila objects to display strings */}
//             {UpozelaByDistrict(selectedDistrict).map((upazila, i) => (
//               <option key={i} value={upazila.name}>
//                 {upazila.name}
//               </option>
//             ))}
//           </SelectField>

//           <InputField
//             label="Hospital Name"
//             name="hospitalName"
//             register={register}
//             errors={errors}
//             options={{ required: true }}
//           />
//           <InputField
//             label="Full Address Line (Street, Road, Area)"
//             name="fullAddressLine"
//             register={register}
//             errors={errors}
//             options={{ required: true }}
//           />

//           <InputField
//             label="Donation Date"
//             name="donationDate"
//             type="date"
//             register={register}
//             errors={errors}
//             options={{
//               required: true,
//               min: new Date().toISOString().substring(0, 10),
//             }}
//           />
//           <InputField
//             label="Donation Time"
//             name="donationTime"
//             type="time"
//             register={register}
//             errors={errors}
//             options={{ required: true }}
//           />

//           <div className="md:col-span-2">
//             <InputField
//               label="Request Message (Why is the blood needed?)"
//               name="requestMessage"
//               type="textarea"
//               register={register}
//               errors={errors}
//               options={{ required: true, minLength: 20 }}
//             />
//           </div>
//         </div>

//         <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
//           <button
//             type="submit"
//             className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center"
//             disabled={isSubmitting || user?.status === "blocked"}
//           >
//             {isSubmitting ? (
//               <Loader2 className="animate-spin mr-2" size={20} />
//             ) : (
//               <PlusCircle className="mr-2" size={20} />
//             )}
//             {isSubmitting ? "Submitting..." : "Request Blood Donation"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateDonationRequest;

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { PlusCircle, Loader2, HeartHandshake, MapPin } from "lucide-react";

// --- Configuration ---
const BASE_API_URL = "https://blood-donation-server-alpha.vercel.app";
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
// ---------------------

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bloodLocation = useLoaderData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Initialize useForm hook
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      requesterName: user?.displayName || "",
      requesterEmail: user?.email || "",
      donationDate: new Date().toISOString().substring(0, 10),
    },
  });

  // 2. Extract unique districts
  const districtDuplicate = bloodLocation.map((c) => c.name);
  const recipientDistrict = [...new Set(districtDuplicate)];

  // 3. Watch the selected district
  const selectedDistrict = useWatch({
    control,
    name: "recipientDistrict",
  });

  // 4. Function to get upazilas by district
  const UpozelaByDistrict = (districtName) => {
    if (!districtName) return [];

    const selectedDistrictData = bloodLocation.find(
      (c) => c.name === districtName
    );

    // Console logs for debugging (remove after fixing)
    console.log("Selected District:", districtName);
    console.log("Found District Data:", selectedDistrictData);
    console.log(
      "Upazilas:",
      selectedDistrictData ? selectedDistrictData.upazilas : []
    );

    return selectedDistrictData ? selectedDistrictData.upazilas : [];
  };

  // --- Submission Handler ---
  const onSubmit = async (data) => {
    if (user?.status === "blocked") {
      Swal.fire({
        icon: "warning",
        title: "Access Restricted",
        text: "Your account is currently blocked and cannot create new donation requests.",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsSubmitting(true);
    let swalInstance;

    Swal.fire({
      title: "Submitting Request...",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        swalInstance = Swal.getPopup();
      },
      customClass: { title: "text-red-600" },
    });

    const submissionPayload = {
      ...data,
      requesterName: user.displayName,
      requesterEmail: user.email,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/donation-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to create request with status ${response.status}.`
        );
      }

      Swal.fire({
        icon: "success",
        title: "Success! 🩸",
        html: `Your request for <b>${data.bloodGroup}</b> blood for <b>${data.recipientName}</b> has been successfully posted.`,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
        customClass: {
          popup: "bg-green-50 shadow-2xl border-l-4 border-green-600",
        },
      });

      navigate("/dashboard/my-donation-requests");
    } catch (error) {
      console.error("Donation request error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
        confirmButtonText: "Close",
      });
    } finally {
      setIsSubmitting(false);
      if (swalInstance && Swal.isVisible()) {
        Swal.close(swalInstance);
      }
    }
  };

  // Reusable Input Field Component
  const InputField = ({
    label,
    name,
    type = "text",
    register,
    errors,
    readOnly = false,
    options = {},
  }) => {
    const baseClasses =
      "w-full px-4 py-3 border rounded-lg transition duration-300 text-base shadow-sm";
    const fieldClasses = readOnly
      ? `${baseClasses} bg-gray-100 text-gray-600 border-gray-200 cursor-not-allowed`
      : `${baseClasses} bg-white text-gray-900 border-red-300 focus:ring-red-500 focus:border-red-500`;

    return (
      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor={name}
        >
          {label} {options.required && <span className="text-red-500">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            id={name}
            {...register(name, options)}
            rows="4"
            readOnly={readOnly}
            className={fieldClasses}
            disabled={isSubmitting}
          ></textarea>
        ) : (
          <input
            type={type}
            id={name}
            {...register(name, options)}
            readOnly={readOnly}
            className={fieldClasses}
            disabled={isSubmitting}
            min={
              type === "date"
                ? new Date().toISOString().substring(0, 10)
                : undefined
            }
          />
        )}
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600 font-medium">
            This field is required.
          </p>
        )}
        {(errors[name]?.type === "min" ||
          errors[name]?.type === "minLength") && (
          <p className="mt-1 text-sm text-red-600 font-medium">
            Validation failed.
          </p>
        )}
      </div>
    );
  };

  // Reusable Select Field Component
  const SelectField = ({ label, name, register, errors, children }) => (
    <div className="mb-6">
      <label
        className="block text-sm font-semibold text-gray-700 mb-2"
        htmlFor={name}
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={name}
        {...register(name, { required: true })}
        className="w-full px-4 py-3 border rounded-lg bg-white text-gray-900 border-red-300 focus:ring-red-500 focus:border-red-500 shadow-sm transition duration-300"
        disabled={isSubmitting}
      >
        <option value="">Select an option</option>
        {children}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 font-medium">
          Please select an option.
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-2xl rounded-2xl border-t-4 border-red-600">
      <header className="pb-6 mb-8 border-b-2 border-red-100">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <PlusCircle className="mr-3 text-red-600" size={30} />
          <span className="tracking-tight">Create New Donation Request</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Fill out the details below to request blood for a recipient.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <HeartHandshake className="mr-2" size={20} /> Requester Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InputField
                label="Requester Name"
                name="requesterName"
                register={register}
                errors={errors}
                readOnly={true}
              />
              <InputField
                label="Requester Email"
                name="requesterEmail"
                register={register}
                errors={errors}
                readOnly={true}
              />
            </div>
            <hr className="my-6 border-red-50" />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} /> Recipient & Location
            </h2>
          </div>

          <InputField
            label="Recipient Name"
            name="recipientName"
            register={register}
            errors={errors}
            options={{ required: true }}
          />

          <SelectField
            label="Required Blood Group"
            name="bloodGroup"
            register={register}
            errors={errors}
          >
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Recipient District"
            name="recipientDistrict"
            register={register}
            errors={errors}
          >
            {recipientDistrict.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Recipient Upazila"
            name="recipientUpazila"
            register={register}
            errors={errors}
          >
            {/* FIXED: Handle both string and object formats */}
            {selectedDistrict &&
            UpozelaByDistrict(selectedDistrict).length > 0 ? (
              UpozelaByDistrict(selectedDistrict).map((upazila, i) => {
                // Check if upazila is a string or object
                const upazilaName =
                  typeof upazila === "string" ? upazila : upazila.name;
                const upazilaValue =
                  typeof upazila === "string" ? upazila : upazila.name;

                return (
                  <option key={i} value={upazilaValue}>
                    {upazilaName}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                {selectedDistrict
                  ? "No upazilas available"
                  : "Please select a district first"}
              </option>
            )}
          </SelectField>

          <InputField
            label="Hospital Name"
            name="hospitalName"
            register={register}
            errors={errors}
            options={{ required: true }}
          />
          <InputField
            label="Full Address Line (Street, Road, Area)"
            name="fullAddressLine"
            register={register}
            errors={errors}
            options={{ required: true }}
          />

          <InputField
            label="Donation Date"
            name="donationDate"
            type="date"
            register={register}
            errors={errors}
            options={{
              required: true,
              min: new Date().toISOString().substring(0, 10),
            }}
          />
          <InputField
            label="Donation Time"
            name="donationTime"
            type="time"
            register={register}
            errors={errors}
            options={{ required: true }}
          />

          <div className="md:col-span-2">
            <InputField
              label="Request Message (Why is the blood needed?)"
              name="requestMessage"
              type="textarea"
              register={register}
              errors={errors}
              options={{ required: true, minLength: 20 }}
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center"
            disabled={isSubmitting || user?.status === "blocked"}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              <PlusCircle className="mr-2" size={20} />
            )}
            {isSubmitting ? "Submitting..." : "Request Blood Donation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;

import React, { useState, useEffect, useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  User,
  Edit,
  Save,
  X,
  Loader2,
  AlertTriangle,
  ServerCrash,
  CheckCircle,
  MapPin,
  GitCommit,
  UserCheck,
} from "lucide-react";
import Swal from "sweetalert2";

// --- Configuration ---
// FIX 1: Use the absolute URL for reliable API communication
const BASE_API_URL = "http://localhost:3000";
// ---------------------

/**
 * A reusable component to render a single profile field.
 * Handles read-only state and input changes.
 */
const InputField = ({
  label,
  name,
  value,
  isAlwaysReadOnly = false,
  isEditing,
  onChange,
  isDisabled,
}) => {
  const isReadOnly = isAlwaysReadOnly || !isEditing;

  const getInputClasses = () => {
    const baseClasses = `w-full px-4 py-3 border rounded-lg transition duration-300 text-base`;
    if (isReadOnly) {
      return `${baseClasses} bg-gray-50 text-gray-600 border-gray-200 cursor-default`;
    }
    // Editable state
    return `${baseClasses} bg-white text-gray-900 border-red-400 focus:ring-red-500 focus:border-red-500 shadow-inner`;
  };

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-semibold text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value || ""}
        // FIX 2: Ensure onChange is always passed to the controlled component,
        // but it only updates state if not readOnly. The readOnly prop handles
        // preventing user input when not in edit mode.
        onChange={onChange}
        readOnly={isReadOnly}
        disabled={isDisabled}
        className={getInputClasses()}
      />
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  // 1. STATE MANAGEMENT
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // --- HANDLERS ---
  // FIX 3: Confirmed correct functional state update for input fields
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      // Only spread if prevData exists to avoid runtime error
      ...(prevData || {}),
      [name]: value,
    }));
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    // Revert to original data upon cancel
    setFormData(originalData);
    setIsEditing(false);
  };

  // 2. DATA FETCHING: Load profile data on component mount (memoized)
  const loadProfile = useCallback(async () => {
    if (!userEmail) {
      setIsLoading(false);
      setError("Authentication is required to view the profile.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_API_URL}/users/profile/${userEmail}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed with status ${response.status}`
        );
      }

      const data = await response.json();
      setFormData(data);
      setOriginalData(data); // Set both on successful fetch
    } catch (err) {
      setError(
        err.message ||
          "Could not load profile. Check server connection or CORS setup."
      );
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Handler for the Save button (API call to PATCH endpoint)
  const handleSaveClick = async () => {
    setIsSaving(true);
    let swalInstance;

    // SweetAlert: Show saving/loading alert (No auto-close)
    Swal.fire({
      title: "Processing Update...",
      text: "Please wait while your data is being updated on the server.",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      customClass: {
        popup: "shadow-2xl",
        title: "text-red-600",
      },
      didOpen: () => {
        Swal.showLoading();
        swalInstance = Swal.getPopup();
      },
    });

    try {
      const updatePayload = {
        email: userEmail,
        // Only send potentially changed fields
        displayName: formData.displayName,
        photoURL: formData.photoURL,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
      };

      const response = await fetch(`${BASE_API_URL}/users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setFormData(updatedUser);
        setOriginalData(updatedUser);
        setIsEditing(false);

        // SweetAlert: Success (Stays for 2.5s) - BETTER UX
        Swal.fire({
          title: "Success!",
          text: "Your profile has been updated.",
          icon: "success",
          timer: 2500, // Display for 2.5 seconds
          showConfirmButton: false,
          customClass: {
            title: "text-green-600",
            icon: "border-green-600",
          },
        });
      } else {
        const errorData = await response.json().catch(() => ({}));

        // SweetAlert: Failure (Stays until user clicks OK) - BETTER UX
        Swal.fire({
          title: "Update Failed!",
          text:
            errorData.message ||
            `Server responded with status ${response.status}. Changes reverted.`,
          icon: "error",
          confirmButtonText: "Dismiss",
          customClass: {
            title: "text-red-700",
          },
        });

        // Revert form data to original state on failure
        setFormData(originalData);
        setIsEditing(false);
      }
    } catch (networkError) {
      console.error("Network error saving profile:", networkError);

      // SweetAlert: Network Failure (Stays until user clicks OK)
      Swal.fire({
        title: "Connection Error!",
        text: "Could not connect to the server. Check your internet connection.",
        icon: "warning",
        confirmButtonText: "Dismiss",
        customClass: {
          title: "text-yellow-700",
        },
      });

      // Revert form data to original state on failure
      setFormData(originalData);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
      // Ensure the *loading* pop-up is closed, but not the final success/error one
      if (swalInstance && Swal.isVisible()) {
        Swal.close(swalInstance);
      }
    }
  };

  // 3. RENDER LOGIC for Loading and Error States
  if (isLoading) {
    return (
      <div className="flex justify-center items-center max-w-4xl mx-auto mt-20 p-8 text-center text-xl text-red-600 bg-red-50 rounded-xl shadow-lg">
        <Loader2 className="animate-spin mr-3" size={28} />
        <span className="font-medium">Loading profile data...</span>
      </div>
    );
  }

  if (error || !userEmail) {
    return (
      <div className="max-w-4xl mx-auto mt-20 p-8 text-center text-red-800 bg-red-100 border border-red-400 rounded-xl flex flex-col items-center justify-center shadow-lg">
        <AlertTriangle className="text-red-600 mb-3" size={32} />
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-lg">{error || "User not logged in."}</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="max-w-4xl mx-auto mt-20 p-8 text-center text-gray-600 bg-white border border-gray-200 rounded-xl shadow-lg">
        <UserCheck className="text-gray-400 mb-3" size={32} />
        <p className="text-lg">
          Profile data missing. Please complete initial registration.
        </p>
      </div>
    );
  }

  // --- 4. PROFILE RENDERING (Tailwind CSS - Enhanced UI) ---
  return (
    <div className="max-w-6xl mx-auto mt-8 p-10 bg-white shadow-3xl rounded-2xl border-t-4 border-red-600">
      {/* Header and Buttons */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-10 border-b-2 border-red-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0 flex items-center">
          <User className="mr-4 text-red-600" size={36} />
          <span className="tracking-tight">
            {formData.displayName}'s Profile
          </span>
        </h1>

        {/* Action Buttons */}
        <div className="mt-4 md:mt-0">
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSaveClick}
                className="px-7 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                  <Save className="mr-2" size={20} />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancelClick}
                className="px-7 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-300 transition duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center"
                disabled={isSaving}
              >
                <X className="mr-2" size={20} /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-7 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 flex items-center"
            >
              <Edit className="mr-2" size={20} /> Edit Profile
            </button>
          )}
        </div>
      </header>

      {/* Profile Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Column: Avatar and Quick Info */}
        <div className="md:w-1/3 flex flex-col items-center p-6 bg-red-50 rounded-xl shadow-inner border border-red-100">
          <img
            src={
              formData.photoURL ||
              "https://via.placeholder.com/150/E53935/ffffff?text=Avatar"
            }
            alt={`${formData.displayName}'s Avatar`}
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl ring-8 ring-red-200 mb-6"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {formData.displayName}
          </h2>

          <div className="space-y-3 w-full text-left">
            <p className="flex items-center text-gray-700">
              <GitCommit className="mr-2 text-red-500" size={18} />
              <span className="font-semibold mr-1">Role:</span>
              {formData.role
                ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1)
                : "N/A"}
            </p>
            <p className="flex items-center text-gray-700">
              <MapPin className="mr-2 text-red-500" size={18} />
              <span className="font-semibold mr-1">Location:</span>
              {formData.district || "N/A"}
            </p>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="md:w-2/3">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {/* Non-Editable Fields */}
            <InputField
              label="Email Address (Login Identifier)"
              name="email"
              value={formData.email}
              isAlwaysReadOnly={true}
              isEditing={isEditing}
              onChange={handleInputChange} // Fix: pass onChange always
              isDisabled={isSaving}
            />
            <InputField
              label="User Role"
              name="role"
              value={
                formData.role
                  ? formData.role.charAt(0).toUpperCase() +
                    formData.role.slice(1)
                  : "N/A"
              }
              isAlwaysReadOnly={true}
              isEditing={isEditing}
              onChange={handleInputChange} // Fix: pass onChange always
              isDisabled={isSaving}
            />

            {/* Editable Fields */}
            <InputField
              label="Full Name"
              name="displayName"
              value={formData.displayName}
              isEditing={isEditing}
              onChange={handleInputChange} // Fix: pass onChange always
              isDisabled={isSaving}
            />
            <InputField
              label="Blood Group (Editable)"
              name="bloodGroup"
              value={formData.bloodGroup}
              isEditing={isEditing}
              onChange={handleInputChange} // Fix: pass onChange always
              isDisabled={isSaving}
            />

            <InputField
              label="District (Editable)"
              name="district"
              value={formData.district}
              isEditing={isEditing}
              onChange={handleInputChange} // Fix: pass onChange always
              isDisabled={isSaving}
            />
            <InputField
              label="Upazila (Editable)"
              name="upazila"
              value={formData.upazila}
              isEditing={isEditing}
              onChange={handleInputChange} // Fix: pass onChange always
              isDisabled={isSaving}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

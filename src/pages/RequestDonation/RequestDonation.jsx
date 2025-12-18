import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestDonation = () => {
  const bloodLocation = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const districtDuplicate = bloodLocation.map((c) => c.name);
  const districts = [...new Set(districtDuplicate)];

  const getUpazilasByDistrict = (districtName) => {
    if (!districtName) return [];
    const selectedDistrictData = bloodLocation.find(
      (c) => c.name === districtName
    );
    return selectedDistrictData ? selectedDistrictData.upazilas : [];
  };

  // --- Form Management ---
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bloodGroup: "",
      district: "",
      upazila: "",
    },
  });

  // Watch the selected district to update the upazila
  const selectedDistrict = useWatch({ control, name: "district" });

  // State for managing search results and status
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = async (data) => {
    setIsSearching(true);
    setIsSearched(false);
    setSearchResults([]);

    const query = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v)
    );

    try {
      const res = await axiosSecure.get("/search-donors", {
        params: query,
      });

      setSearchResults(res.data);
      setIsSearched(true);
    } catch (error) {
      console.error("Donor search failed:", error);
      setSearchResults([]);
      setIsSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            Find Blood Donors
          </h1>
          <div className="w-16 h-1.5 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Specify the required blood group and location to find available
            donors.
          </p>
        </div>

        {/* --- Search Form --- */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-2xl border-t-4 border-red-600 mb-16">
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-6 md:space-y-0 md:grid md:grid-cols-4 md:gap-4 lg:gap-6 items-end"
          >
            {/* Blood Group Selector */}
            <div className="col-span-1">
              <label
                htmlFor="bloodGroup"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Blood Group *
              </label>
              <select
                id="bloodGroup"
                {...register("bloodGroup", {
                  required: "Blood Group is required",
                })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="">Select Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            {/* District Selector */}
            <div className="col-span-1">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                District
              </label>
              <select
                id="district"
                {...register("district")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="">Select District</option>
                {districts.map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila Selector */}
            <div className="col-span-1">
              <label
                htmlFor="upazila"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upazila
              </label>
              <select
                id="upazila"
                {...register("upazila")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white disabled:bg-gray-100"
                disabled={!selectedDistrict}
              >
                <option value="">Select Upazila</option>
                {getUpazilasByDistrict(selectedDistrict).map((upazila, i) => (
                  <option key={i} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="col-span-1">
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 shadow-lg disabled:bg-red-400"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search Donors"}
              </button>
            </div>
          </form>
        </div>

        {/* --- Donors List / Search Results --- */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {isSearched
            ? `Search Results (${searchResults.length})`
            : "Donor List"}
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Initial State */}
          {!isSearched && !isSearching && (
            <p className="text-center text-gray-500 py-8 text-lg">
              Please fill the form above and click 'Search Donors' to find
              matching volunteers.
            </p>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-red-300 border-t-red-600 rounded-full animate-spin mr-3"></div>
              <p className="text-lg text-red-600">
                Finding potential life-savers...
              </p>
            </div>
          )}

          {/* Results State - Found */}
          {isSearched && searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((donor) => (
                <div
                  key={donor._id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 rounded-lg transition duration-200 hover:bg-red-50"
                >
                  <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <p className="text-xl font-semibold text-gray-800">
                      {donor.displayName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {donor.upazila}, {donor.district}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-extrabold text-white bg-red-600 px-3 py-1 rounded-full">
                      {donor.bloodGroup}
                    </span>
                    <button
                      onClick={() =>
                        alert(
                          `Contacting ${donor.displayName} at ${donor.email}`
                        )
                      }
                      className="py-2 px-4 bg-red-100 text-red-700 font-medium rounded-full hover:bg-red-200 transition duration-200"
                    >
                      Request Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results State - Not Found */}
          {isSearched && searchResults.length === 0 && (
            <div className="text-center py-10 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xl font-semibold text-red-700 mb-2">
                No Donors Found
              </p>
              <p className="text-gray-600">
                Try broadening your search criteria or checking back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDonation;

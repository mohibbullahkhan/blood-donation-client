import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const MyPaymentHistory = () => {
  const { user } = useAuth();
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const fetchFundings = async () => {
        try {
          const response = await fetch(
            `https://blood-donation-server-alpha.vercel.app/fundings/history?email=${user.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch funding history");
          }
          const data = await response.json();
          setFundings(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFundings();
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">My Payment History</h1>
      {fundings.length === 0 ? (
        <p className="text-gray-500">Doesn't give any payment yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Donor Name</th>
                <th className="py-2 px-4 border-b">Fund Amount</th>
                <th className="py-2 px-4 border-b">Funding Date</th>
              </tr>
            </thead>
            <tbody>
              {fundings.map((funding, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {funding.name || user.displayName}
                  </td>
                  <td className="py-2 px-4 border-b">${funding.amount}</td>
                  <td className="py-2 px-4 border-b">{funding.paidAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPaymentHistory;

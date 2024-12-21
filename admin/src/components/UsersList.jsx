import { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/list"); // Replace with your API endpoint
        setUsers(response.data.data); // Adjust based on your API response structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );

  return (
    <div className="p-6 pt-24 max-w-7xl m-auto">
      <h1 className="text-2xl font-semibold mb-4 text-gray-600 font-Poppins">
        User List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, userIndex) => (
          <div
            key={user._id || userIndex}
            className="border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            {Object.entries(user)
              .filter(
                ([key]) => !["_id", "password", "confirmpassword"].includes(key)
              )
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b last:border-b-0"
                >
                  <span className="font-medium text-gray-700 text-sm">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                  </span>
                  <span className="text-gray-600">
                    {value instanceof Date || /^\d{4}-\d{2}-\d{2}T/.test(value)
                      ? new Date(value)
                          .toISOString()
                          .split("T")[0]
                          .replace(/-/g, "/")
                          .slice(2) // Format date to yy/mm/dd
                      : Array.isArray(value)
                      ? value.join(", ") // Handle array fields
                      : value?.toString() || "-"}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;

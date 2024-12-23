import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/list")
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.data); // Access the correct 'data' array
        } else {
          console.error("API responded with success: false");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleRowClick = (userId) => {
    navigate(`/user-details?id=${userId}`);
  };

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500 font-Poppins">
        User List
      </h1>
      <div className="w-[85%] m-auto overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full m-auto border-collapse text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 smPhone:p-1 phone:p-2 border">Name</th>
              <th className="p-2 smPhone:p-1 phone:p-2 border">Email</th>
              <th className="p-2 smPhone:p-1 phone:p-2 border">Phone</th>
              <th className="p-2 smPhone:hidden phone:hidden ptab:table-cell border">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => handleRowClick(user._id)}
                >
                  <td className="p-2 smPhone:p-1 phone:p-2 border">
                    {user.name || "N/A"}
                  </td>
                  <td className="p-2 smPhone:p-1 phone:p-2 border">
                    {user.email || "N/A"}
                  </td>
                  <td className="p-2 smPhone:p-1 phone:p-2 border">
                    {user.phone || "N/A"}
                  </td>
                  <td className="p-2 smPhone:hidden phone:hidden ptab:table-cell border">
                    {user.address || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500 smPhone:p-4"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

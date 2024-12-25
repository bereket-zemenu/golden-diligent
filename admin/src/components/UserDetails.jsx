import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  // Function to format date to dd/mm/yy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = d.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get(`https://golden-diligent-backend.onrender.com/api/user/list/${userId}`)
      .then((response) => {
        const userArray = Object.entries(response.data.data).filter(
          ([key]) => key !== "_id" && key !== "__v" // Exclude _id and __v
        );

        const passwordEntry = ["password", response.data.data.password];

        const formattedUserArray = userArray.map(([key, value]) => {
          if (key.includes("Date")) {
            return [key, formatDate(value)];
          }
          return [key, value];
        });

        formattedUserArray.push(passwordEntry);

        setUser(formattedUserArray);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  if (!user) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl mdphone:text-3xl font-semibold text-left mb-6 phone:ml-10 laptop:ml-32">
        User Details
      </h1>

      <div className="phone:w-full tablet:w-[80%] m-auto overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-2 smPhone:px-1 phone:px-2 py-2 border">
                Field
              </th>
              <th className="px-2 smPhone:px-1 phone:px-2 py-2 border">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map(([key, value]) => (
              <tr
                key={key}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-2 smPhone:px-1 phone:px-2 py-2 text-gray-600 font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </td>
                <td className="px-2 smPhone:px-1 phone:px-2 py-2 break-words">
                  {value instanceof Date || /^\d{4}-\d{2}-\d{2}T/.test(value)
                    ? new Date(value)
                        .toISOString()
                        .split("T")[0]
                        .replace(/-/g, "/")
                        .slice(2)
                    : Array.isArray(value)
                    ? value.join(", ")
                    : value?.toString() || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;

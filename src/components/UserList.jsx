import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data.users);
        console.log("data is ", response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg text-center">
        <p className="text-gray-600 font-medium">Loading users data...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Users</h2>
        <p className="text-lg text-red-500">No users found in the database.</p>
      </div>
    );
  }

  // --- Table View ---
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-2">
        Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Email
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50 hover:bg-gray-100 transition duration-150"
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;

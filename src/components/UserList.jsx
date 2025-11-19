import React from "react";

function UsersList({ usersData, loadingUsers, onDelete, onEdit }) {
  if (loadingUsers) return <p>Loading...</p>;
  if (!usersData || usersData.length === 0) return <p>No users found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, i) => (
              <tr
                key={user._id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                    onClick={() => onEdit(user)} // Set editing user
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this user?"
                        )
                      ) {
                        onDelete(user._id);
                      }
                    }}
                  >
                    Delete
                  </button>
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

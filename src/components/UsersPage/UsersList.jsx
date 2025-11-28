import React from "react";

const currentUser = JSON.parse(localStorage.getItem("user"));
const isAdmin = currentUser?.role === "admin";

function UsersList({ usersData, loadingUsers, onDelete, onEdit }) {
  if (loadingUsers) return <p className="text-center mt-10">Loading...</p>;
  if (!usersData || usersData.length === 0)
    return <p className="text-center mt-10">No users found.</p>;

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
            {usersData.map((u, i) => (
              <tr
                key={u._id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-3">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-6 py-3">{u.email}</td>
                <td className="px-6 py-3 space-x-2">
                  {isAdmin && (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                        onClick={() => onEdit(u)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => onDelete(u._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
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

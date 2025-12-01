import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersPage from "../UsersPage/UsersPage";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return <p>Loading user...</p>;
  //Logout Function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Dashboard
        </h1>

        {/* Welcome message */}
        <p className="text-lg text-gray-700 mb-6">
          {`Hello ${user.firstName} ${user.lastName}, welcome to the Dashboard! Your role is `}
          <span className="font-semibold text-blue-600">{user.role}</span>.
        </p>

        {/* Description / placeholder text */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
          accusamus minus itaque? Inventore, provident est numquam odit minus
          sunt similique at cupiditate, doloribus ullam maxime esse assumenda
          quam nesciunt illo! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Illo eveniet, molestiae fugiat voluptate rerum
          pariatur enim quis commodi, porro, eius praesentium. Quisquam at,
          corrupti nulla recusandae a voluptates fugit voluptas.
        </p>

        {/* Action buttons */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>

      <UsersPage />
    </>
  );
};

export default Dashboard;

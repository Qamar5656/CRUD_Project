import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersPage from "../UsersPage/UsersPage";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    console.log("Dashboard local user:", stored);
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
      <div className="text-2xl font-bold text-center my-3">Dashboard</div>

      {/* <p>
        {" "}
        {`Hello ${user.name}, Welcome to the Dashboard. Your Role is ${user.role}`}{" "}
      </p> */}
      <p className="px-13">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo accusamus
        minus itaque? Inventore, provident est numquam odit minus sunt similique
        at cupiditate, doloribus ullam maxime esse assumenda quam nesciunt illo!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo eveniet,
        molestiae fugiat voluptate rerum pariatur enim quis commodi, porro, eius
        praesentium. Quisquam at, corrupti nulla recusandae a voluptates fugit
        voluptas.
      </p>
      <div className="flex justify-around my-2">
        <button
          onClick={handleLogout}
          className="boorder p-3 text-xl bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg font-bold"
        >
          Logout{" "}
        </button>
      </div>

      <UsersPage />
    </>
  );
};

export default Dashboard;

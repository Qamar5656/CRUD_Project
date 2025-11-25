import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <>
      <div className="text-2xl font-bold text-center my-3">Dashboard</div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo accusamus
        minus itaque? Inventore, provident est numquam odit minus sunt similique
        at cupiditate, doloribus ullam maxime esse assumenda quam nesciunt illo!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo eveniet,
        molestiae fugiat voluptate rerum pariatur enim quis commodi, porro, eius
        praesentium. Quisquam at, corrupti nulla recusandae a voluptates fugit
        voluptas.
      </p>
      <div className="flex items-center justify-center my-2">
        <button
          onClick={handleLogout}
          className="boorder p-3 text-xl bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg font-bold"
        >
          Logout{" "}
        </button>
      </div>
    </>
  );
};

export default Dashboard;

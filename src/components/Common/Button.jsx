import React from "react";

const Button = ({ caption }) => {
  return (
    <>
      <button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-3 rounded-lg font-semibold hover:scale-105 transform transition">
        {caption}
      </button>
    </>
  );
};

export default Button;

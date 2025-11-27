// src/components/Auth/VerifyOtp.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import { verifyOtp, resendOtp } from "../../api/users";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const BacktoSignUp = () => {
    navigate("/signup", { state: { email } });
  };
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">No email provided for verification.</p>
      </div>
    );
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setMessage({ type: "error", text: "OTP must be 6 digits." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    console.log("Frontend - Verifying OTP:", { email, otp, type: typeof otp });

    try {
      const res = await verifyOtp({ email, otp });
      console.log("Frontend - OTP verification success:", res.data);

      if (res.data.success) {
        setMessage({ type: "success", text: "OTP verified successfully!" });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log("Frontend - OTP verification error:", error.response?.data);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Invalid OTP, try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await resendOtp({ email });
      setMessage({ type: "success", text: "OTP resent to your email." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to resend OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Verify OTP
          </h2>

          <p className="text-gray-600 mb-4 text-center">Email: {email}</p>

          {message.text && (
            <div
              className={`mb-4 p-3 rounded ${
                message.type === "success"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-around">
            <button
              onClick={handleVerify}
              className="border cursor-pointer mt-3 bg-blue-400 hover:bg-blue-600 font-bold text-md rounded-lg text-white p-3"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={handleResend}
              className="border cursor-pointer mt-3 bg-blue-400 hover:bg-blue-600 font-bold text-md rounded-lg text-white p-3"
            >
              {loading ? "Resend OTP" : "Resending ..."}
            </button>
            <button
              onClick={BacktoSignUp}
              className="border cursor-pointer mt-3 bg-blue-400 hover:bg-blue-600 font-bold text-md rounded-lg text-white p-3"
            >
              Back to SignUp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerifyOtp;

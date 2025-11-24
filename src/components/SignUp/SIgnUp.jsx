import React, { useState } from "react";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createUser } from "../../api/users";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name can't be longer than 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name can't be longer than 50 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Email Format is Incorrect")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Password must include lowercase, uppercase, number & special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage({ type: "", text: "" });

    try {
      const res = await createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      if (res.data.success) {
        setMessage({
          type: "success",
          text: res.data.message || "Signup Successful!",
        });
        resetForm();
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Signup failed. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Sign Up
        </h2>

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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* First Name */}
              <InputField
                name="firstName"
                label="First Name"
                type="text"
                placeholder="Enter Your First Name"
              />

              {/* Last Name */}
              <InputField
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Enter Your Last Name"
              />

              {/* Email */}
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Your Email"
              />

              {/* Password */}
              <div className="relative w-full">
                <InputField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  label="Password"
                  className="pr-10"
                />
                <span
                  className="absolute top-[38px] right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative w-full">
                <InputField
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Your Password"
                  label="Confirm Password"
                  className="pr-10"
                />
                <span
                  className="absolute top-[38px] right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>

              <Button caption={isSubmitting ? "Submitting..." : "Sign Up"} />
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-500 mt-4 text-md">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

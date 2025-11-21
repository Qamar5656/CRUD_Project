import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."
    )
    .required("Password is required"),
});

function SimpleForm({ onSuccess, editingUser, onUpdate }) {
  const [serverError, setServerError] = useState(""); // For backend errors

  const initialValues = {
    firstName: editingUser?.firstName || "",
    lastName: editingUser?.lastName || "",
    email: editingUser?.email || "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError(""); // reset before new submit
    try {
      if (editingUser) {
        await onUpdate(editingUser._id, values);
      } else {
        await axios.post("http://localhost:5000/api/register", values);
      }
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {editingUser ? "Update User" : "Add User"}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Display backend/server error */}
            {serverError && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {serverError}
              </div>
            )}

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                placeholder="Enter first name"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-none"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                placeholder="Enter last name"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-none"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              {editingUser ? "Update User" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SimpleForm;

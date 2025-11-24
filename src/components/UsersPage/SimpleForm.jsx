import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
// import { getErrorMessage } from "../../utils/utils";

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
      "Password must include lowercase, uppercase, number & special character"
    )
    .required("Password is required"),
});

function SimpleForm({ editingUser, onUpdate, onSuccess }) {
  const [serverError, setServerError] = useState("");

  const initialValues = {
    firstName: editingUser?.firstName || "",
    lastName: editingUser?.lastName || "",
    email: editingUser?.email || "",
    password: "",
  };

  useEffect(() => {
    setServerError("");
  }, [editingUser]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError("");
    try {
      if (editingUser) {
        await onUpdate(editingUser._id, values);
      } else {
        await createUser(values);
      }
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setServerError(getErrorMessage(error));
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
            {serverError && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {serverError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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

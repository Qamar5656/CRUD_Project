import apiClient from "./apiClient";

export const fetchUsers = () => apiClient.get("/users");
export const createUser = (data) => apiClient.post("/register", data);
export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);

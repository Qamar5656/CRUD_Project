import React, { useState, useEffect } from "react";
import SimpleForm from "./SimpleForm";
import axios from "axios";
import UsersList from "./UserList";

function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // For update

  // Get Request
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsersData(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Delete Request
  const DeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Request
  const UpdateUser = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedData);
      setEditingUser(null); // Clear editing state
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <SimpleForm
        onSuccess={fetchUsers}
        editingUser={editingUser}
        onUpdate={UpdateUser}
      />
      <UsersList
        usersData={usersData}
        loadingUsers={loadingUsers}
        onDelete={DeleteUser}
        onEdit={(user) => setEditingUser(user)} // Set editing user
      />
    </div>
  );
}

export default UsersPage;

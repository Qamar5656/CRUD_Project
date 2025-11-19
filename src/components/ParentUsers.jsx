import React, { useState, useEffect } from "react";
import SimpleForm from "./SimpleForm";
import axios from "axios";
import UsersList from "./UserList";

function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <SimpleForm onSuccess={fetchUsers} />
        <UsersList usersData={usersData} loadingUsers={loadingUsers} />
      </div>
    </>
  );
}

export default UsersPage;

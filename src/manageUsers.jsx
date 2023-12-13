import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import { Card, Button } from "react-bootstrap";
import { useAuthorization } from "./authorization";

const ManageUsersPage = () => {
  const { userRole } = useAuthorization();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId, newRole) => {
    try {
      const userRef = doc(firestore, "users", userId);

      if (userRole === "admin") {
        await setDoc(userRef, { role: newRole }, { merge: true });

        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);
      } else {
        console.log("You do not have permission to update user roles.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const userRef = doc(firestore, "users", userId);

      if (userRole === "admin") {
        await deleteDoc(userRef);
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      } else {
        console.log("You do not have permission to delete users.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = async () => {
    try {
      const usersRef = collection(firestore, "users");
      const newUserRef = await addDoc(usersRef, newUser);
      setUsers([...users, { id: newUserRef.id, ...newUser }]);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
 <div className="mb-4"></div>
        <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
                   Service Details </h2>
        <div className="mb-4"></div>
              <div className="mb-3 d-flex justify-content-end">
              <div className="mb-4"></div>


              <div className="mb-4"></div>
              <div className="mb-4"></div>
        <div className="mr-4">
          <label>Name:</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div className="mr-3">
          <label>Email:</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="mr-3">
          <label>Password:</label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </div>
        <Button variant="info" onClick={addUser} size="sm">
          Add User
        </Button>
      </div>
      <div className="mb-5"></div>
      <div className="d-flex flex-wrap justify-content-center">
        {users.map((user) => (
          <Card key={user.id} className="mb-4 mx-3" style={{ width: "300px", height: "300px" }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.email}
                </Card.Subtitle>
                <Card.Text>Role: {user.role}</Card.Text>
              </div>
              <div className="d-flex flex-wrap justify-content-between">
                {userRole === "admin" && (
                  <>
                    <Button
                      variant="info"
                      onClick={() => updateUserRole(user.id, "admin")}
                      size="sm"
                      className="mr-1 mb-1"
                    >
                      Admin
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => updateUserRole(user.id, "user")}
                      size="sm"
                      className="mr-1 mb-1"
                    >
                      User
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        updateUserRole(user.id, "service provider")
                      }
                      size="sm"
                      className="mr-2 mb-2"
                    >
                      Service Provider
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(user.id)}
                      size="sm"
                      className="mb-2"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
        }
      </div>
    </div>
  );
};

export default ManageUsersPage;
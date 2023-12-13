import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { firestore } from './firebase';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "./firebase";

export const useAuthorization = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [bookingIDs, setBookingID] = useState(null);
  const [agentOptions, setAgentOptions] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserData(user);
        fetchAgentOptions();
      } else {
        setUserRole(null);
        setUserName(null);
        setUserEmail(null);
        setBookingID(null);
        setAgentOptions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (user) => {
    const uid = user.uid;

    if (!uid) {
      console.log("No user authenticated");
      return;
    }

    const userRef = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      console.log("User data: ", userData);
      setUserRole(userData.role);
      setUserName(userData.name);
      setUserEmail(userData.email);
      setBookingID(userData.bookingIDs);
      console.log("BookingsID: ", userData.bookingIDs);
    }
  };

  const fetchAgentOptions = async () => {
    const agentsRef = collection(firestore, "users");
    const q = query(agentsRef, where("role", "==", "service provider"));
    const querySnapshot = await getDocs(q);
    const agentOptions = [];
    querySnapshot.forEach((doc) => {
      const agentData = doc.data();
      agentOptions.push(agentData.name);
    });
    setAgentOptions(agentOptions);
    
  };
  console.log(agentOptions);

  return { userRole, userName, userEmail, bookingIDs, agentOptions };
};
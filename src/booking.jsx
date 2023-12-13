import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion,getDocs, getDoc,query,where } from "firebase/firestore";
import "firebase/firestore";
import { auth, analytics } from "./firebase";
import UserInfo from "./userInfo";
import BookingInfo from "./bookingInfo";
import CarInfo from "./carInfo";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuthorization } from "./authorization";


const db = getFirestore();
  const Form = () => {
    const { agentOptions } = useAuthorization(); //this gets all users who are service providers, use it instead
 const [carModels, setCarModels] = useState([]);
 const [page, setPage] = useState(0);
 const FormTitles = ["userInfo", "carInfo", "bookingInfo"];
  
 const [userData, setUserData] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerDOB: "",
    customerOccupation: "",
    customerEmail: "",
    customerPhoneNumber: "",
    carManufacturer: "",
    carModel: "",
    makeYear: "",
    carPlateNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    agentName: "",
    location: "",
  });
      
    const fetchCarModels = async () => {
        try {
          const response = await fetch(
            "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=20"
          );
          const data = await response.json();
          const models = data?.records?.map((record) => record.fields.make) || [];
          return models;
        } catch (error) {
          console.error("Error fetching car models:", error);
          return [];
        }
      };
  
      
       useEffect(() => {
  const fetchModels = async () => {
    try {
      const data = await fetchCarModels();
      const models = data?.records?.map((record) => record.fields.make) || [];
      setCarModels(models);
    } catch (error) {
      console.error("Error fetching car models:", error);
    }
  };
  fetchModels();
}, []);
  
   const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const bookingRef = await addDoc(collection(db, "bookings"), userData);
      const bookingId = bookingRef.id;
      console.log("Booking ID:", bookingId);
  
      // Update the logged-in user's document in the "users" collection with the bookingID
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
  
        await updateDoc(userDocRef, {
          bookingIDs: arrayUnion(bookingId),
        });
  
        // Update the agent's document with the bookingID
        const agentName = userData.agentName;
        if (agentName) {
          const agentQuerySnapshot = await getDocs(query(collection(db, "users"), where("name", "==", agentName)));
          agentQuerySnapshot.forEach(async (doc) => {
            const agentDocRef = doc(db, "users", doc.id);
            const agentDocSnapshot = await getDoc(agentDocRef);
            const agentData = agentDocSnapshot.data();
  
            await updateDoc(agentDocRef, {
              bookingIDs: arrayUnion(bookingId),
            });
          });
        }
      }
      console.log("Data saved successfully!");
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };





      const PageDisplay = () => {
        if (page === 0) {
          return (
            <UserInfo
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              userData={userData}
            />
          );
        } else if (page === 1) {
          return (
            <CarInfo
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              userData={userData}
              carModels={carModels}
            />
          );
        } else {
          return (
            <BookingInfo
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              userData={userData}
            />
          );
        }
      };

      const progress = ((page + 1) / FormTitles.length) * 100;

      return (
        <Container>
          <center>
                 <div className="mb-4"></div>
        <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
                    Book a Sercive! </h2>
        <div className="mb-4"></div>
           <form onSubmit={handleSubmit}>
            
           <div className="form-container bg-light p-4" style={{ width: '500px'}}>
          <ProgressBar now={progress} label={``} />
            <div className="header">
            <div className="mb-4"></div>
            <h3 className="text-dark font-light" style={{ fontFamily: 'Advent Pro' }}>
{FormTitles[page]}</h3>        <div className="mb-4"></div>
            </div>
            <div className="body">
              <div>{PageDisplay()}</div>
            </div>
            <div className="mb-4"></div>
         <div className="footer">
            <Button
               variant="secondary"
               disabled={page === 0}
               onClick={() => setPage((currPage) => currPage - 1)}
            >
               PREV
            </Button>
            {page==2 ? (
               <Button type="submit" className="btn btn-info">
                  SUBMIT
               </Button>
            ) : (
               <Button
               className="btn btn-info"
                  disabled={page === FormTitles.length - 1}
                  onClick={() => setPage((currPage) => currPage + 1)}
               >
                  NEXT
               </Button>
            )}
         </div>
          
          </div>
          </form>
          </center>
        </Container>
      );
};


  export default Form;


import React, { useState } from "react";
import { firestore } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, updateDoc} from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const RoadAssistanceForm = () => {
  const [userData, setUserData] = useState({
    carInfo: "",
    customerInfo: "",
    serviceLocation: "",
    serviceProvided: "",
    ImageUrl: "",
  });

  const storage = getStorage();

  const handleFileUpload = (e) => {
    setUserData({ ...userData, ImageUrl: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (userData.ImageUrl) {
      const storageRef = ref(
        storage,
        `roadAssistantHistory/${userData.ImageUrl.name}`
      );
      try {
        await uploadBytes(storageRef, userData.ImageUrl);
        console.log("File uploaded successfully!");

        // Get the download URL of the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);
        setUserData({ ...userData, ImageUrl: downloadUrl });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  

      const { Uploaddocument, ...userDataWithoutFile } = userData;
  
    
      const userDataWithUserId = {
        ...userDataWithoutFile,
        userId: user.uid,
      };
  
      const collectionRef = collection(firestore, "roadAssistantHistory");
      const docRef = await addDoc(collectionRef, userDataWithUserId);
      console.log("Data saved successfully!");
  
      if (Uploaddocument) {
        const storageRef = ref(
          storage,
          `roadAssistantHistory/${docRef.id}/${Uploaddocument.name}`
        );
        await uploadBytes(storageRef, Uploaddocument);
        console.log("File uploaded successfully!");
  
        const downloadUrl = await getDownloadURL(storageRef);
  
        await updateDoc(docRef, { Uploaddocument: downloadUrl });
        console.log("File URL saved to Firestore!");
      }
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };


  return (
    <Container>
      <center>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
       Manage Service 
      </h2>
      <div className="mb-4"></div>
      <form onSubmit={handleSubmit}>
      <div className="form-container bg-light p-4" style={{ width: '500px'}}>          <div className="header">
            <div className="mb-4"></div>
            <h3 className="text-dark font-light" style={{ fontFamily: 'Advent Pro' }}>
              <center>Assistance Information</center>
            </h3>
            <div className="mb-4"></div>
          </div>
          <div className="body">
            <div className="mb-4"></div>
            <input
              type="text"
              className="form-control"
              name="carInfo"
              placeholder="Car Information"
              value={userData.carInfo}
              onChange={(e) => setUserData({ ...userData, carInfo: e.target.value })}
            />
            <div>
              <div className="mb-4"></div>
              <input
                className="form-control"
                type="text"
                name="customerInfo"
                placeholder="Customer Information"
                value={userData.customerInfo}
                onChange={(e) => setUserData({ ...userData, customerInfo: e.target.value })}
              />
            </div>
            <div className="mb-4"></div>
            <input
              className="form-control"
              type="text"
              name="serviceLocation"
              placeholder="Service Location"
              value={userData.serviceLocation}
              onChange={(e) => setUserData({ ...userData, serviceLocation: e.target.value })}
            />
            <div>
              <div className="mb-4"></div>
              <input
                type="text"
                className="form-control"
                placeholder="Service Provided"
                name="serviceProvided"
                value={userData.serviceProvided}
                onChange={(e) => setUserData({ ...userData, serviceProvided: e.target.value })}
              />
            </div>
            <div className="mb-4"></div>
<div className="d-flex align-items-center">
  <input
    placeholder="Upload Document"
    className="form-control"
    type="file"
    name="ImageUrl"
    onChange={handleFileUpload}
  />
  <Button onClick={handleUpload} className="ml-2">Upload</Button>
</div>
          </div>
          <div className="mb-4"></div>
          <div className="footer">
            <Button type="submit" className="btn btn-info">
              SUBMIT
            </Button>
          </div>
        </div>
      </form>
      </center>
    </Container>
  );
};

export default RoadAssistanceForm;
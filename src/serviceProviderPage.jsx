
import React, { useState } from "react";
import { firestore } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, updateDoc} from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Form = () => {
  const [userData, setUserData] = useState({
    CustomerInformation: "",
    VehicleNumber: "",
    VehicleManufacture: "",
    VehicleMake: "",
    Appointmentdate: "",
    AppointmentTime: "",
    Service: "",
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
        `serviceProviderHistory/${userData.ImageUrl.name}`
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
  
      // Exclude the Uploaddocument field from userData
      const { Uploaddocument, ...userDataWithoutFile } = userData;
  
      // Add the user's ID to the userData object
      const userDataWithUserId = {
        ...userDataWithoutFile,
        userId: user.uid,
      };
  
      const collectionRef = collection(firestore, "serviceProviderHistory");
      const docRef = await addDoc(collectionRef, userDataWithUserId);
      console.log("Data saved successfully!");
  
      // If there is a file uploaded, handle the file upload separately
      if (Uploaddocument) {
        const storageRef = ref(
          storage,
          `serviceProviderHistory/${docRef.id}/${Uploaddocument.name}`
        );
        await uploadBytes(storageRef, Uploaddocument);
        console.log("File uploaded successfully!");
  
        // Get the download URL of the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);
  
        // Update the Firestore document with the file URL
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

              Add Customer Information </h3>
            <div className="mb-4"></div>
          </div>
          <div className="body">
            <input
        type="text"
        className="form-control"
        name="CustomerInformation"
        placeholder="Customer Name"
        value={userData.CustomerInformation}
        onChange={(e) =>
            setUserData({ ...userData, CustomerInformation: e.target.value })
          }
      />
            <div>
            <div className="mb-4"></div>
              <input
              className="form-control"
                type="text"
                name="VehicleNumber"
                placeholder="Vehicle Number"
                value={userData.VehicleNumber}
                onChange={(e) => setUserData({ ...userData, VehicleNumber: e.target.value })}
              />
            </div>
            <div className="mb-4"></div>
              <input
                      className="form-control"
                type="text"
                name="VehicleManufacture"
                placeholder="Vehicle Manufacture"
                value={userData.VehicleManufacture}
                onChange={(e) =>
                  setUserData({ ...userData, VehicleManufacture: e.target.value })
                }
              />
            <div>
            <div className="mb-4"></div>
              <input
                    type="text"
                      className="form-control"
                placeholder="Vehicle Make"
                name="VehicleMake"
                value={userData.VehicleMake}
                onChange={(e) => setUserData({ ...userData, VehicleMake: e.target.value })}
              />
            </div>
            <div>
            <div className="mb-4"></div>
              <input
               className="form-control"
               placeholder="Appointment date"
                type="date"
                name="Appointmentdate"
                value={userData.Appointmentdate}
                onChange={(e) =>
                  setUserData({ ...userData, Appointmentdate: e.target.value })
                }
              />
            </div>
            <div className="mb-4"></div>
            <div>
              <input
               className="form-control"
               placeholder="Appointment Time"
                type="time"
                name="AppointmentTime"
                value={userData.AppointmentTime}
                onChange={(e) =>
                  setUserData({ ...userData, AppointmentTime: e.target.value })
                }
              />
            </div>
            <div className="mb-4"></div>
            <div>
              <input
               className="form-control"
               placeholder="Service"
                type="text"
                name="Service"
                value={userData.Service}
                onChange={(e) => setUserData({ ...userData, Service: e.target.value })}
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

export default Form;
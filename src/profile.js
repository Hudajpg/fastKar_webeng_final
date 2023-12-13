import React, { useState, useEffect } from "react";
import { useAuthorization } from "./authorization";
import { firestore, auth, storage } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";


const ProfilePage = () => {
    const { userName, userEmail } = useAuthorization();
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");
  
    useEffect(() => {
        const fetchProfileImage = async () => {
          if (auth.currentUser) {
            const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
            try {
              const imageUrl = await getDownloadURL(storageRef);
              setProfileImageUrl(imageUrl);
              localStorage.setItem("profileImageUrl", imageUrl); // Store image URL in local storage
            } catch (error) {
              console.error("Error fetching profile image:", error);
            }
          }
        };
      
        // Check if the profile image URL exists in local storage
        const storedImageUrl = localStorage.getItem("profileImageUrl");
        if (storedImageUrl) {
          setProfileImageUrl(storedImageUrl);
        } else {
          fetchProfileImage();
        }
      }, []);

  const handleUpdateName = async () => {
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);

    try {
      await updateDoc(userDocRef, { name: newName });
      console.log("Name updated successfully!");
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleUpdateEmail = async () => {
    const userDocRef = doc(firestore, "users", auth.currentUser.uid);

    try {
      await updateDoc(userDocRef, { email: newEmail });
      console.log("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await auth.currentUser.updatePassword(newPassword);
      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
    
    try {
      await uploadBytes(storageRef, file);
      console.log("Image uploaded successfully!");

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
      setProfileImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  return (
    <div className="container" style={{ fontFamily: "Advent Pro", maxWidth: "600px" }}>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Manage your profile
      </h2>
      <div className="mb-4"></div>
  
      <div className="card mt-2">
        <div className="card-body">
          <div className="image-container">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Profile" className="rounded-circle mb-2" style={{ width: "100px", height: "100px" }} />
            ) : (
              <div className="default-image"></div>
            )}

              <input type="file" onChange={handleImageUpload} accept="image/*" className="btn" />
              <p><strong>Name:</strong> {userName}</p>
            <p><strong>Email:</strong> {userEmail}</p>
            </div>
            <Link to="/"><button className="btn btn-info mt-2" >Logout</button></Link>

          </div>
           

      </div>
  
      <div className="card mt-2">
        <div className="card-body">
          <h2 className="card-title">Update Your Information</h2>
          <div className="mb-2">
            <input id="newName" type="text" className="form-control" placeholder="New Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button className="btn btn-info mt-2" onClick={handleUpdateName}>Update Name</button>
          </div>
  
          <div className="mb-2">
            <label htmlFor="newEmail" className="form-label"></label>
            <input id="newEmail" type="email" className="form-control" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <button className="btn btn-info mt-2" onClick={handleUpdateEmail}>Update Email</button>
          </div>
  
          <div className="mb-2">
            <label htmlFor="newPassword" className="form-label"></label>
            <input id="newPassword" type="password" className="form-control" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button className="btn btn-info mt-2" onClick={handleUpdatePassword}>Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
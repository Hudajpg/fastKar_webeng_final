import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const HistoryPageRoad = () => {
  const [roadAssistantHistory, setRoadAssistantHistory] = useState([]);

  useEffect(() => {
    const fetchRoadAssistantHistory = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              fetchData(user.uid);
            }
          });
        } else {
          fetchData(user.uid);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    const fetchData = async (userId) => {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'roadAssistantHistory'), where('userId', '==', userId))
      );

      const historyData = querySnapshot.docs.map((doc) => doc.data());
      setRoadAssistantHistory(historyData);
      console.log('Data fetched successfully!');
    };

    fetchRoadAssistantHistory();
  }, []);

  return (
    <div className="container">
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Road Assistant History
      </h2>
      <div className="mb-4"></div>
      {roadAssistantHistory.length === 0 ? (
        <p className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
          No past history
        </p>
      ) : (
        <div className="row">
          {roadAssistantHistory.map((historyItem) => (
            <div className="col-md-4 mb-4" key={historyItem.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: 'Advent Pro' }}>
                    Service: {historyItem.service}
                  </h5>
                  <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                    <strong>Customer Information:</strong> {historyItem.customerInfo}
                  </p>
                  <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                    <strong>Car Information:</strong> {historyItem.carInfo}
                  </p>
                  <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                    <strong>Vehicle:</strong> {historyItem.VehicleMake}
                  </p>
                  <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                    <strong>Location:</strong> {historyItem.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPageRoad;
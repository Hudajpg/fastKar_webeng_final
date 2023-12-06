import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, query, where  } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const HistoryPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
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
        query(collection(firestore, 'serviceProviderHistory'), where('userId', '==', userId))
      );

      const serviceData = querySnapshot.docs.map((doc) => doc.data());
      setServices(serviceData);
      console.log('Data fetched successfully!');
    };

    fetchServices();
  }, []);

  return (
    <div className="container">
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        History
      </h2>
      <div className="mb-4"></div>
      {services.length === 0 ? (
        <p className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
          No past history
        </p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service.id}>
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontFamily: 'Advent Pro' }}>{service.Service}</h5>
                      <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                        <strong>Customer:</strong> {service.CustomerInformation}
                      </p>
                      <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                        <strong>Appointment Date:</strong> {service.Appointmentdate}
                      </p>
                      <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                        <strong>Vehicle Make:</strong> {service.VehicleMake}
                      </p>
                      <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                        <strong>Vehicle Manufacture:</strong> {service.VehicleManufacture}
                      </p>
                      <p className="card-text" style={{ fontFamily: 'Advent Pro' }}>
                        <strong>Vehicle Number:</strong> {service.VehicleNumber}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card-img-box d-flex align-items-center justify-content-center">
                      <div className="image-box">
                        <img src={service.ImageUrl} alt="Service" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
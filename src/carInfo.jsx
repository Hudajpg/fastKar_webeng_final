import React from "react";
import carData from "./cars.json";

function CarInfo({ handleSubmit, handleChange, userData }) {
  const carManufacturers = carData.carManufacturers;
  const carModels = carData.carModels;

  return (
    <div className="car-info-class">
      <select
        className="form-control"
        name="carManufacturer"
        value={userData.carManufacturer}
        onChange={handleChange}
        required
      >
        <option value="">Select Car Manufacturer</option>
        {carManufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>
      <div className="mb-4"></div>

      <select
        className="form-control"
        name="carModel"
        placeholder="Car Model"
        value={userData.carModel}
        onChange={handleChange}
        required
      >
        <option value="">Select Car Model</option>
        {userData.carManufacturer &&
          carModels[userData.carManufacturer].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
      </select>
      <div className="mb-4"></div>

      <input
        type="text"
        className="form-control"
        name="makeYear"
        placeholder="Make Year"
        value={userData.makeYear}
        onChange={handleChange}
        required
      />
      <div className="mb-4"></div>

      <input
        type="text"
        className="form-control"
        name="carPlateNumber"
        placeholder="Car Plate Number"
        value={userData.carPlateNumber}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default CarInfo;
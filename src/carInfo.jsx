import React from "react";

function CarInfo({ handleSubmit, handleChange, userData }) {
  const carManufacturers = [
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Tesla",
    "Mercedes-Benz",
    "Audi",
    "Chevrolet",
    "Nissan",
    "Volkswagen",
    "Hyundai",
    // Add more car manufacturers here
  ];

  const carModels = {
    Toyota: ["Camry", "Corolla", "Rav4", "Highlander", "Prius"],
    Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey"],
    Ford: ["Mustang", "F-150", "Explorer", "Escape", "Focus"],
    BMW: ["3 Series", "5 Series", "X5", "X3", "7 Series"],
    Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
    Audi: ["A4", "A6", "Q5", "Q7", "TT"],
    Chevrolet: ["Camaro", "Silverado", "Equinox", "Malibu", "Traverse"],
    Nissan: ["Altima", "Rogue", "Maxima", "Sentra", "Pathfinder"],
    Volkswagen: ["Golf", "Jetta", "Passat", "Tiguan", "Atlas"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
    // Add more car models here for each manufacturer
  };

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
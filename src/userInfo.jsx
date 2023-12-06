import React from "react";






function UserInfo({ handleSubmit, handleChange, userData }) {
    return (
      
      <div className="user-info-container">
            <input
              type="text"
              className="form-control"
              name="customerFirstName"
              placeholder="First Name"
              value={userData.customerFirstName}
              onChange={handleChange}
              required
            />
            <div className="mb-4"></div>

            <input
              type="text"
              className="form-control-sm"
              name="customerLastName"
              placeholder="Last Name"
              value={userData.customerLastName}
              onChange={handleChange}
              required
            />
            <div className="mb-4"></div>

            <input
              type="date"
              className="form-control"
              name="customerDOB"
              placeholder="Date of Birth"
              value={userData.customerDOB}
              onChange={handleChange}
              required
            />
            <div className="mb-4"></div>

            <input
              type="text"
              className="form-control"
              name="customerOccupation"
              placeholder="Occupation"
              value={userData.customerOccupation}
              onChange={handleChange}
              required
            />
             <div className="mb-4"></div>

            <input
              type="email"
              className="form-control"
              name="customerEmail"
              placeholder="Email"
              value={userData.customerEmail}
              onChange={handleChange}
              required
            />
                <div className="mb-4"></div>
            <input
              type="tel"
              className="form-control"
              name="customerPhoneNumber"
              placeholder="Phone Number"
              value={userData.customerPhoneNumber}
              onChange={handleChange}
              required
            />
          </div>
      );
}

export default UserInfo;
import React from 'react';
import FileUploadField from './FileUploadField';

const PersonalDetails = ({ formData, handleInputChange, handleVerify }) => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Adhaar Number</label>
          <input
            type="text"
            name="adhaar"
            value={formData.adhaar}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your Adhaar number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <FileUploadField
            label="Upload Adhaar Card"
            name="adhaarFile"
            file={formData.adhaarFile}
            verified={formData.adhaarVerified}
            handleInputChange={handleInputChange}
            handleVerify={() => handleVerify('adhaarVerified')}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
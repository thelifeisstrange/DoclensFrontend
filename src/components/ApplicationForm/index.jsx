import React, { useEffect, useState } from 'react';
import PersonalDetails from './PersonalDetails';
import EducationalDetails from './EducationalDetails';
import PreviewReport from './PreviewReport';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    adhaar: '',
    adhaarFile: null,
    adhaarLink:null,
    adhaarVerified: false,
    
    // Educational Details
    class10School: '',
    class10Percentage: '',
    class10Marksheet: null,
    class10Link: false,
    class10Verified: false,
    
    class12College: '',
    class12Percentage: '',
    class12Marksheet: null,
    class12Link: null,
    class12Verified: false,
    
    bachelorsUniversity: '',
    bachelorsPercentage: '',
    bachelorsMarksheet: null,
    bachelorsLink: null,
    bachelorsVerified: false
  });

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: files ? files[0] : value
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    // if (files) {
    //   console.log(`Uploading document type: ${documentType}`);
    //   // You can perform document-specific validation here
    // }

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleVerify = (documentType) => {
    // console.log(`Verifying document type: ${documentType}`);
    
    // // Map document types to their corresponding verification fields
    // const verificationFields = {
    //   'adhaar': 'adhaarVerified',
    //   'class10': 'class10Verified',
    //   'class12': 'class12Verified',
    //   'bachelors': 'bachelorsVerified'
    // };

    // // Map document types to their corresponding file fields
    // const fileFields = {
    //   'adhaar': 'adhaarFile',
    //   'class10': 'class10Marksheet',
    //   'class12': 'class12Marksheet',
    //   'bachelors': 'bachelorsMarksheet'
    // };

    // const verificationField = verificationFields[documentType];
    // const fileField = fileFields[documentType];

      switch (documentType) {
        case 'adhaar':
          // Verify Adhaar specific format/details

          console.log('Verifying Adhaar document...',formData.adhaarFile);
          break;
        case 'x':
          // Verify Class X marksheet format/details
          console.log('Verifying Class X marksheet...');
          break;
        case 'xii':
          // Verify Class XII marksheet format/details
          console.log('Verifying Class XII marksheet...');
          break;
        case 'b':
          // Verify Bachelors marksheet format/details
          console.log('Verifying Bachelors marksheet...', formData.bachelorsMarksheet);
          break;
        default:
          console.log('Unknown document type',documentType);
      }

      // setFormData(prev => ({
      //   ...prev,
      //   [verificationField]: true
      // }));
  };

  return (
    <div className="container">
      <NavBar />
      <div className="card animate-fade-in">
        <div className="steps">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`step-indicator ${step >= s ? 'active' : ''}`} />
          ))}
        </div>

        <h2 className="preview-title">
          {step === 1 ? "Personal Details" : 
           step === 2 ? "Educational Details" : "Application Preview"}
        </h2>

        {step === 1 && (
          <PersonalDetails 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleVerify={handleVerify}
          />
        )}
        {step === 2 && (
          <EducationalDetails 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleVerify={handleVerify}
          />
        )}
        {step === 3 && (
          <PreviewReport formData={formData} />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          {step > 1 && (
            <button className="button button-outline" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}
          {step < 3 ? (
            <button 
              className="button button-primary" 
              onClick={() => setStep(step + 1)} 
              style={{ marginLeft: 'auto' }}
            >
              Next
            </button>
          ) : (
            <button 
              className="button button-primary" 
              onClick={() => console.log('Form submitted:', formData)} 
              style={{ marginLeft: 'auto' }}
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
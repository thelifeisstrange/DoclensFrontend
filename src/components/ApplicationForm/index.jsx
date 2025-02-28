import React, { useEffect, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EducationalDetails from "./EducationalDetails";
import PreviewReport from "./PreviewReport";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import ThankyouPage from "./ThankyouPage";

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
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    adhaar: "",
    adhaarFile: null,
    adhaarLink: null,
    adhaarVerified: false,

    // Educational Details
    class10School: "",
    class10Percentage: "",
    class10Marksheet: null,
    class10Link: false,
    class10Verified: false,

    class12College: "",
    class12Percentage: "",
    class12Marksheet: null,
    class12Link: null,
    class12Verified: false,

    bachelorsUniversity: "",
    bachelorsPercentage: "",
    bachelorsMarksheet: null,
    bachelorsLink: null,
    bachelorsVerified: false,
  });

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: files ? files[0] : value
  //   }));
  // };

  const 
  handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // if (files) {
    //   console.log(`Uploading document type: ${documentType}`);
    //   // You can perform document-specific validation here
    // }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleVerify = async (documentType) => {
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
    const file = new FormData();

    

    switch (documentType) {
      case "adhaar":
        // Verify Adhaar specific format/details
        file.append("image", formData.adhaarFile); // Append the file with the key 'image'
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/verification/upload-image/",
            {
              method: "POST",
              body: file,
            }
          );
          const data = await response.json()
          console.log("Verifying Adhaar document...", data.file_path);
        const res = await fetch("http://localhost:8000/verification/aadhaar/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            adhaar_number: formData.adhaar,
            dob: formData.dob,
            link: data.file_path,
          }),
        });
        const d = await res.json();
        console.log(d.result['name'])
        console.log(d.result['adhaar_number'])
        if (d.result['name'] ==false && d.result['adhaar_number']==false) {
          toast.error("Name and adhaar number verification failed");
        }
        else if (d.result['name']==false) {
          toast.error("Name verification failed");
        }
        else if (d.result['adhaar_number']==false) {
          toast.error("Adhaar Number verification failed");
        }
        else{
          toast.success("Adhaar verification successful");
        }
        setFormData((prev) => ({
          ...prev,
          adhaarVerified: d.verified,
          adhaarLink: data.file_path,
        }));
        } catch (error) {
          console.log(error);
        }
        break;


      case "x":
        // Verify Class X marksheet format/details
        file.append("image", formData.class10Marksheet); // Append the file with the key 'image'
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/verification/upload-image/",
            {
              method: "POST",
              body: file,
            }
          );
          const data = await response.json();
          console.log("Verifying 10th document...", data.file_path);
          const res = await fetch(
            "http://localhost:8000/verification/marksheet/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: formData.name,
                percentage: formData.class10Percentage,
                link: data.file_path,
              }),
            }
          );;
          const d = await res.json();
          console.log(d.result['name'])
          console.log(d.result['percentage']);
          if (d.result['name']==false && d.result['percentage']==false) {
            toast.error("Name and percentage verification failed");
          }
          else if (d.result['name']==false) {
            toast.error("Name verification failed");
          }
          else if(d.result['percentage']==false) {
            toast.error("Percentage verification failed");
          }
          setFormData((prev) => ({
            ...prev,
            class10Verified: d.verified,
            class10Link: data.file_path
          }));
        } catch (error) {
          console.log(error);
        }
        break;
      case "xii":
        // Verify Class XII marksheet format/details
        file.append("image", formData.class12Marksheet); // Append the file with the key 'image'
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/verification/upload-image/",
            {
              method: "POST",
              body: file,
            }
          );
          const data = await response.json();
          console.log("Verifying 12th document...", data.file_path);
          const res = await fetch(
            "http://localhost:8000/verification/marksheet/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: formData.name,
                percentage: formData.class12Percentage,
                link: data.file_path,
              }),
            }
          );
          const d = await res.json();
          console.log(d.result['name'])
          console.log(d.result['percentage']);
          if (d.result['name']==false && d.result['percentage']==false) {
            toast.error("Name and percentage verification failed");
          }
          else if (d.result['name']==false) {
            toast.error("Name verification failed");
          }
          else if(d.result['percentage']==false) {
            toast.error("Percentage verification failed");
          }
          setFormData((prev) => ({
            ...prev,
            class12Verified: d.verified,
            class12Link: data.file_path,
          }));
        } catch (error) {
          console.log(error);
        }
        break;
      case "b":
        // Verify Bachelors marksheet format/details
        file.append("image", formData.bachelorsMarksheet); // Append the file with the key 'image'
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/verification/upload-image/",
            {
              method: "POST",
              body: file,
            }
          );
          const data = await response.json();
          const res = await fetch(
            "http://localhost:8000/verification/marksheet/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: formData.name,
                percentage: formData.bachelorsPercentage,
                link: data.file_path,
              }),
            }
          );
          const d = await res.json();
          console.log(d.result['name'])
          console.log(d.result['percentage']);
          if (d.result['name']==false && d.result['percentage']==false) {
            toast.error("Name and percentage verification failed");
          }
          else if (d.result['name']==false) {
            toast.error("Name verification failed");
          }
          else if(d.result['percentage']==false) {
            toast.error("Percentage verification failed");
          }
          setFormData((prev) => ({
            ...prev,
            bachelorsVerified: d.verified,
            bachelorsLink: data.file_path,
          }));
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        console.log("Unknown document type", documentType);
    }
    

    // setFormData(prev => ({
    //   ...prev,
    //   [verificationField]: true
    // }));
  };

  const isFormVerified = 
      formData.adhaarVerified &&
      formData.class10Verified &&
      formData.class12Verified &&
      formData.bachelorsVerified
   

  return (
    <div className="container">
      <NavBar />
      <div className="card animate-fade-in">
        <div className="steps">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`step-indicator ${step >= s ? "active" : ""}`}
            />
          ))}
        </div>

        <h2 className="preview-title">
          {step === 1
            ? "Personal Details"
            : step === 2
            ? "Educational Details"
            : step === 3
            ? "Application Preview"
            : "Application Submitted"}
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
        {step === 3 && <PreviewReport formData={formData} />}
        {step === 4 && <ThankyouPage />}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          {step > 1 && (
            <button
              className="button button-outline"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              className="button button-primary"
              onClick={() => setStep(step + 1)}
              style={{ marginLeft: "auto" }}
            >
              Next
            </button>
          ) : (
            <button
              className="button button-primary"
              onClick={() => {
                if (isFormVerified) {
                  setStep(step + 1); // Submit or proceed if everything is verified
                } else {
                  toast.error("All details must be verified before submitting");
                }
              }}
              style={{ marginLeft: "auto" }}
            >
              Submit Application
            </button>
          )}
          {step < 4 ? (
            <div>
              <button
                className="button button-outline"
                onClick={() => setStep(step +1)}
                style={{ marginLeft: "1rem" }}
              >
                Request Manual Verification
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

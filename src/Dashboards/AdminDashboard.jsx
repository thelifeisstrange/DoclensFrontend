import React, { useState, useEffect } from 'react';
import './admin-dashboard.css';

// Custom Components (Table, Card, etc. remain the same)
const Table = ({ children }) => (
  <table className="admin-table">
    {children}
  </table>
);

const Card = ({ children }) => (
  <div className="admin-card">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="card-title">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="card-content">
    {children}
  </div>
);

const Badge = ({ children, variant }) => {
  const badgeClass = variant === 'success' ? 'badge-success' : 'badge-error';
  return (
    <span className={`badge ${badgeClass}`}>
      {children}
    </span>
  );
};

// Preview Modal Component
const PreviewModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Application Preview</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <h4>Personal Details</h4>
          <p>Name: {application.name}</p>
          <p>Email: {application.email}</p>
          <p>Verification Status: {application.personalVerification ? "Verified" : "Not Verified"}</p>
          
          <h4>Educational Details</h4>
          <p>Class 10: {application.educationalVerification.class10 ? "Verified" : "Not Verified"}</p>
          <p>Class 12: {application.educationalVerification.class12 ? "Verified" : "Not Verified"}</p>
          <p>Bachelors: {application.educationalVerification.bachelors ? "Verified" : "Not Verified"}</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Simulated API response
    const mockData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        personalVerification: true,
        educationalVerification: {
          class10: true,
          class12: true,
          bachelors: false
        }
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        personalVerification: false,
        educationalVerification: {
          class10: true,
          class12: true,
          bachelors: true
        }
      }
    ];
    
    setApplications(mockData);
  }, []);

  const getTotalVerificationScore = (app) => {
    const educationalVerified = Object.values(app.educationalVerification).filter(v => v).length;
    const personalVerified = app.personalVerification ? 1 : 0;
    const total = educationalVerified + personalVerified;
    return `${total}/4`;
  };

  return (
    <div className="admin">
      <Card>
        <CardHeader>
          <CardTitle>Form Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verification Status</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app.id}>
                    <td>{index + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>
                      <Badge 
                        variant={getTotalVerificationScore(app) === "4/4" 
                          ? "success" 
                          : "error"
                        }
                      >
                        {getTotalVerificationScore(app)}
                      </Badge>
                    </td>
                    <td>
                      <button 
                        className="preview-button"
                        onClick={() => setSelectedApplication(app)}
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedApplication && (
        <PreviewModal 
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
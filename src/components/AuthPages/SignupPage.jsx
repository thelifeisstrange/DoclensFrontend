import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="container">
      <div className="card animate-fade-in">
        <h2 className="preview-title" style={{ textAlign: 'center' }}>
          Signup
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem',flexDirection:"column" }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email id"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your Password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Re-enter Password"
            />
          </div>
          <button 
              className="button button-primary" 
              onClick={() => console.log('Form submitted:', formData)} 
              style={{ margin: 'auto' }}
            >
              Signup
            </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
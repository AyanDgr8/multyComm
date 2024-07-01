// src/components/routes/Home/Verification/Verification.js


import React, { useState } from 'react';
import './Verification.css';
import { useNavigate } from 'react-router-dom'; 

const Verification = () => {
  const [selectedIdType, setSelectedIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 

  const handleIdTypeChange = (event) => {
    setSelectedIdType(event.target.value);
  };

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleAadhaarChange = (event) => { 
    setAadhaar(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const clientRefNum = 'unique_ref_number'; // Replace with your unique reference number

    try {
      const response = await fetch(selectedIdType === 'AADHAR CARD' ? '/verify-aadhaar' : '/verify-pan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idType: selectedIdType,
          idNumber: selectedIdType === 'AADHAR CARD' ? aadhaar : idNumber,
          name,
          dob,
          clientRefNum,
        }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {  // Check for successful verification
        navigate('/payment');  // Redirect to payment page
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(error);
    }
  };

  return (
    <div>
      <section className='above-form'>
        <img src="/uploads/game-bg.webp" className='game-bgg' alt="game-bg" />
        <div className='form-header'>
          <img src="/uploads/game-logo.webp" className='game-logo' alt="game-logo" />
          <img src="/uploads/game-head.webp" className='game-head' alt="game-head" />
        </div>
      </section>

      <form onSubmit={handleSubmit} className='form-verify'>
        <div className='form-heading'>
          <h3 className='form-line1'>Age Verification</h3>
        </div>

        <div className="form-outline">
          <div className='select-license'>
            <label htmlFor="idType">Choose ID Type : </label>
            <select id="idType" className='select-one' value={selectedIdType} onChange={handleIdTypeChange}>
              <option value="">Select ID Type</option>
              <option value="AADHAR CARD">AADHAR CARD</option>
              <option value="DRIVING LICENSE">DRIVING LICENSE</option>
              <option value="PAN (V1)">PAN (V1)</option>
              <option value="PAN (V2)">PAN (V2)</option>
              <option value="PASSPORT">PASSPORT</option>
            </select>
          </div>
        </div>

        <div className="form-outline">
          {selectedIdType && (
            <>
              <input
                type="text"
                id="idNumber"
                value={idNumber}
                className='input-num'
                onChange={handleIdNumberChange}
                placeholder={`Enter ${selectedIdType} No. `}
              />
              {(selectedIdType === 'PAN (V2)' || selectedIdType === 'PAN (V1)') && (
                <input
                  type="text"
                  id="name"
                  value={name}
                  className='input-num'
                  onChange={handleNameChange}
                  placeholder="Enter Name"
                />
              )}
              {selectedIdType === 'PAN (V2)' && (
                <input
                  type="text"
                  id="dob"
                  value={dob}
                  className='input-num'
                  onChange={handleDobChange}
                  placeholder="Enter DOB (DD/MM/YYYY)"
                />
              )}
              {selectedIdType === 'AADHAR CARD' && (
                <input
                  type="text"
                  id="aadhaar"
                  value={aadhaar}
                  className='input-num'
                  onChange={handleAadhaarChange}
                  placeholder="Enter Aadhaar Number"
                />
              )}
            </>
          )}
        </div>

        <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4 sbt-btn">Verify</button>
      </form>

      {result && (
        <div className='result'>
          <h4>Verification Result:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Verification;

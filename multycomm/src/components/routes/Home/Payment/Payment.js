// src/components/routes/Home/Payment/Payment.js


import React, { useState } from 'react';

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const initiatePayment = async () => {
    try {
      const response = await fetch('/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 100 }), // Example amount, replace with actual amount
      });

      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // Redirect to Cashify payment portal
      } else {
        setPaymentStatus('Error initiating payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentStatus('Error initiating payment');
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Please proceed with the payment to complete the verification process.</p>
      <button onClick={initiatePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;

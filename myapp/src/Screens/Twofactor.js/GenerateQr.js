import React, { useState } from 'react';
import axios from 'axios';

const TwoFactorAuthSetup = () => {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const user = sessionStorage.getItem('user')

    const id = user? JSON.parse(user).id : null

    const enableTwoFactorAuth = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/auth/enable-2fa/${id}`); // Update with your API endpoint
            setQrCode(response.data.imageUrl);
            setMessage(response.data.message);
            setIs2FAEnabled(true);
        } catch (error) {
            setMessage('Error enabling 2FA. Please try again.');
        }
    };

    return (
      <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow-lg">
  <h2 className="text-2xl font-semibold text-center text-gray-800">Two-Factor Authentication</h2>

  {!is2FAEnabled ? (
    <div className="mt-4 text-center">
      <p className="text-gray-600">Enhance your account security by enabling two-factor authentication (2FA).</p>
      <button
        onClick={enableTwoFactorAuth}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enable 2FA
      </button>
    </div>
  ) : (
    <div className="mt-4 text-center">
      <p className="text-green-600">{message}</p>
      <div className="flex justify-center mt-4">
        <img src={qrCode} alt="QR Code" className="w-32 h-32 border border-gray-300 rounded-md p-2" />
      </div>
      <p className="text-gray-600 mt-4">Scan the QR code with your Google Authenticator app.</p>
    </div>
  )}
</div>

    );
};

export default TwoFactorAuthSetup;

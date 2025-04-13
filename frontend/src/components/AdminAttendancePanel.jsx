// src/components/AdminAttendancePanel.jsx
import { useState } from 'react';
import axios from '../utils/axios';
import QRCode from 'qrcode.react';
import API from '../utils/api'; // your path may differ


const AdminAttendancePanel = ({ eventId }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateOTP = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(`/events/${eventId}/generate-otp`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setOtp(res.data.otp);
    } catch (err) {
      alert('Failed to generate OTP');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">Admin Attendance Panel</h2>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={handleGenerateOTP}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate OTP'}
      </button>

      {otp && (
        <>
          <div className="text-center text-lg font-mono">OTP: {otp}</div>
          <div className="flex justify-center mt-4">
            <QRCode value={`${API.replace('/api', '')}/attendance/${eventId}?otp=${otp}`} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAttendancePanel;

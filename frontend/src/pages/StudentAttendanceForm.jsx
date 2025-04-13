import {useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from '../utils/axios';

const StudentAttendanceForm = () => {
    const {eventId} = useParams();
    const [searchParams] = useSearchParams();
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const otpFromUrl = searchParams.get('otp');
        if (otpFromUrl) setOtp(otpFromUrl); 
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try{
            const token = localStorage.getItem('token');
            const res = await axios.post(`/events/mark-attendance/${eventId}`, { otp }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setMessage(res.data.message || 'Attendance Marked Successfully');
        } catch(err){
            console.error(err);
            setMessage(err.response?.data?.message || 'Failed to mark attendance.');
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div className='max-w-md mx-auto p-6 mt-10 bg-white shadow-md rounded-xl space-y-5'>
            <h2 className='text-xl font-bold text-center'> Mark Your Attendance</h2>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label className='block mb-1 font-medium'>Enter OTP</label>
                    <input  
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className='w-full border rounded px-3 py-2'
                        required
                        placeholder='4-digit-otp'
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition'
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>

            </form>

            {message && (
                <div className="text-center text-sm mt-4 font-semibold text-blue-600">
                    {message}
                </div>
            )}Otp
        </div>
    )

}

export default StudentAttendanceForm;
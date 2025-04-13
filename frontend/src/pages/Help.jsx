import {useState} from 'react';
import Navbar from "../components/Navbar";
import axios from "../utils/axios";

const Help = () => {
    const [help, setHelp] = useState({ subject: '', message: ''});
    const [request, setRequest] = useState({ subject: '', message: ''});
    const [statusMessage, setStatusMessage] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    

    const handleHelpSend = () => {
        console.log('sending help: ', help);
        // maki api call
        alert('This feature is coming soon')
    }

    const handleRequestSend = async () => {
        try{
            const token = localStorage.getItem('token');
            const res = await axios.post('/unblacklist', request, {
                headers : {Authorization: `bearer ${token}`}
            })
            setRequestMessage(res.data.message || 'Request Sent Successfully')
        }catch (err) {
            setRequestMessage(err.response?.data?.message || 'Failed to send request');
        }
    };

    const handleCheckStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/auth/check-blacklist', {
                headers: {Authorization: `Bearer ${token}`}
            })
            setStatusMessage(res.data.message || "Fetched Status");
        } catch(err) {
            setStatusMessage(err.response?.data?.message || "Failed to fetch status");
        }
    }
    return(
        <div>
            <Navbar />
            <div className="p-6 space-y-8 max-w-5xl mx-auto">
                <div className="rounded-xl border p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                    <input 
                        type="text"
                        placeholder="Subject"
                        value={help.subject}
                        onChange={(e) => setHelp({ ...help, subject: e.target.value })}
                        className="w-full p-2 border rounded mb-3"
                    />
                    <textarea
                        placeholder="Your message..."
                        value = {help.message}
                        onChange={(e) => setHelp({...help, message: e.target.value})}
                        className="w-full p-2 border rounded mb-3"
                    />
                    <button
                        onClick={handleHelpSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >Send</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Request</h3>
                    <input  
                        type="text"
                        placeholder="Subject"
                        value={request.subject}
                        onChange={(e) => setRequest({ ...request, subject: e.target.value})}
                        className="w-full p-2 border rounded mb-3"
                    />
                    <textarea
                        placeholder="Reason"
                        value={request.message}
                        onChange={(e) => setRequest({ ...request, message: e.target.value})}
                        className="w-full p-2 border rounded mb-3 h-32"
                    />
                    <button
                        onClick={handleRequestSend}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >Send</button>
                    {requestMessage &&  (
                        <p className='mt-3 text-sm text-blue-700'>{requestMessage}</p>
                    )}
                </div>
                <div className="rounded-xl border p-6 shadow-lg flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-semibold mb-4">Are you Blacklisted?</h3>
                    <button 
                    onChange={handleCheckStatus}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                        Check Status
                    </button>
                    {statusMessage && (
                            <p className="mt-3 text-sm text-blue-700">{statusMessage}</p>
                    )}
                </div>
            </div>

        </div>
    )
};

export default Help;
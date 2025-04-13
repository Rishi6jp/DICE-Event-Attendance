import React , {useState, useEffect} from 'react';
import axios from '../utils/axios'


const RegistrationForm = ({ eventId, onClose}) => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`/events/${eventId}`);
                setFormFields(res.data.form_fields || []);
            } catch (err) {
                console.error('Error fetching event fields:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const answers = Object.entries(formData).map(([label, answer]) => ({ label, answer }));

        try {
            const token = localStorage.getItem('token');
            await axios.post(`/registration/${eventId}`, { answers }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Successfully Registered');
            onClose();
        } catch (err) {
            console.error('Registration Error:', err);
            alert('Failed to Register');
        }
    };

    if (loading) return <p>Loading form...</p>;

    return(
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-5"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Event Registration Form</h2>

            {formFields.map((field, idx) => (
                <div key={idx}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>

                    {field.type === 'radio' ? (
                        <div className="flex gap-4">
                            {field.options.map((option, i) => (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name={field.label}
                                        value={option}
                                        checked={formData[field.label] === option}
                                        onChange={handleChange}
                                    />{" "}
                                    {option}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <input
                            type={field.type || 'text'}
                            name={field.label}
                            value={formData[field.label] || ''}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    )}
                </div>
            ))}

            <div className="flex justify-between mt-4">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    )


}

export default RegistrationForm;
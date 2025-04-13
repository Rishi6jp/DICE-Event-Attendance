import React, {useState} from 'react';
import api from '../utils/axios';

function CreateEvent() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        event_date: '',
    });

    const handleChange = async (e) => {
        setForm({... form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log('Sending to backend');
            await api.post('/events', form);
            console.log('reached backend');
            alert('Event Created!');
            setForm({ title: '', description: '', event_date: ''});
        } catch(err) {
            alert(err.response?.data?.message || 'Error creating Event');
        }
    };

    return(
        <div className = "max-w-md mx-auto mt-10 px-4">
            <h2 className = "text-2xl font-bold mb-6" >Create Event</h2>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name='title'
                    placeholder='Event title'
                    className = 'w-full p-2 border rounded'
                    value = {form.title}
                    onChange={handleChange}
                />
                <textarea 
                    name="description" 
                    placeholder='Description'
                    className='w-full p-2 border rounded'
                    value = {form.description}
                    onChange={handleChange}   
                />
                <input
                    type='date'
                    name='event_date'
                    className='w-full p-2 border rounded'
                    value = {form.event_date}
                    onChange={handleChange}
                />
                <button 
                    type='submit'
                    className = 'w-full bg-indigo-600 text-white p-2 rounded font-semibold'
                >Create Event</button>
            </form>
        </div>
    )


}

export default CreateEvent;
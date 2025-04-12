import React, {useState, useEffect} from 'react';
import api from '../utils/axios';

function EventList() {
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try{
                const res = await api.get('/events');
                setEvent(res.data);
            } catch (err) {
                console.error('Error fetching the event:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, []);

    if(loading) return <div>loading Event...</div>
    return (
        <div className='max-w-4xl mx-auto mt-10 px-4'>
            
            <h2 className='text-2xl font-bold mb-6' >All Events</h2>
            <ul className='space-y-4'>
                {event.map(event => (
                    <li key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Date: {new Date(event.date).toLocaleDateString() } </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventList;
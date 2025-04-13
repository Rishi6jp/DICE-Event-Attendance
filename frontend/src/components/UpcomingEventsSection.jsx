import React, {useEffect, useState} from 'react';
import {fetchEvent } from '../api/event';
import EventCard from './EventCard';

const UpcomingEventsSection = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const getEvents = async() => {
            try{
                const res = await fetchEvent();
                const now = new Date();
                const upcoming = res.data.filter(event => new Date(event.event_date) > now);
                setUpcomingEvents(upcoming.slice(0,3));
            } catch(err) {
                console.err("Error fetching events:", err);
            }
        };
        getEvents();
    }, []);

    return(
        <div className='mt-8 px-4'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Upcoming Events</h2>
            <div>
                {upcomingEvents.map(event => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onRegisterClick={() => console.log("Register:", event._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default UpcomingEventsSection;
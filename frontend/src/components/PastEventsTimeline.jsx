import React, { useEffect, useState, useRef } from 'react';
import { fetchEvent } from '../api/event';

const PastEventsTimeline = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetchEvent();
        const now = new Date();
        const past = res.data.filter(event => new Date(event.event_date) < now);
        setPastEvents(past.reverse());
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroll = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', scroll, { passive: false });
    return () => el.removeEventListener('wheel', scroll);
  }, []);

  return (
    <div className="mt-16 px-4">
      <h2 className='text-2xl font-bold mb-4 text-center'>Timeline</h2>
      <div
        ref={containerRef}
        className='flex gap-6 overflow-x-auto no-scrollbar pb-6'
        style={{ scrollBehavior: 'smooth' }}
      >
        {pastEvents.length === 0 ? (
          <p className="text-center text-gray-500">No past events found</p>
        ) : (
          pastEvents.map(event => (
            <div
              key={event._id}
              className="min-w-[250px] bg-white shadow-md rounded-xl p-4"
            >
              <p className="text-sm text-gray-500">{new Date(event.event_date).toDateString()}</p>
              <h3 className="font-semibold mt-1">{event.title}</h3>
              <p className="text-sm text-gray-700 mt-2">
                {event.description.slice(0, 100)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PastEventsTimeline;

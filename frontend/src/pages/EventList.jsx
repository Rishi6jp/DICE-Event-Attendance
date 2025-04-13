import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/Searchbar';
import EventCard from '../components/EventCard';
import axios from '../utils/axios';
import RegistrationForm from './Registration';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState({});
  const [selectEventId, setSelectEventId] = useState(null);

  const handleRegister = (eventId) => {
    setSelectEventId(eventId);
  }

  useEffect(() => {
    axios.get('/events')
      .then(res => {
        const grouped = groupByMonth(res.data);
        setEvents(res.data);
        setFiltered(grouped);
      })
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const handleSearch = (query) => {
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(groupByMonth(filteredEvents));
  };

  const groupByMonth = (events) => {
    return events.reduce((acc, event) => {
      const month = new Date(event.date).toLocaleString('default', { month: 'long' });
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {});
  };

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      <div className="px-6">
        {Object.keys(filtered).map(month => (
          <div key={month} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{month}</h2>
            <div className="flex flex-wrap gap-6">
              {filtered[month].map(event => (
                <EventCard key={event._id} event={event} 
                onRegisterClick = {handleRegister}/>
              ))}
            </div>
          </div>
        ))}

        {selectEventId && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                <RegistrationForm
                    eventId={selectEventId}
                    onClose={() => setSelectEventId(null)}
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

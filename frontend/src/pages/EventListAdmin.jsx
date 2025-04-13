import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function EventListAdmin({ search }) {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateFrom: '',
    dateTo: '',
    time: '',
    formQuestions: '',
    poster: null,
  });

  useEffect(() => {
    // Dummy event list — replace with fetch API call
    setEvents([
      { id: 1, title: 'Tech Fest', description: 'Annual fest', dateFrom: '2025-04-15', dateTo: '2025-04-17' },
      { id: 2, title: 'Workshop', description: 'Skill building session', dateFrom: '2025-04-20', dateTo: '2025-04-21' },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      setFormData({ ...formData, poster: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Event Created:', formData);
    // Add your API logic to POST new event
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* CREATE EVENT FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Create New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            name="poster"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="formQuestions"
            placeholder="Form Questions (comma separated)"
            value={formData.formQuestions}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* EVENT LIST */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Event List</h2>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center p-4 border rounded hover:shadow"
              >
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500">
                    {event.dateFrom} to {event.dateTo}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventListAdmin;

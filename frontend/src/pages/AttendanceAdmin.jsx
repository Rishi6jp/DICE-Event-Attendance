import React, { useState } from 'react';

const dummyEvents = [
  { id: 1, title: 'Tech Fest 2025', date: '2025-04-18', description: 'Main annual event' },
  { id: 2, title: 'AI Workshop', date: '2025-04-21', description: 'Hands-on ML and AI' },
];

function AttendanceAdmin({ search }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = dummyEvents.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-6">
      {/* LEFT: Event List */}
      <div className="w-1/3 space-y-4">
        <h2 className="text-xl font-semibold mb-2">All Events</h2>
        {filteredEvents.length === 0 ? (
          <p>No matching events</p>
        ) : (
          <ul className="space-y-2">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className={`p-3 border rounded cursor-pointer hover:shadow ${
                  selectedEvent?.id === event.id ? 'bg-indigo-100' : 'bg-white'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT: Details View */}
      <div className="flex-1">
        {selectedEvent ? (
          <EventAttendanceView event={selectedEvent} />
        ) : (
          <p className="text-gray-500 mt-6">Select an event to view details.</p>
        )}
      </div>
    </div>
  );
}

function EventAttendanceView({ event }) {
  // Dummy data
  const attendees = ['John Doe', 'Jane Smith', 'Amit Kumar'];
  const absentees = ['Ravi Patel', 'Sara Ali'];

  const isLive = true;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold">{event.title}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-gray-400 mb-2">Date: {event.date}</p>

      {isLive && (
        <div className="space-x-4 mb-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Generate OTP
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Generate QR Code
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">✅ Attendees</h3>
          <ul className="list-disc list-inside text-sm text-green-700">
            {attendees.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">❌ Absentees</h3>
          <ul className="list-disc list-inside text-sm text-red-700">
            {absentees.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AttendanceAdmin;

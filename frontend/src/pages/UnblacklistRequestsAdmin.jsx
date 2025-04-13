import React, { useState } from 'react';

// 🧪 DUMMY DB - right at the top
const dummyUnblacklistDB = [
  {
    id: 1,
    student: { name: 'Amit Verma', email: 'amit@example.com' },
    subject: 'Apology for missing events',
    message: 'I was sick and couldn’t attend. Please consider unblacklisting me.',
    status: 'pending',
  },
  {
    id: 2,
    student: { name: 'Kavya Singh', email: 'kavya@example.com' },
    subject: 'Missed due to exams',
    message: 'I had exams and couldn’t attend the event.',
    status: 'pending',
  },
  {
    id: 3,
    student: { name: 'Ravi Patel', email: 'ravi@example.com' },
    subject: 'Technical Issues',
    message: 'Could not join due to network issues.',
    status: 'approved',
  },
];

function UnblacklistRequestsAdmin({ search }) {
  const [requests, setRequests] = useState(dummyUnblacklistDB);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = requests.filter((req) =>
    req.student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDecision = (id, decision) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: decision } : req
    );
    setRequests(updated);
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: decision });
    }
  };

  const getStatusBadge = (status) => {
    const base = 'text-xs px-2 py-1 rounded-full font-semibold';
    switch (status) {
      case 'approved':
        return `${base} bg-green-100 text-green-700`;
      case 'rejected':
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-yellow-100 text-yellow-700`;
    }
  };

  return (
    <div className="flex gap-6">
      {/* LEFT SIDE - LIST */}
      <div className="w-1/3 space-y-4">
        <h2 className="text-xl font-bold">Unblacklist Requests</h2>
        {filteredRequests.length === 0 ? (
          <p className="text-gray-500">No matching requests.</p>
        ) : (
          <ul className="space-y-2">
            {filteredRequests.map((req) => (
              <li
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`p-3 border rounded cursor-pointer hover:shadow ${
                  selectedRequest?.id === req.id ? 'bg-yellow-100' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{req.student.name}</h3>
                    <p className="text-sm text-gray-500">{req.subject}</p>
                  </div>
                  <span className={getStatusBadge(req.status)}>
                    {req.status.toUpperCase()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="flex-1">
        {selectedRequest ? (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-bold mb-2">{selectedRequest.student.name}</h2>
            <p className="text-gray-600">Email: {selectedRequest.student.email}</p>
            <p className="text-gray-500">Subject: {selectedRequest.subject}</p>
            <div className="bg-gray-50 border p-4 rounded mt-2 text-gray-700">
              {selectedRequest.message}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className={getStatusBadge(selectedRequest.status)}>
                {selectedRequest.status.toUpperCase()}
              </span>

              {selectedRequest.status === 'pending' && (
                <div className="space-x-4">
                  <button
                    onClick={() => handleDecision(selectedRequest.id, 'approved')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(selectedRequest.id, 'rejected')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">Select a request to view and take action.</p>
        )}
      </div>
    </div>
  );
}

export default UnblacklistRequestsAdmin;

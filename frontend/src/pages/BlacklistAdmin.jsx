import React, { useState } from 'react';

const dummyBlacklistedUsers = [
  { id: 1, name: 'Rohit Sharma', email: 'rohit@example.com', reason: '3 no-shows' },
  { id: 2, name: 'Anjali Mehta', email: 'anjali@example.com', reason: 'Missed 2 major events' },
];

function BlacklistAdmin({ search }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = dummyBlacklistedUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-6">
      {/* LEFT: List of Blacklisted Users */}
      <div className="w-1/3 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Blacklisted Students</h2>
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className={`p-3 border rounded cursor-pointer hover:shadow ${
                  selectedUser?.id === user.id ? 'bg-red-100' : 'bg-white'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT: Selected User Details */}
      <div className="flex-1">
        {selectedUser ? (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
            <p className="text-gray-600">Email: {selectedUser.email}</p>
            <p className="text-gray-500">Reason: {selectedUser.reason}</p>

            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Unblacklist Student
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">Select a student to view details.</p>
        )}
      </div>
    </div>
  );
}

export default BlacklistAdmin;

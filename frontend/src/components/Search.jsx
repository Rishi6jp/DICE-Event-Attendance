import React, { useState } from 'react';

// Reusable Search Component
const SearchBar = ({ label, placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle the input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle the search action (can be triggered on enter or when input changes)
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-md max-w-md mx-auto">
      {/* Label (Optional) */}
      {label && <label className="font-semibold">{label}</label>}

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger on enter key
        placeholder={placeholder || 'Search...'}
        className="p-2 border rounded-md w-full"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center space-x-2">
      <label>Search:</label>
      <input
        type="text"
        className="border rounded-md px-2 py-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;

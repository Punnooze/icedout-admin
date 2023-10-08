import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="tw-flex tw-items-center tw-space-x-2">

      <input
        type="text"
        className="tw-border tw-rounded-md tw-w-[100%] tw-px-2 tw-tw-py-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;

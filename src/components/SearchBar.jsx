import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from "@/components/ThemeProvider";

const SearchBar = ({ onSearch, data }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm && !isItemSelected) {
      const filtered = data.filter(item =>
        item.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, data, isItemSelected]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsItemSelected(false);
    
    if (value.length > 0) {
      const filtered = data.filter(item =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredData(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleItemClick = (item) => {
    setSearchTerm(item);
    setShowDropdown(false);
    setIsItemSelected(true);
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowDropdown(false);
    setIsItemSelected(true);
  };

  const handleInputFocus = () => {
    if (searchTerm && !isItemSelected) {
      setShowDropdown(filteredData.length > 0);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full px-4 py-2 pr-10 rounded-md bg-background text-foreground border border-input"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      {showDropdown && (
        <ul className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredData.map((item, index) => (
            <li
              key={index}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleItemClick(item)}
              className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
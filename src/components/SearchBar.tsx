import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      navigate(`/pokemon/${search.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex justify-center">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for a Pokemon..." className="px-4 py-2 border border-gray-300 rounded-l" />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

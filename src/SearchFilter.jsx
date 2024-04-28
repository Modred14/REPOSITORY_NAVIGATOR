import React from "react";

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={filterValue} onChange={handleFilterChange}>
        <option value="">Filter by...</option>
        <option value="description">Description</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
      </select>
    </div>
  );
};

export default SearchFilter;

import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form>
      <label className="input shadow-md flex items-center gap-2">
        <Search size={"24"} />
        <input
          type="text"
          placeholder="Search jobs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </label>
    </form>
  );
};

export default SearchBar;

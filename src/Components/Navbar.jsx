import { useState } from "react";
import { GalleryVerticalEnd, Search, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const addNewJobForm = () => {};

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-direction: row gap-2">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Link to={"/addJob"} className="btn btn-outline bg-black text-white">
        <Plus className="w-5 h-5 text-white" />
        Add Jobs
      </Link>

      <Link to={"/viewGraph"}>
        <button className="btn btn-outline bg-black text-white">
          <GalleryVerticalEnd className="w-5 h-5 text-white" />
          View Graph
        </button>
      </Link>
    </div>
  );
};

export default Navbar;

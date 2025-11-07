import React from "react";
import { DebounceInput } from "react-debounce-input";
import InputTextInDialog from "../dialogbox/InputTextInDialog.jsx";
function Searchbar({ handleChange, search }) {
  return (
    <div className="searchbar">
      <div className="divsearch">
        <i className="fas fa-search"></i>
        
        <DebounceInput
         type="search"
          minLength={2}
          debounceTimeout={300}
          onChange={handleChange}
          value={search}
          placeholder="Type to search..."
        />
      </div>
    </div>
  );
}

export default Searchbar;

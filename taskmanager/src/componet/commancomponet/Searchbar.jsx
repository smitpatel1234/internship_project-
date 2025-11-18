import React ,{useCallback, useState}from "react";
import InputTextInDialog from "../dialogbox/InputTextInDialog.jsx";
import { debounce } from "lodash";
function Searchbar({ handleChange }) {
   const [localSearch , setLocalSearch ] = useState()
   const handleDebounceChange =useCallback(debounce((value)=> handleChange(value),3000),[handleChange]);
   const noticeLocalChange= (e)=>{
        const {value} = e.target
            setLocalSearch(value);
            handleDebounceChange(value)
   }
  return (
    <div className="searchbar">
      <div className="divsearch">
        <i className="fas fa-search"></i>
        
        <input
          type="search"
          onChange={noticeLocalChange}
          value={localSearch}
          placeholder="Type to search..."
        />
      </div>
    </div>
  );
}

export default Searchbar;

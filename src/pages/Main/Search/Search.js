import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

const Search = props => {
  const { handleSearchTerm } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const debounce = (callback, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  //setting input state after user stops typing for 1 second
  const updateDebouceInput = debounce(input => {
    setSearchTerm(input);
  }, 1000);

  const handleChange = e => {
    updateDebouceInput(e.target.value);
  };

  //waiting for debounce to set searchTerm before callback
  useEffect(() => {
    handleSearchTerm(searchTerm);
  }, [searchTerm, handleSearchTerm]);

  return (
    <>
      <TextField
        id="search"
        placeholder="Search..."
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </>
  );
};

export default Search;

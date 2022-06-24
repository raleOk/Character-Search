import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useCallback } from "react";
import { fetchCharacters } from "../../../api/api";

const Search = props => {
  const {
    handleSearchTerm,
    setListItems,
    handleOpenError,
    handleErrorMessage,
  } = props;

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

  //calls page 1 of searchTerm
  const onSearch = useCallback(
    async searchTerm => {
      try {
        const response = await fetchCharacters(searchTerm);
        const data = response.data;
        setListItems(data.results);
        return;
      } catch (err) {
        handleErrorMessage("Something went wrong!");
        handleOpenError(true);
      }
    },
    [setListItems]
  );

  //waiting for debounce to set searchTerm before callback
  useEffect(() => {
    handleSearchTerm(searchTerm);
    onSearch(searchTerm);
  }, [searchTerm, handleSearchTerm, onSearch]);

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
        sx={{ m: 0.5, mr: 1 }}
      />
    </>
  );
};

export default Search;

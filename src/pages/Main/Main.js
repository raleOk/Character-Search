import { useState, useCallback } from "react";
import { fetchCharacters } from "../../api/api";
import CharacterList from "./CharacterList/CharacterList";
import Search from "./Search/Search";
import useFetchOnScroll from "../../hooks/useFetchOnScroll";
import { Grid, Typography } from "@mui/material";

const Main = () => {
  //rendered state
  const [listItems, setListItems] = useState([]);

  //search state
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = useCallback(input => {
    setSearchTerm(input);
    setPage(2);
  }, []);

  //scroll pagination state and handlers
  //page is 2 because Search.js always calls the 1st page, so 2 is the one pagination should call
  const [page, setPage] = useState(2);

  const fetchData = useCallback(
    async (searchTerm, page) => {
      try {
        const response = await fetchCharacters(searchTerm, page);
        const listData = response.data.results;
        const paginationData = response.data.info;

        //check if next page is null and stops execution
        if (paginationData.next === null) {
          setIsFetching(false);
          return;
        }
        //increasing page number for next call
        setPage(prevState => {
          return prevState + 1;
        });
        //setting rendered state
        setListItems(prevState => {
          return [...prevState, ...listData];
        });
        setIsFetching(false);
        return;
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    },
    [searchTerm]
  );

  const [isFetching, setIsFetching] = useFetchOnScroll(
    fetchData,
    searchTerm,
    page
  );

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Search
          handleSearchTerm={handleSearchTerm}
          setListItems={setListItems}
        />
      </Grid>
      <Grid item>
        <CharacterList listItems={listItems} />
      </Grid>
      <Grid item>
        {" "}
        {isFetching ? (
          <Typography variant="h6">Loading more...</Typography>
        ) : (
          <Typography variant="h6">No more characters.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Main;

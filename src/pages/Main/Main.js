import { useState, useCallback } from "react";
import { fetchCharacters } from "../../api/api";
import CharacterList from "./CharacterList/CharacterList";
import Search from "./Search/Search";
import useFetchOnScroll from "../../hooks/useFetchOnScroll";
import { Grid, Typography, AppBar } from "@mui/material";
import ErrorAlert from "../../components/ErrorAlert";

const Main = () => {
  //rendered state
  const [listItems, setListItems] = useState([]);

  //search state
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = useCallback(input => {
    setSearchTerm(input);
    setPage(2);
  }, []);

  //error alert state and handlers
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => {
    setOpenError(false);
  };
  //handlers passed to Search.js
  const handleOpenError = () => {
    setOpenError(true);
  };

  const handleErrorMessage = msg => {
    setErrorMessage(msg);
  };

  //scroll pagination state and handlers
  //page is 2 because Search.js always calls the 1st page, so 2 is the one pagination should call
  const [page, setPage] = useState(2);
  const [noMorePages, setNoMorePages] = useState(false);

  const fetchData = useCallback(
    async (searchTerm, page) => {
      try {
        const response = await fetchCharacters(searchTerm, page);
        const listData = response.data.results;
        const paginationData = response.data.info;

        //check if next page is null; sets noMorePages to true and stops execution
        if (paginationData.next === null) {
          setNoMorePages(true);
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
        //makes sure that noMorePages is false if the next page is not null
        setNoMorePages(false);
        setIsFetching(false);
        return;
      } catch (err) {
        setIsFetching(false);
        setErrorMessage("Something went wrong!");
        setOpenError(true);
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
      <AppBar position="fixed" style={{ background: "white" }}>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h5" color="textSecondary" sx={{ ml: 1 }}>
              Characters
            </Typography>
          </Grid>
          <Grid item>
            <Search
              handleSearchTerm={handleSearchTerm}
              setListItems={setListItems}
              handleOpenError={handleOpenError}
              handleErrorMessage={handleErrorMessage}
            />
          </Grid>
        </Grid>
      </AppBar>
      <Grid item sx={{ mt: 5 }}>
        <CharacterList listItems={listItems} />
      </Grid>
      <Grid item>
        {isFetching && <Typography variant="h6">Loading more...</Typography>}
        {noMorePages && <Typography variant="h6">No more pages.</Typography>}
      </Grid>
      <Grid item>
        <ErrorAlert
          openError={openError}
          handleCloseError={handleCloseError}
          handleErrorMessage={errorMessage}
        />
      </Grid>
    </Grid>
  );
};

export default Main;

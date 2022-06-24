import { useState, useCallback } from "react";
import { fetchCharacters } from "../../api/api";
import CharacterList from "./CharacterList/CharacterList";
import Search from "./Search/Search";
import useFetchOnScroll from "../../hooks/useFetchOnScroll";
import { Grid, Typography, AppBar } from "@mui/material";
import Loader from "../../components/Loader";
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
        //makes sure that noMorePages is false if the next page is not null
        setNoMorePages(false);
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
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} align="center">
            <Typography variant="h5" color="textSecondary">
              Characters
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} align="center">
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
        {isFetching && <Loader />}
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

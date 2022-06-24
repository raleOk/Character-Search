import { IconButton, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacter } from "../../api/api";
import Loader from "../../components/Loader";
import CharacterCard from "../Main/CharacterList/CharacterCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EpisodeList from "./EpisodeList";
import ErrorAlert from "../../components/ErrorAlert";

const CharacterProfile = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  //character id that gets passed to fetchCharacters
  const params = useParams();
  const charId = params.characterId;

  //character state
  const [character, setCharacter] = useState({});

  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //error alert state and handlers
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => {
    setOpenError(false);
  };

  //episodeList state
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCharacter(charId);
        const data = response.data;
        const episodes = data.episode;
        setCharacter(data);
        setListItems(episodes);
        setIsLoading(false);
        return;
      } catch (err) {
        setIsLoading(false);
        setErrorMessage("Something went wrong!");
        setOpenError(true);
      }
    };
    fetchData();
  }, [charId]);

  return (
    <>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>

      <Grid container spacing={6}>
        <Grid
          item
          container
          direction="column"
          align="center"
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid item>
            {isLoading ? (
              <Loader />
            ) : (
              <CharacterCard
                name={character.name}
                image={character.image}
                species={character.species}
                origin={character.origin.name}
                location={character.location.name}
                status={character.status}
                avatarSize="180px"
                cardParams={[{ maxWidth: 400, minWidth: 200 }]}
              />
            )}
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          align="center"
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <EpisodeList listItems={listItems} />
        </Grid>
        <Grid item>
          <ErrorAlert
            openError={openError}
            handleCloseError={handleCloseError}
            handleErrorMessage={errorMessage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CharacterProfile;

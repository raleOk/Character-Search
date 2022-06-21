import { IconButton, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacter } from "../../api/api";
import Loader from "../../components/Loader";
import CharacterCard from "../Main/CharacterList/CharacterCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EpisodeList from "./EpisodeList";

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
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [charId]);
  //STOP HERE
  return (
    <>
      <Grid container spacing={5}>
        <Grid
          item
          container
          direction="column"
          justifyContent="top"
          spacing={2}
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid item>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
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
              />
            )}
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <EpisodeList listItems={listItems} />
        </Grid>
      </Grid>
    </>
  );
};

export default CharacterProfile;

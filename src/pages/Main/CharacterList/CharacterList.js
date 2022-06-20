import { Grid } from "@mui/material";
import CharacterListItem from "./CharacterListItem";

const CharacterList = props => {
  const { listItems } = props;

  const list = listItems.map(el => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={el.id}>
        <CharacterListItem
          name={el.name}
          image={el.image}
          species={el.species}
          origin={el.origin.name}
          location={el.location.name}
          status={el.status}
        />
      </Grid>
    );
  });

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ mt: 1 }}
      >
        {list}
      </Grid>
    </>
  );
};

export default CharacterList;

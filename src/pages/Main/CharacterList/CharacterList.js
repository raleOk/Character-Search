import { Grid } from "@mui/material";
import CharacterCard from "./CharacterCard";

const CharacterList = props => {
  const { listItems } = props;

  const list = listItems.map(el => {
    return (
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="center"
        xs={12}
        sm={6}
        md={4}
        lg={4}
        xl={4}
        key={el.id}
      >
        <CharacterCard
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
      <Grid container spacing={5} sx={{ mt: 1 }}>
        {list}
      </Grid>
    </>
  );
};

export default CharacterList;

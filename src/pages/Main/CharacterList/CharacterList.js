import { Grid } from "@mui/material";
import CharacterCard from "./CharacterCard";
import { useNavigate } from "react-router-dom";

const CharacterList = props => {
  const { listItems } = props;

  const navigate = useNavigate();

  const handleClick = char => {
    navigate(`character/${char.id}`);
  };

  //mapping through state from Main.js
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
        <Grid
          item
          onClick={() => {
            handleClick(el);
          }}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <CharacterCard
            name={el.name}
            image={el.image}
            species={el.species}
            origin={el.origin.name}
            location={el.location.name}
            status={el.status}
            avatarSize="70px"
            cardParams={[{ minWidth: 300, maxHeight: 190 }]}
          />
        </Grid>
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

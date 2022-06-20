import { Card, Avatar, Typography } from "@mui/material";

const CharacterListItem = props => {
  const { name, image, species, origin, location, status } = props;
  return (
    <>
      <Card>
        <Avatar sx={{ height: "100px", width: "100px" }} src={image} />
        <Typography>Name: {name}</Typography>
        <Typography>{species}</Typography>
        <Typography>Origin: {origin}</Typography>
        <Typography>Location: {location}</Typography>
        <Typography>Status: {status}</Typography>
      </Card>
    </>
  );
};

export default CharacterListItem;

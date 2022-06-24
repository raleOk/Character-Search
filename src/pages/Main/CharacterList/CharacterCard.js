import {
  Card,
  Avatar,
  Typography,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const CharacterCard = props => {
  const {
    name,
    image,
    species,
    origin,
    location,
    status,
    avatarSize,
    cardParams,
  } = props;

  return (
    <>
      <Card sx={cardParams[0]} elevation={2}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ height: `${avatarSize}`, width: `${avatarSize}` }}
              src={image}
            />
          }
          title={name}
          subheader={species}
          action={
            //these attributes in IconButton disable the effects that appear when you hover over it
            <IconButton disableRipple sx={{ pointerEvents: "none" }}>
              {status === "Alive" && <CheckBoxIcon />}
              {status === "Dead" && <CheckBoxOutlineBlankIcon />}
              {status === "unknown" && <QuestionMarkIcon />}
            </IconButton>
          }
        />
        <CardContent>
          <Typography sx={{ fontSize: 14.5 }}>Origin: {origin}</Typography>
          <Typography sx={{ fontSize: 14.5 }}>Location: {location}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CharacterCard;

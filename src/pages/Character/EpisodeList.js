import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";

const EpisodeList = props => {
  const { listItems } = props;

  return (
    <List
      sx={{ maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>Episodes:</ListSubheader>}
    >
      {listItems.map((el, index) => {
        return (
          <ListItem key={index}>
            <ListItemText primary={el} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default EpisodeList;

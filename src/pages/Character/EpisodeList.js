import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Link,
  Paper,
} from "@mui/material";

const EpisodeList = props => {
  const { listItems } = props;

  return (
    <Paper
      sx={{
        maxHeight: 700,
        width: 380,
        minWidth: 200,
        overflow: "auto",
      }}
    >
      <List subheader={<ListSubheader>Episodes:</ListSubheader>}>
        {listItems.map((el, index) => {
          return (
            <ListItem key={index}>
              <Link href="#" underline="none">
                <ListItemText primary={el} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default EpisodeList;

import { getCharacters } from "../../../api/api";
import { Button } from "@mui/material";

const Search = () => {
  const handleClick = async () => {
    try {
      const response = await getCharacters();
      const data = response.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button type="button" onClick={handleClick}>
        Get Characters!
      </Button>
    </>
  );
};

export default Search;

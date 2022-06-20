import { useState, useEffect, useCallback } from "react";
import { fetchCharacters } from "../../api/api";
import CharacterList from "./CharacterList/CharacterList";
import Search from "./Search/Search";
import Loader from "../../components/Loader";

const Main = () => {
  //rendered state
  const [listItems, setListItems] = useState([]);

  //search state
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = input => {
    setSearchTerm(input);
  };

  //pagination state
  const [pagination, setPagination] = useState([]);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchCharacters(searchTerm);
      const data = response.data;
      setListItems(data.results);
      setPagination(data.info);
      setIsLoading(false);
      return;
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Search handleSearchTerm={handleSearchTerm} />
      {isLoading ? (
        <Loader />
      ) : (
        <CharacterList listItems={listItems} pagination={pagination} />
      )}
    </>
  );
};

export default Main;

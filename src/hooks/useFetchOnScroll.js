import { useState, useEffect, useCallback } from "react";

const useFetchOnScroll = (fetchCharactersOnScroll, searchTerm, page) => {
  const [isFetching, setIsFetching] = useState(false);

  //calculates if user scrolled to the bottom, sets isFetching to true if so
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }, [isFetching]);

  //listening for the user to scroll to the bottom
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  //executing callback when isFetching gets set to true
  useEffect(() => {
    if (!isFetching) return;
    fetchCharactersOnScroll(searchTerm, page);
  }, [isFetching, fetchCharactersOnScroll, searchTerm, page]);

  return [isFetching, setIsFetching];
};

export default useFetchOnScroll;

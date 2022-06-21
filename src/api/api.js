import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

//get all characters or sort by name
const fetchCharacters = async (name = "", page = 1) => {
  return axiosInstance.get(`character?page=${page}&name=${name}`);
};

//get one characer by id
const fetchCharacter = async id => {
  return axiosInstance.get(`character/${id}`);
};

export { fetchCharacters, fetchCharacter };

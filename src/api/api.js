import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const getCharacters = async (name = "", page = 1) => {
  return axiosInstance.get(`character?page=${page}&name=${name}`);
};

export { getCharacters };

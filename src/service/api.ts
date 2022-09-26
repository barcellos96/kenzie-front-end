import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-desafio-kenzie.herokuapp.com",
});

import axios from "axios";

const API = axios.create({
  baseURL: "https://6a106759d2a985707036bfbb.mockapi.io/materials",
});

export default API;
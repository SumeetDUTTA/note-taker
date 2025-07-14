import axios from "axios";

// In development, use the local server URL
// In production, use the relative path to the API
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});



export default api;

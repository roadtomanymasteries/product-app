import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

export const HttpClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

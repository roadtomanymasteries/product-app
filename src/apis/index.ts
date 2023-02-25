import axios from 'axios';

const baseURL = 'http://localhost:6060/api/';

export const HttpClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

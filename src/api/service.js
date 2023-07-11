import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
// const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://ec2-13-48-133-198.eu-north-1.compute.amazonaws.com:3001/';

const api = axios.create({
  baseURL: API_ENDPOINT,
});

export default api;

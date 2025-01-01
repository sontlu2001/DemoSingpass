import axios from 'axios';

const {VITE_STRAPI_BASE_URL} = import.meta.env;

const jwt = sessionStorage.getItem('jwt');

const headers = {
  'Content-Type': 'application/json',
}

if (jwt) {
  headers['Authorization'] = `Bearer ${jwt}`;
}



const api = axios.create({
  baseURL: `${VITE_STRAPI_BASE_URL}`,
  headers
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aspnetdeploy-poke-trader.azurewebsites.net/api',
});

export default api;

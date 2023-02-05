import axios from 'axios';

const API_KEY = '0RcTZ7iKRjVY2pNIYZub6vbjtZV5Fh5kxNzRbjQ2bIv9wKrPnRcujwdf';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = (query, page) => {
  return axios(`search?query=${query}&page=${page}`);
};

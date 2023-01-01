import axios from 'axios';
import Constants from '../utils/Constants';

const Axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const Api = {
  fetchNowPlaying: async (page = 1) => {
    return await Axios.get('/movie/now_playing', {
      params: {
        api_key: Constants.ApiKey,
        page: page,
      },
    });
  },
  fetchTopRated: async (page = 1) => {
    return await Axios.get('/movie/top_rated', {
      params: {
        api_key: Constants.ApiKey,
        page: page,
      },
    });
  },
};

export default Api;

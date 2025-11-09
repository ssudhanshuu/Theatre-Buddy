// utils/tmdbClient.js
const axios = require('axios');
const axiosRetry = require('axios-retry');
require('dotenv').config();

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  params: {
    api_key: process.env.TMDB_API_KEY        // for v3
  },
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` // if you prefer v4
  }
});

axiosRetry(tmdb, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    error.code === 'ECONNRESET'
});

module.exports = tmdb;
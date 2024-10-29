const axios = require("axios");

const httpClient = axios.create({
  baseURL: process.env.BASE_URL ?? "http://localhost:3000/api",
});

module.exports = httpClient;

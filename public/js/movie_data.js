"use trict";

const axios = require("axios");
require("dotenv").config()
const moviedb_api_key = process.env.APIKEY;
const moviedb_base_url = "https://api.themoviedb.org/3";

const mediaType = (title) => {
  // Title will be passed as m-626, so the fisrt .substr(0) is to see if it is a movie or series
  if (title.substr(0, 1) === "m") {
    return "/movie/";
  } else {
    return "/tv/";
  }
};

exports.searchMulti = async function (title) {
  try {
    const params = { params: { api_key: moviedb_api_key, query: title } };
    const response = await axios.get(
      moviedb_base_url + "/search/multi",
      params
    );
    return response.data.results;
  } catch (e) {
    console.log("SearchMulti has show an Error");
    //If there is nothing to return, return an empty array to prevent itterable error
    return [];
  }
};

exports.searchMovie = async function (title) {
  // The second check .substr(2) looks at the title id to find the movie.series
  const media_type = mediaType(title);
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      moviedb_base_url + media_type + title.substr(2),
      params
    );
    return response.data;
  } catch (e) {
    console.log("SearchMovie has shown an Error");
  }
};

exports.trending = async function () {
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      moviedb_base_url + "/trending/all/week",
      params
    );
    return response.data.results;
  } catch (e) {
    console.log(e);
  }
};

exports.watchProviders = async function (title) {
  const media_type = mediaType(title);
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      moviedb_base_url + `/${media_type}/${title.substr(2)}/watch/providers`,
      params
    );
    return response.data.results["BE"]["flatrate"];
  } catch (e) {
    console.log("Error with watchProviders");
  }
};

exports.findSimilar = async function (title) {
  const media_type = mediaType(title);
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      moviedb_base_url + `/${media_type}/${title.substr(2)}/recommendations`,
      params
    );
    return response.data.results;
  } catch (e) {
    console.log("Error with similar");
  }
};

exports.getVideo = async function (title) {
  const media_type = mediaType(title);
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      `${moviedb_base_url}/${media_type}/${title.substr(2)}/videos`,
      params
    );
    return response.data.results;
  } catch (e) {
    console.log("Error with video");
  }
};

exports.topRatedMovies = async function () {
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      moviedb_base_url + "/movie/top_rated",
      params
    );
    return response.data.results;
  } catch (e) {
    console.log("TopRatedMovies error");
  }
};

exports.topRatedTV = async function () {
  try {
    const params = { params: { api_key: moviedb_api_key } };
    const response = await axios.get(
      moviedb_base_url + "/tv/top_rated",
      params
    );
    return response.data.results;
  } catch (e) {
    console.log("TopRatedTV error");
  }
};

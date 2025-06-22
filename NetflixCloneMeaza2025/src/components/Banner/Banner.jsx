import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

function Banner() {
  const [Movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(requests.fetchTrending);
        const moviesList = response.data.results; // Note: 'results' not 'result'

        if (moviesList?.length > 0) {
          const randomIndex = Math.floor(Math.random() * moviesList.length);
          setMovies(moviesList[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <header>
      <div
        className="banner"
        style={{
          backgroundImage: Movies?.backdrop_path
            ? `linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.7) 30%, rgba(20,20,20,0) 60%), linear-gradient(to top, rgba(20,20,20,0.9) 10%, rgba(20,20,20,0.2) 60%, transparent 100%), url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})`
            : undefined,
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {Movies?.title || Movies?.name || Movies?.original_name}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button">▶ Play</button>
            <button className="banner__button">ℹ More Info</button>
          </div>
          <h1 className="banner__description">{Movies?.overview}</h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </div>
    </header>
  );
}

export default Banner;

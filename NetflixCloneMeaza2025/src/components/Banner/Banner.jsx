// import React, { useEffect, useState } from "react";
// import "./banner.css";
// import axios from "../../utils/axios";
// import requests from "../../utils/requests";

// function Banner() {
//   const [Movies, setMovies] = useState(null);
//   const [trailerUrl, setTrailerUrl] = useState("");

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(requests.fetchTrending);
//         const moviesList = response.data.results; // Note: 'results' not 'result'

//         if (moviesList?.length > 0) {
//           const randomIndex = Math.floor(Math.random() * moviesList.length);
//           const movie = moviesList[randomIndex];
//           setMovies(moviesList[randomIndex]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const showTrailer = async () => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//       return;
//     }

//     setError(null);

//     try {
//       // Try with TMDB ID first (more reliable)
//       const url = await movieTrailer(movie.id || null, { tmdbId: true });

//       // Fallback to title search if no TMDB ID match
//       if (!url) {
//         const searchQuery = movie?.title || movie?.name || movie?.original_name;
//         if (!searchQuery) throw new Error("No searchable title available");

//         const titleUrl = await movieTrailer(searchQuery);
//         if (!titleUrl) throw new Error("No trailer found for this title");

//         const urlParams = new URLSearchParams(new URL(titleUrl).search);
//         setTrailerUrl(urlParams.get("v"));
//       } else {
//         const urlParams = new URLSearchParams(new URL(url).search);
//         setTrailerUrl(urlParams.get("v"));
//       }
//     } catch (err) {
//       console.error("Trailer error:", err);
//       setError("Trailer not available");
//       setTrailerUrl("");
//     }
//   };

//   return (
//     <header>
//       <div
//         className="banner"
//         style={{
//           backgroundImage: Movies?.backdrop_path
//             ? `linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.7) 30%, rgba(20,20,20,0) 60%), linear-gradient(to top, rgba(20,20,20,0.9) 10%, rgba(20,20,20,0.2) 60%, transparent 100%), url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})`
//             : undefined,
//         }}
//       >
//         <div className="banner__contents">
//           <h1 className="banner__title">
//             {Movies?.title || Movies?.name || Movies?.original_name}
//           </h1>
//           <div className="banner__buttons">
//             <button className="banner__button" onClick={showTrailer}>
//               ▶ Play
//             </button>
//             <button className="banner__button">ℹ More Info</button>
//           </div>
//           <h1 className="banner__description">{Movies?.overview}</h1>
//         </div>
//         {trailerUrl && (
//           <div className="row__trailer">
//             <YouTube videoId={trailerUrl} opts={opts} />
//           </div>
//         )}
//         <div className="banner--fadeBottom"></div>
//       </div>
//     </header>
//   );
// }

// export default Banner;
import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState(null);

  // YouTube player options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(requests.fetchTrending);
        const movies = response.data.results;

        if (movies?.length > 0) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("Failed to load movie data");
      }
    };

    fetchMovie();
  }, []);

  const handleTrailer = async () => {
    if (trailerUrl) {
      setTrailerUrl("");
      return;
    }

    if (!movie) return;

    try {
      let url;
      // Try with TMDB ID first
      if (movie.id) {
        url = await movieTrailer(null, { tmdbId: movie.id });
      }

      // Fallback to title search if no TMDB ID match
      if (!url) {
        const searchQuery = movie?.title || movie?.name || movie?.original_name;
        if (!searchQuery) throw new Error("No searchable title available");
        url = await movieTrailer(searchQuery);
      }

      if (!url) throw new Error("Trailer not found");

      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
      setError(null);
    } catch (err) {
      console.error("Trailer error:", err);
      setError("Trailer not available");
      setTrailerUrl("");
    }
  };

  // Truncate overview if too long
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header className="banner__header">
      <div
        className="banner"
        style={{
          backgroundImage: movie?.backdrop_path
            ? `linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.7) 30%, rgba(20,20,20,0) 60%), 
               linear-gradient(to top, rgba(20,20,20,0.9) 10%, rgba(20,20,20,0.2) 60%, transparent 100%), 
               url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
            : "linear-gradient(to right, #111, #111)", // Fallback gradient
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title ||
              movie?.name ||
              movie?.original_name ||
              "Loading..."}
          </h1>

          <div className="banner__buttons">
            <button className="banner__button" onClick={handleTrailer}>
              {trailerUrl ? "✕ Close Trailer" : "▶ Play"}
            </button>
            <button className="banner__button">ℹ More Info</button>
          </div>

          <p className="banner__description">
            {truncate(movie?.overview, 150) || "No description available"}
          </p>
        </div>

        {error && !trailerUrl && <div className="banner__error">{error}</div>}

        {trailerUrl && (
          <div className="banner__trailer">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}

        <div className="banner--fadeBottom" />
      </div>
    </header>
  );
}

export default Banner;

// import React, { useEffect, useState } from "react";
// import movieTrailer from "movie-trailer";
// import YouTube from "react-youtube";
// import "./Row.css";
// import axios from "../../utils/axios";

// function Row({ title, fetchUrl, isBigger }) {
//   const [Movies, setMovies] = useState(null);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const base_url = "https://image.tmdb.org/t/p/original/";
//   const opts = {
//     height: "390",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//       mute: 1,
//       modestbranding: 1,
//       rel: 0,
//     },
//   };
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await axios.get(fetchUrl);
//         setMovies(res.data.results);
//       } catch (error) {
//         console.log("error fetching movies:", error);
//       }
//     };
//     fetchMovies();
//   }, [fetchUrl]);

//   const handelClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//     } else {
//       movieTrailer(movie?.title || movie?.name || movie?.original_name)
//         .then((url) => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get("v"));
//         })
//         .catch((error) => {
//           console.error("Error fetching trailer URL:", error);
//         });
//     }
//   };

//   return (
//     <div className="row">
//       <h2>{title}</h2>
//       <div className="row__posters">
//         {Movies &&
//           Movies.map((movie) => (
//             <img
//               onClick={handelClick(movie)}
//               key={movie.id}
//               className={`row__poster ${isBigger && "row__posterLarge"}`}
//               src={`${base_url}${
//                 isBigger ? movie.poster_path : movie.backdrop_path
//               }`}
//               alt={movie.name}
//             />
//           ))}
//       </div>
//       <div className="row__trailer">
//         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//       </div>
//     </div>
//   );
// }

// export default Row;

import React, { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";
import axios from "../../utils/axios";

function Row({ title, fetchUrl, isBigger }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState(null);
  const base_url = "https://image.tmdb.org/t/p/original/";

  // YouTube player options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(fetchUrl);
        setMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies");
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      return;
    }

    setError(null);

    try {
      // Try with TMDB ID first (more reliable)
      const url = await movieTrailer(movie.id || null, { tmdbId: true });

      // Fallback to title search if no TMDB ID match
      if (!url) {
        const searchQuery = movie?.title || movie?.name || movie?.original_name;
        if (!searchQuery) throw new Error("No searchable title available");

        const titleUrl = await movieTrailer(searchQuery);
        if (!titleUrl) throw new Error("No trailer found for this title");

        const urlParams = new URLSearchParams(new URL(titleUrl).search);
        setTrailerUrl(urlParams.get("v"));
      } else {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      }
    } catch (err) {
      console.error("Trailer error:", err);
      setError("Trailer not available");
      setTrailerUrl("");
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {error && <div className="row__error">{error}</div>}

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isBigger && "row__posterLarge"}`}
            src={`${base_url}${
              isBigger ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>

      {trailerUrl && (
        <div className="row__trailer">
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;

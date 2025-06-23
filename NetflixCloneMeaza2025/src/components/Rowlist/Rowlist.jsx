import React from "react";
import "./Rowlist.css";
import Row from "../Row/Row";
import requests from "../../utils/requests";

function Rowlist() {
  return (
    <>
      <Row
        title="Netflix Orginals"
        fetchUrl={requests.fetchNetflixOriginals}
        isBigger={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
    </>
  );
}

export default Rowlist;

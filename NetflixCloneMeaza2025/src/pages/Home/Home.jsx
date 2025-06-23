import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner.jsx";
import Rowlist from "../../components/Rowlist/Rowlist.jsx";

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Rowlist />
      <Footer />
    </>
  );
}

export default Home;

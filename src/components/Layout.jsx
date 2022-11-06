import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./Home/Home";
import BestScores from "./BestScores/BestScores";
import Footer from "./common/Footer";

function Layout() {
  const [continent, setContinent] = useState("world");
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home continent={continent} setContinent={setContinent} />} />
        <Route path="/top10" element={<BestScores continent={continent} setContinent={setContinent} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Layout;

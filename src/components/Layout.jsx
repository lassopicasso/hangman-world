import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./Home/Home";
import BestScores from "./BestScores/BestScores";

function Layout() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top10" element={<BestScores />} />
      </Routes>
    </Router>
  );
}

export default Layout;

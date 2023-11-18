import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Houses from "./components/house/Houses";
import People from "./components/people/People";
import Quotes from "./components/quotes/Quotes";
import HouseDetail from "./components/house/HouseDetail";
import "./App.css";
import PersonDetail from "./components/people/PersonDetail";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/houses">Houses</Link>
        <Link to="/people">People</Link>
        <Link to="/quotes">Quotes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Houses />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:personSlug" element={<PersonDetail />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/houses/:houseSlug" element={<HouseDetail />} />
      </Routes>
    </div>
  );
}

export default App;

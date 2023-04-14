import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import DefaultModal from "./components/DefaultModal";
import SearchBar from "./components/SearchBar";
import Data from "./golden.json";
import BiomimicrySearch from "./components/BiomimicrySearch";
import TextToImage from "./components/TextToImage";
import Clustering from "./components/Clustering";
import Reframe from "./components/Reframe";

function App() {
  const [color, setColor] = useState("");
  const [bgImage, setBgImage] = useState("");

  /*const click = (color) => {
    setColor(color);
  };*/

  return (
    <div className='App' style={{ minHeight: "100vh" }}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='biomimicrysearch' element={<BiomimicrySearch />} />
          <Route path='texttoimage' element={<TextToImage />} />
          <Route path='clustering' element={<Clustering />} />
          <Route path='reframe' element={<Reframe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SongList from "./components/SongList";
import SongUploadForm from "./components/SongUploadForm";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [songListUpdated, setSongListUpdated] = useState(false);

  useEffect(() => {
    // Fetch the updated list of songs whenever songListUpdated changes
    fetchSongs();
  }, [songListUpdated]);

  const fetchSongs = async () => {
    try {
      const response = await fetch("http://localhost:5000/songs");
      const data = await response.json();
      // Update the songs in your state or do something with the data
      console.log(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleSongUpload = () => {
    // Set songListUpdated to true to trigger the useEffect and fetch the updated songs
    setSongListUpdated(true);
  };

  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload"
            element={<SongUploadForm onSongUpload={handleSongUpload} />}
          />
          <Route path="/play" element={<SongList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

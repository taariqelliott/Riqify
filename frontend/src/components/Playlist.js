import React, { useState } from "react";

import "./songlist.css";

const Playlist = () => {
  const [songs, setSongs] = useState([]);

  const handleDelete = async (songId) => {
    try {
      const response = await fetch(`http://localhost:5000/songs/${songId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setSongs(data.songs);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <div>
      {songs.map((song) => (
        <div key={song.songId}>
          <div className="songsBox">
            <h3>playlist</h3>
            <p className="songDeets">
              {song.name} by {song.artist}
            </p>
            <button
              className="delete"
              onClick={() => handleDelete(song.songId)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;

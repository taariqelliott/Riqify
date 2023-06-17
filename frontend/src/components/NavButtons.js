import React from "react";

const NavButtons = () => {
  return (
    <div className="navButtons">
      <button className="navButton">
        <a href="/">Home</a>
      </button>
      <button className="navButton">
        <a href="/upload">Upload Music</a>
      </button>
      <button className="navButton">
        <a href="/play">Music Player</a>
      </button>
      <button className="navButton">
        <a href="/artist">Artist</a>
      </button>
    </div>
  );
};

export default NavButtons;

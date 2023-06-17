import React, { useState, useEffect, useRef } from "react";
import NavButtons from "./NavButtons";
import './songlist.css'
import Playlist from "./Playlist.js";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:5000/songs");
        const data = await response.json();
        setSongs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const audioElement = audioElementRef.current;

    if (audioElement) {
      if (isPlaying) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

 

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
      setIsPlaying(true);
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => {
      const previousIndex = prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
      setIsPlaying(true);
      return previousIndex;
    });
  };

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


  const currentSong = songs[currentSongIndex];
  const songFilename = currentSong ? currentSong.filename : "";

  return (
    <div className="songListParent">
      
      {isLoading ? (<p>Loading...</p>) : (
        <div className="songListChild">
          <h1 className="player">Player</h1>
          <audio ref={audioElementRef} src={`http://localhost:5000/songs/${songFilename}`} controls autoPlay={isPlaying} className="player"/>
          {currentSong ? (<p className="songInfo">Now playing: {currentSong.name} - {currentSong.artist}</p>) : (<p>No song available</p>)}
          
          <div className="controlButtons">
            <button className="controlStyle" onClick={handlePlay}>
              Play
            </button>
            <span className="buttonSpace"></span>
            <button className="controlStyle" onClick={handlePause}>
              Pause
            </button>
            <span className="buttonSpace"></span>
            <button className="controlStyle" onClick={handleNext}>
              Next
            </button>
            <span className="buttonSpace"></span>
            <button className="controlStyle" onClick={handlePrevious}>
              Previous
            </button>
            <Playlist/>
          </div>
          
          {songs.map((song) => (
            <div key={song.songId}>
                <div className="songsBox">
                  <h3>playlist</h3>
                <p className="songDeets">{song.name} by {song.artist}</p>
                <button className="delete" onClick={() => handleDelete(song.songId)}>X</button>
                </div>
            </div>
          ))} 
          
          <NavButtons />
        </div>
      )}
    </div>
  );
};

export default SongList;

import React, { useState, useEffect, useRef } from 'react';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5000/songs');
        const data = await response.json();
        setSongs(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
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
          playPromise.catch(error => {
            console.error('Error playing audio:', error);
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
    setCurrentSongIndex(prevIndex => {
      const nextIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
      setIsPlaying(true);
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentSongIndex(prevIndex => {
      const previousIndex = prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
      setIsPlaying(true);
      return previousIndex;
    });
  };

  const currentSong = songs[currentSongIndex];
  const songFilename = currentSong ? currentSong.filename : '';

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <audio ref={audioElementRef} src={`http://localhost:5000/songs/${songFilename}`} controls autoPlay={isPlaying} className='player' />
          {currentSong ? (
            <p>Now playing: {currentSong.name} - {currentSong.artist}</p>
          ) : (
            <p>No song available</p>
          )}
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleNext}>Next</button>
          <button onClick={handlePrevious}>Previous</button>
        </div>
      )}
    </div>
  );
};

export default SongList;

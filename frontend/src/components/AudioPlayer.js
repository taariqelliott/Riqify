import React, { useState, useEffect, useRef } from 'react';
import '../App.css'

const AudioPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef(null);
  const progressBarRef = useRef(null);

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
    // Implement logic for playing the next song
  };

  const handlePrevious = () => {
    // Implement logic for playing the previous song
  };

  const handleTimeUpdate = () => {
    const audioElement = audioElementRef.current;
    const progressBar = progressBarRef.current;

    if (audioElement && progressBar) {
      const { currentTime, duration } = audioElement;
      const progress = (currentTime / duration) * 100;
      progressBar.style.width = `${progress}%`;
    }
  };

  return (
    <div>
      <h2>{song.name} - {song.artist}</h2>
      <audio ref={audioElementRef} src={song.url} onTimeUpdate={handleTimeUpdate} className='player' />

      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrevious}>Previous</button>
      </div>

      <div>
        <div ref={progressBarRef} style={{ width: '100%', height: '10px', backgroundColor: 'gray' }} />
      </div>
    </div>
  );
};

export default AudioPlayer;


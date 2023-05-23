import React, { useState } from 'react';
import axios from 'axios';

function SongUploadForm({ onSongUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSongNameChange = (event) => {
    setSongName(event.target.value);
  };

  const handleArtistNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !songName || !artistName) {
      // Handle form validation or show an error message
      return;
    }

    const formData = new FormData();
    formData.append('song', selectedFile);
    formData.append('name', songName);
    formData.append('artist', artistName);

    try {
      const response = await axios.post('http://localhost:5000/upload-song', formData);
      console.log(response.data);
      // Call the onSongUpload callback to update the song list
      onSongUpload();
      // Reset form fields or show a success message
      setSelectedFile(null);
      setSongName('');
      setArtistName('');
    } catch (error) {
      console.error(error);
      // Handle error or show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Song Name" value={songName} onChange={handleSongNameChange} />
      <input type="text" placeholder="Artist Name" value={artistName} onChange={handleArtistNameChange} />
      <button type="submit">Upload Song</button>
    </form>
  );
}

export default SongUploadForm;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import "./welcome.css"

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setFirebaseInitialized(true);
      } else {
        setUser(null);
        setFirebaseInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const songs = [
    { id: 1, title: '_Entre nosotros dos_', artist: 'Tiago PZK, LIT killah', /*src: '/Kodigo-Music/src/music/EN2.mp3' */},
    { id: 2, title: 'Nothing else matters', artist: '______Metallica______', /*src: '/Kodigo-Music/src/music/NEM.mp3' */},
    { id: 3, title: '______The search_____', artist: '_________NF__________', /*src: '/Kodigo-Music/src/music/NFTS.mp3'*/},
    { id: 4, title: '__jesus of suburbia_', artist: '______Green day______', /*src:*/  },
    { id: 5, title: '______you and i_____', artist: '______Lady Gaga______', /*src:*/  },
    { id: 6, title: 'rolling in the deep_', artist: '________Adele________', /*src:*/  },
    { id: 7, title: '______piano man_____', artist: '______BillY Joel_____', /*src:*/  }
  ];

  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song]);
  };

  const removeFromPlaylist = (songId) => {
    const updatedPlaylist = playlist.filter(song => song.id !== songId);
    setPlaylist(updatedPlaylist);
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/welcome";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (!firebaseInitialized) {
    return <p>Cargando...</p>;
  }

  return (
    <body className='fw-bold text-white'>
      <div className='card bg-secondary'>
        <h1>BIENVENIDO A KODIGO MUSIC</h1>
                

        <h1>Canciones Disponibles</h1>
        <ul className='card-1 bg-dark-subtle p-6'>
          {songs.map(song => (
            <li key={song.id} className="d-flex justify-content-between fw-bold text-body-secondary ">
              {song.title} - {song.artist}
              <button onClick={() => addToPlaylist(song)} className='btn btn-l btn-primary col-md-3'>Añadir a playlist</button>
              <button onClick={() => playSong(song)} className='btn btn-l btn-success col-md-3'>Reproducir</button>
            </li>
          ))}
        </ul>
        <h1>Playlist</h1>
        <ul>
          {playlist.map(song => (
            <li key={song.id} className="d-flex justify-content-between fw-bold text-white">
              {song.title} - {song.artist}
              <button onClick={() => removeFromPlaylist(song.id)} className='btn btn-outline-danger'>Quitar de playlist</button>
            </li>
          ))}
        </ul>

        {currentSong && (
          <div className='mt-6'>
            <h2 style={{ width: '300px', height: '75px' }}>Está sonando: </h2>
            <h2 style={{ width: '300px', height: '75px' }}>{currentSong.title} - {currentSong.artist}</h2>
          </div>
        )}

        {user && (
          <button onClick={handleLogout} className='btn-1 mt-3 btn btn-outline-danger'>Cerrar sesion</button>
        )}
      </div>
    </body>
  );
};

export default HomePage;

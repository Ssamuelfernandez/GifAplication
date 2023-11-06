
import React, { useState } from 'react';
import { BiSolidDownload, BiShareAlt } from 'react-icons/bi';
import { LiaHeart, LiaHeartSolid } from 'react-icons/lia';


export const GifItem = ({ title, url, id }) => {
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState(null);

  const handleShareClick = () => {
    // Copiar la URL al portapapeles
    navigator.clipboard.writeText(url).then(() => {
      setMessage(' ¡Enlace copiado! ');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }).catch((error) => {
      setMessage(' ¡Error al copiar! ');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleDownloadClick = async () => {
    // Descargar la imagen
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = `${title}.gif`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      setMessage(' ¡Imagen descargada! ');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage(' ¡Error al descargar! ');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <div className="card">
      <img src={url} alt={title} />

      <button className='like-button' onClick={handleLikeClick}>
          {liked ? <LiaHeartSolid color='#cf1d1d' /> : <LiaHeart />}
        </button>

      <div className="card-buttons">
        <button onClick={handleShareClick}>
          <BiShareAlt />
        </button>
        <button onClick={handleDownloadClick}>
          <BiSolidDownload />
        </button>
        {message && (
        <div className="message">
          {message}
        </div>
      )}
      </div>
      <p>{title}</p>
    </div>
  );
};


import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BiSolidDownload, BiShareAlt } from 'react-icons/bi';
import { LiaHeart, LiaHeartSolid } from 'react-icons/lia';


export const GifItem = ({ title, url, id }) => {
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isFav = stored.some((gif) => gif.id === id);
      setLiked(isFav);
    } catch {
      // If JSON parsing fails, reset favorites storage
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }, [id]);

  const handleShareClick = () => {
    // Copiar la URL al portapapeles
    navigator.clipboard.writeText(url).then(() => {
      setMessage(' ¡Enlace copiado! ');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }).catch(() => {
      setMessage(' ¡Error al copiar! ');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  const handleLikeClick = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (liked) {
        const updated = stored.filter((gif) => gif.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updated));
        setLiked(false);
      } else {
        const updated = [...stored, { id, title, url }];
        localStorage.setItem('favorites', JSON.stringify(updated));
        setLiked(true);
      }
    } catch {
      localStorage.setItem('favorites', JSON.stringify([]));
      setLiked(false);
    }
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
    } catch {
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

GifItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

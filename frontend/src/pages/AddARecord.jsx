import FormAddRecord from '../components/FormAddRecord';
import Authentification from '../components/Authentification';
import { useState } from 'react';
import { isUserConnected } from '../functions/Functions';
import { API_ROUTES } from '../utils/constants';
import axios from 'axios';
import '../styles/AddARecord.css';

function AddARecord() {
  const [cover, setCover] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
  const [grade, setGrade] = useState(0);
  const [state, setState] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const formData = new FormData();
      formData.append('cover', cover);
      formData.append('artist', artist);
      formData.append('album', album);
      formData.append('genre', genre);
      formData.append('date', date);
      formData.append('grade', grade);
      formData.append('state', state);
      formData.append('comments', comments);

      try {
          const response = await axios.post(API_ROUTES.RECORDS, formData, { headers: headers });
          if (response.status === 201) {
              setCover('');
              setCoverPreview('');
              setArtist('');
              setAlbum('');
              setGenre('');
              setDate('');
              setGrade(0);
              setState('');
              setComments('');
              window.alert('Nouveau disque enregistré !');

              console.log('Record Data:', { cover, artist, album, genre, date, grade, state, comments });
          } else {
              window.alert("Échec lors de l'ajout du disque !");
              console.error('Record failed to load:', response.statusText);
          }
      } catch (error) {
          window.alert("Erreur lors de l'ajout du disque !");
          console.error('Error while loading the record:', error.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div style={{ marginBottom: 100 }}>
      {isUserConnected() ? (
        <FormAddRecord
          formSubmit={handleSubmit}
          coverPreview={coverPreview}
          setCoverPreview={setCoverPreview}
          loading={loading}
          cover={cover}
          setCover={setCover}
          artist={artist}
          setArtist={setArtist}
          album={album}
          setAlbum={setAlbum}
          genre={genre}
          setGenre={setGenre}
          date={date}
          setDate={setDate}
          grade={grade}
          setGrade={setGrade}
          state={state}
          setState={setState}
          comments={comments}
          setComments={setComments}
          buttonText='Ajouter'
        />
      ) : (
            <Authentification />
      )}
    </div>
  );
}

export default AddARecord;
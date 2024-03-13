import { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import '../styles/Authentification.css';

function Authentification() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInscriptionSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API_ROUTES.SIGN_UP, { username, password });

      if (response.status === 200) {
        setUsername('');
        setPassword('');
        window.alert('Nouvel utilisateur enregistré !');
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      } else {
        window.alert("Echec de l'inscription !");
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      window.alert("Erreur lors de l'inscription !");
      console.error('Error signing up:', error.message);
    } finally {
      setLoading(false);
    }
    console.log('Authentication Data:', { username, password });
  };

  const handleConnectionSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API_ROUTES.SIGN_IN, { username, password });
      
      if (response.status === 200) {
        setUsername('');
        setPassword('');
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      } else {
        window.alert("Echec de connexion !");
        console.error('Failed to sign up:', response.statusText);
      }

    } catch (error) {
      window.alert("Erreur lors de la connexion !");
      console.error('Error signing in:', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='form-box'>
      <form>
        <div className='label-input authentification'>
          <label htmlFor="username">Identifiant :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='label-input authentification'>
          <label htmlFor="password">Mot de Passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='button-box'>
          <button type="submit" onClick={handleInscriptionSubmit} disabled={loading}>
            {loading ? 'Chargement...' : "S'inscrire"}
          </button>
          <button type="submit" onClick={handleConnectionSubmit} disabled={loading}>
            {loading ? 'Chargement...' : 'Connexion'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Authentification;
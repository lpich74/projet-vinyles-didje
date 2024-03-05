import { useState } from 'react';
import '../styles/Authentification.css';

function Authentification() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInscriptionSubmit = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    window.alert('Nouvel utilisateur enregistré !');

    // AJOUTER LA LOGIQUE D'AUTHENTIFICATION ICI
    console.log('Authentication Data:', { username, password });
  };

  const handleConnectionSubmit = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');

    console.log('Connection Data:', { username, password });
  };

  return (
    <div className='form-box' style={{marginBottom: 70}}>
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
          <button type="submit" onClick={handleInscriptionSubmit}>S'inscrire</button>
          <button type="submit" onClick={handleConnectionSubmit}>Connexion</button>
        </div>
      </form>
    </div>
  );
}

export default Authentification;
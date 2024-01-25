import { useState } from 'react';
import '../styles/Authentification.css';

function Authentification() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // AJOUTER LA LOGIQUE D'AUTHENTIFICATION ICI
    console.log('Authentication Data:', { username, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='label-input'>
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
        <div className='label-input'>
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
            <button type="submit">S'inscrire</button>
            <button type="submit">Connexion</button>
        </div>
      </form>
    </div>
  );
}

export default Authentification;
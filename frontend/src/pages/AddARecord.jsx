import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Authentification from '../components/Authentification';
import '../styles/AddARecord.css';

function AddARecord() {
    const [cover, setCover] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [grade, setGrade] = useState('0');
    const [state, setState] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // AJOUTER LA LOGIQUE D'AJOUT DE DISQUE
        console.log('Record Data:', { cover, artist, album, genre, grade, state, comments });
      };
    
    const handleStarHover = (index) => {
        setGrade(index + 1);
    };

    const handleStarLeave = () => {
        setGrade(0);
    };

    const handleStarClick = (index) => {
        setGrade(index + 1);
    };

    return (
        <div>
            <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <div className='label-input'>
                    <label htmlFor="cover">Pochette :</label>
                    <input
                        type="text"
                        id="cover"
                        name="cover"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                        required
                    />
                </div>
                <div className='label-input'>
                    <label htmlFor="artist">Artiste :</label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />
                </div>
                <div className='label-input'>
                    <label htmlFor="album">Album :</label>
                    <input
                        type="text"
                        id="album"
                        name="album"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        required
                    />
                </div>
                <div className='label-input'>
                    <label htmlFor="genre">Genre :</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className='label-input grade-box'>
                    <label htmlFor="grade">Note :</label>
                    <div className="star-rating" onMouseLeave={handleStarLeave}>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <FaStar
                                key={index}
                                className={index < grade ? "star star-selected" : "star star-unselected"}
                                onMouseEnter={() => handleStarHover(index)}
                                onClick={() => handleStarClick(index)}
                            />
                            ))}
                    </div>
                </div>
                <div className='label-input'>
                    <label htmlFor="state">État du disque :</label>
                    <select
                            id="state"
                            name="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="">. . .</option>
                            <option value="bon">Excellent</option>
                            <option value="bon">Bon</option>
                            <option value="moyen">Moyen</option>
                            <option value="mauvais">Mauvais</option>
                        </select>
                </div>
                <div className='label-input'>
                    <label htmlFor="comments">Commentaires :</label>
                    <input
                        type="text"
                        id="comments"
                        name="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <div className='button-box'>
                    <button type="submit">Ajouter</button>
                </div>
            </form>
            </div>

            <Authentification />
        </div>
    )
}

export default AddARecord
import { useState } from 'react';
import axios from 'axios'; // Importer axios
import { API_ROUTES } from '../utils/constants'; // Importer API_ROUTES
import StarRating from './StarRating';
import '../styles/FormAddRecord.css';

function FormAddRecord() {
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

    const handleCoverChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxPhotoSize = 1 * 1024 * 1024;
            if (file.size > maxPhotoSize) {
                window.alert('Taille de 1mo dépassée !');
                setCover('');
                return;
            }
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setCover(file);
                setCoverPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateDateOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 1900; year--) {
            years.push(year);
        }
        return years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <div className='form-box-addrecord'>
            <form onSubmit={handleSubmit}>
                <div className='cover-preview-box'>
                    <label htmlFor="cover" className={`add-cover ${cover ? 'hidden' : ''}`}>
                        Ajouter Pochette
                    </label>
                    <input
                        type="file"
                        id="cover"
                        name="cover"
                        accept=".jpg, .jpeg, .png, .svg, .webp"
                        onChange={handleCoverChange}
                        hidden
                        required
                    />
                    {coverPreview && (
                        <div className="cover-preview">
                            <img src={coverPreview} alt="cover preview" />
                        </div>
                    )}
                </div>
                <div className='label-input addrecord'>
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
                <div className='label-input addrecord'>
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
                <div className='label-input addrecord'>
                    <label htmlFor="genre">Genre :</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className='label-input addrecord'>
                    <label htmlFor="date">Date :</label>
                    <select
                        id="date"
                        name="date"
                        value={date}
                        required
                        onChange={(e) => setDate(e.target.value)}
                    >
                        <option value="">. . .</option>
                        {generateDateOptions()}
                    </select>
                </div>
                <div className='label-input addrecord grade-box'>
                    <label htmlFor="grade">Note :</label>
                    <StarRating initialGrade={grade} onChange={setGrade} />
                </div>
                <div className='label-input addrecord'>
                    <label htmlFor="state">État du disque :</label>
                    <select
                        id="state"
                        name="state"
                        value={state}
                        required
                        onChange={(e) => setState(e.target.value)}
                    >
                        <option value="">. . .</option>
                        <option value="excellent">Excellent</option>
                        <option value="bon">Bon</option>
                        <option value="moyen">Moyen</option>
                        <option value="mauvais">Mauvais</option>
                    </select>
                </div>
                <div className='label-input comment-box'>
                    <label htmlFor="comments">Commentaires :</label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={6}
                        cols={45}
                    />
                </div>
                <div className='button-box'>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Chargement...' : 'Ajouter'} 
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormAddRecord;
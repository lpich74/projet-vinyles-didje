import { generateDateOptions, handleCoverChange } from '../functions/Functions';
import StarRating from './StarRating';
import '../styles/FormAddRecord.css';

function FormAddRecord({
    formSubmit,
    coverPreview,
    loading,
    cover,
    setCover,
    setCoverPreview,
    artist,
    setArtist,
    album,
    setAlbum,
    genre,
    setGenre,
    date,
    setDate,
    grade,
    setGrade,
    state,
    setState,
    seriesNumber,
    setSeriesNumber,
    comments,
    setComments,
    buttonText
}) {

    return (
        <div className='form-box-addrecord'>
            <form onSubmit={formSubmit}>
                <div className='cover-preview-box'>
                    <label htmlFor="cover" className={`add-cover ${cover ? 'hidden' : ''}`}>
                        Ajouter Pochette
                    </label>
                    <input
                        type="file"
                        id="cover"
                        name="cover"
                        accept=".jpg, .jpeg, .png, .svg, .webp"
                        onChange={(event) => handleCoverChange(event, setCover, setCoverPreview)}
                        hidden
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
                        <option value="mint">Mint</option>
                        <option value="near mint">Near Mint</option>
                        <option value="excellent">Excellent</option>
                        <option value="very good">Very Good</option>
                        <option value="good">Good</option>
                        <option value="bad">Bad</option>
                    </select>
                </div>
                <div className='label-input addrecord'>
                    <label htmlFor="seriesNumber">N° de série :</label>
                    <input
                        type="text"
                        id="seriesNumber"
                        name="seriesNumber"
                        value={seriesNumber}
                        onChange={(e) => setSeriesNumber(e.target.value)}
                    />
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
                    <button className='btn-submit' type="submit" disabled={loading}>
                        {loading ? 'Chargement...' : buttonText} 
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormAddRecord;
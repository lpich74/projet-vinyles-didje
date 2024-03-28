import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTES } from "../utils/constants";
import { isUserConnected, getARecord } from "../functions/Functions";
import FormAddRecord from "../components/FormAddRecord";

function ModifyARecord() {  
    const { id } = useParams();
    const [recordData, setRecordData] = useState(null);
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

    useEffect(() => {        
        getARecord(id, setRecordData);
    }, [id]);

    useEffect(() => {
        if (recordData) {
            setCover('');
            setCoverPreview('');
            setArtist(recordData.artist);
            setAlbum(recordData.album);
            setGenre(recordData.genre);
            setDate(recordData.date);
            setGrade(recordData.grade);
            setState(recordData.state);
            setComments(recordData.comments);
        }
    }, [recordData]);

    const handleSubmitModifiedForm = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!cover) {
            window.alert("Veuillez ajouter une pochette");
            setLoading(false);
            return;
        }

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
            const response = await axios.put(`${API_ROUTES.RECORDS}/${id}`, formData, { headers: headers });
            if (response.status === 200) {
                window.alert('Disque modifié !');
                window.location.href = '/mes-vinyles';
            } else {
                window.alert("Échec lors de la modification du disque !");
                console.error('Record failed to load:', response.statusText);
            }
        } catch (error) {
            window.alert("Erreur lors de la modification du disque !");
            console.error('Error while modifying the record:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginBottom: 100 }}>
            {isUserConnected() && recordData && (
                <FormAddRecord
                    formSubmit={handleSubmitModifiedForm}
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
                    buttonText='Modifier'
                />
            )}
        </div>
    );
};

export default ModifyARecord;
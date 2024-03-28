import '../styles/Home.css';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { getAllRecords } from '../functions/Functions';

function Home() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Appelle la fonction lorsque le composant se monte
        getAllRecords(setRecords)
            .finally(() => setLoading(false)); 
    }, []); // Array vide = l'effet se produit dès que le composant se monte

    return (
        <section className='main-wrapper'>
            <h1 className='title-homepage'>Derniers Ajouts</h1>
            {loading ? ( // Loader placé ici en attendant que les disques se chargent
                <div className="loader">
                    <FaSpinner className="spinner-icon" />
                    <span>Chargement...</span>
                </div>
            ) : (
                <div className='grid-homepage'>
                    {records.map((record) => (
                        <img key={record._id} src={record.coverUrl} alt={record.album} height={200} width={200} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Home;
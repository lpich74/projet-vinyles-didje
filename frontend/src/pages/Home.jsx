import '../styles/Home.css';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { getAllRecords } from '../functions/Functions';

function Home() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Appelle la fonction lorsque le composant se monte
        getAllRecords(setRecords)
            .finally(() => setLoading(false)); 
    }, []); // Array vide = l'effet se produit dès que le composant se monte

    // Obtenir les 60 disques les plus récents
    const latestRecords = records
        .map((record, index) => ({ record, index })) // Map chaque disque en un objet contenant un disque et son index
        .sort((a, b) => b.index - a.index) // Trie chaque objet selon l'index par ordre décroissant
        .map(obj => obj.record) // Extrait les disques de chaque objet
        .slice(0, 60); // Garde les 60 plus récents

    return (
        <section className='main-wrapper'>
            <h1 className='title-homepage'>Derniers Ajouts</h1>
            {loading ? ( // Loader placé ici en attendant que les disques se chargent
                <div className="loader">
                    <FaSpinner className="spinner-icon" />
                    <span>Chargement...</span>
                </div>
            ) : (
                <>
                    <div className='grid-homepage'>
                        {latestRecords.map((record) => (
                            <img key={record._id} src={record.coverUrl} alt={record.album} height={200} width={200} />
                        ))}
                    </div>
                    <div className='count'>
                        ... / ...
                    </div>
                </>
            )}
        </section>
    )
}

export default Home;
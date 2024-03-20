import '../styles/Home.css';
import { useEffect, useState } from 'react';
import { getAllRecords } from '../functions/Functions';

function Home() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        // Appelle la fonction lorsque le composant se monte
        getAllRecords(setRecords);
    }, []); // Array vide = l'effet se produit dès que le composant se monte

    return (
        <section className='main-wrapper'>
            <h1 className='title-homepage'>Derniers Ajouts</h1>
            <div className='grid-homepage'>
                {records.map((record) => (
                    <img key={record._id} src={record.coverUrl} alt={record.album} height={200} width={200} />
                ))}
            </div>
        </section>
    )
}

export default Home;
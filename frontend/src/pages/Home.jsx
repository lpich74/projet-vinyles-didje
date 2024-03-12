import '../styles/Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Importer axios
import { API_ROUTES } from '../utils/constants'; // Importer API_ROUTES

function Home() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const getAllRecords = async () => {
            try {
                const response = await axios.get(API_ROUTES.RECORDS);
                if (response.status === 200) {
                    setRecords(response.data);
                    console.log('Records loaded successfully:', response.data);
                } else {
                    window.alert('Échec lors de la récupération des disques !');
                    console.error('Records failed to load:', response.statusText);
                }
            } catch (error) {
                window.alert('Erreur lors de la récupération des disques !');
                console.error('Error retrieving the records:', error.message);
            }
        };
        // Call the function when the component mounts
        getAllRecords();
    }, []); // Empty dependency array means this effect runs once when the component mounts

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
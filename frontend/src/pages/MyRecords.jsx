import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import Authentification from '../components/Authentification';
import '../styles/MyRecords.css';

function MyRecords() {
    const [records, setRecords] = useState([]);
    
    const isUserConnected = () => {
        return localStorage.getItem('token') !== null;
      };

    useEffect(() => {
      if (isUserConnected()) {
        const getMyRecords = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_ROUTES.MY_RECORDS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
        getMyRecords();
      }
    }, []);
    
    return (
      <div style={{ marginBottom: 100 }}>
        {isUserConnected() ? (
          <section className='main-wrapper'>
            <h1 className='title-homepage'>Mes disques</h1>
            <div className='grid-homepage'>
              {records.map((record) => (
                  <img className='image-myrecords' key={record._id} src={record.coverUrl} alt={record.album} height={200} width={200} />
              ))}
            </div>
          </section>
        ) : (
          <>
            <Authentification />
          </>
        )}
      </div>
    );
}

export default MyRecords
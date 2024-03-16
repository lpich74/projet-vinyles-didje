import React from 'react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import Authentification from '../components/Authentification';
import Modal from '../components/Modal';
import '../styles/MyRecords.css';

function MyRecords() {
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [grade, setGrade] = useState('0');
    
    const isUserConnected = () => {
        return localStorage.getItem('token') !== null;
    };

    const handleClose = () => {
        setSelectedRecord(null);
    };
  
    const handleClick = (record) => {
        setSelectedRecord(record);
    };

    const handleStarClick = (value) => {
      setGrade(value);
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
                            <React.Fragment key={record._id}>
                                <img 
                                    className='image-myrecords' 
                                    onClick={() => handleClick(record)} 
                                    src={record.coverUrl} 
                                    alt={record.album} 
                                    height={200} 
                                    width={200} 
                                />
                                {selectedRecord && selectedRecord._id === record._id && (
                                    <Modal isOpen={true} handleClose={handleClose}>
                                        <header style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <h2>{selectedRecord.album}</h2>
                                            <img src={record.coverUrl} alt={record.album} style={{width: 80, height: 80}} />
                                        </header>
                                        <div className='modal-content-box'>
                                            <div>{selectedRecord.artist}</div>
                                            <div>{selectedRecord.genre}</div>
                                            <div>{selectedRecord.date}</div>
                                            <div className="star-rating">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={star <= selectedRecord.grade ? "star star-selected" : "star star-unselected"}
                                                        onClick={() => handleStarClick(star)}
                                                    />
                                                ))}
                                            </div>
                                            <div>{selectedRecord.state}</div>
                                            <div>{selectedRecord.comments}</div>
                                        </div>
                                    </Modal>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            ) : (
                <Authentification />
            )}
        </div>
    );
}

export default MyRecords;
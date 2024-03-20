import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import Authentification from '../components/Authentification';
import StarRating from '../components/StarRating';
import Filters from '../components/Filters';
import Modal from '../components/Modal';
import '../styles/MyRecords.css';

function MyRecords() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    
    const isUserConnected = () => {
        return localStorage.getItem('token') !== null;
    };
  
    const handleClick = (record) => {
        setSelectedRecord(record);
    };

    const handleClose = () => {
        setSelectedRecord(null);
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
                        setFilteredRecords(response.data);
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
                    <Filters records={records} setFilteredRecords={setFilteredRecords} />
                    <div className='grid-myrecords'>
                        {filteredRecords.map((record) => (
                            <React.Fragment key={record._id}>
                                <img 
                                    className={filteredRecords.length === 1 ? 'image-alone' : 'image-myrecords'}
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
                                            <StarRating selectedRecord={selectedRecord} readOnly={true} />
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
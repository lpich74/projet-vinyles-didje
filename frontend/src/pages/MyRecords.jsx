import React from 'react';
import { useEffect, useState } from 'react';
import { isUserConnected, getMyRecords, handleDelete } from '../functions/Functions';
import Authentification from '../components/Authentification';
import { RxCross1 } from "react-icons/rx";
import { FaSpinner } from 'react-icons/fa';
import ModalContent from '../components/ModalContent';
import Filters from '../components/Filters';
import '../styles/MyRecords.css';

function MyRecords() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleClick = (record) => {
        setSelectedRecord(record);
    };

    useEffect(() => {
        if (isUserConnected()) {
            getMyRecords(setRecords, setFilteredRecords)
                .finally(() => setLoading(false)); // Le loader s'efface après le chargement des disques
        }
    }, []);
    
    return (
        <div style={{ marginBottom: 100 }}>
            {isUserConnected() ? (
                <section className='main-wrapper'>
                    <h1 className='title-homepage'>Mes disques</h1>
                    <Filters records={records} setFilteredRecords={setFilteredRecords} />
                    {loading ? ( // Loader placé ici en attendant que les disques se chargent
                        <div className="loader">
                            <FaSpinner className="spinner-icon" />
                            <span>Chargement...</span>
                        </div>
                    ) : (
                        <div className='grid-myrecords'>
                            {filteredRecords.map((record) => (
                                <div
                                    className={filteredRecords.length === 1 ? 'image-alone' : 'image-myrecords'}
                                    key={record._id}
                                    onMouseEnter={() => setDeleteButtonVisible(record._id)}
                                    onMouseLeave={() => setDeleteButtonVisible(null)}
                                >
                                    {deleteButtonVisible === record._id &&
                                        <RxCross1
                                            className="rxcross1-miniature"
                                            onClick={() => handleDelete(record._id, records, setRecords, filteredRecords, setFilteredRecords)}
                                        />
                                    }
                                    <img 
                                        onClick={() => handleClick(record)} 
                                        src={record.coverUrl} 
                                        alt={record.album} 
                                        height={200}
                                        width={200} 
                                    />
                                    {selectedRecord && selectedRecord._id === record._id && (
                                        <ModalContent selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} record={record} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            ) : (
                <Authentification />
            )}
        </div>
    );
}

export default MyRecords;
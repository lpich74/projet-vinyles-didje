import React from 'react';
import { useEffect, useState } from 'react';
import { isUserConnected, getMyRecords } from '../functions/Functions';
import Authentification from '../components/Authentification';
import ModalContent from '../components/ModalContent';
import Filters from '../components/Filters';
import '../styles/MyRecords.css';

function MyRecords() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    
    const handleClick = (record) => {
        setSelectedRecord(record);
    };

    useEffect(() => {
        if (isUserConnected()) {
            getMyRecords(setRecords, setFilteredRecords);
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
                                    <ModalContent selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} record={record} />
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
import React, { useState, useEffect } from 'react';
import '../styles/Filters.css';

function Filters({records}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);

    const filterMappings = {
        'Artiste / Album': 'artiste ou album',
        'Genre': 'genre',
        'Année': 'date',
        'État du disque': 'state'
    };

    const handleClickFilter = (filter) => {
        setActiveFilter(filterMappings[filter]);
    };

    const filteredData = records.filter(val => {
        if (activeFilter === 'artiste ou album') {
            return (val.artist && val.album) &&
                (val.artist.toLowerCase().includes(searchTerm) || val.album.toLowerCase().includes(searchTerm));
        } else if (val[activeFilter]) {
            return val[activeFilter].toLowerCase().includes(searchTerm);
        }
        return false;
    });

    return (
        <div className='filters-box'>
            <div className='filters-title-list'>
                <h3>Filtrer par</h3>
                <ul className='filters-list'>
                    {Object.keys(filterMappings).map((filter, index) => (
                        <li key={index} onClick={() => handleClickFilter(filter)}>{filter}</li>
                    ))}
                </ul>
            </div>
            {activeFilter && (
                <React.Fragment>
                    <div className='search-bar'>
                        <input
                            type='text'
                            id='search'
                            name='search'
                            placeholder={`Rechercher par ${activeFilter}`}
                            onChange={(e) => setSearchTerm(e.target.value.trim().toLowerCase())}
                        />
                    </div>
                    <div className='search-results'>
                        {filteredData.map((record, index) => (
                            <div key={index} className='search-result'>
                                {activeFilter === 'artiste ou album' ? `${record.artist} - ${record.album}` : record[activeFilter]}
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Filters;
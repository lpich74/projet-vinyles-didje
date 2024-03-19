import React, { useState, useEffect } from 'react';
import '../styles/Filters.css';

function Filters({ records, setFilteredRecords }) {
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
        setSearchTerm('');
    };

    const applyFilters = (filter, term) => {
        const filteredData = records.filter(val => {
            if (filter === 'artiste ou album') {
                return (val.artist && val.album) &&
                    (val.artist.toLowerCase().includes(term) || val.album.toLowerCase().includes(term));
            } else if (val[filter]) {
                return val[filter].toLowerCase().includes(term);
            }
            return false;
        });
        setFilteredRecords(filteredData);
    };

    useEffect(() => {
        applyFilters(activeFilter, searchTerm);
    }, [searchTerm]); // filtres appliqués dès que le terme recherché change

    return (
        <div className='filters-box'>
            <div className='filters-title-list'>
                <h3>Filtrer par</h3>
                <ul className='filters-list'>
                    {Object.keys(filterMappings).map((filter, index) => (
                        <li
                            key={index}
                            onClick={() => handleClickFilter(filter)}
                            className={activeFilter === filterMappings[filter] ? 'active' : ''}
                        >
                            {filter}
                        </li>
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
                            placeholder='Rechercher'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                        />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Filters;
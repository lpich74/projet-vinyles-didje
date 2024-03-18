import { useState } from 'react';
import '../styles/Filters.css';

function Filters() {
    const [searchBoxes, setSearchBoxes] = useState({
        title: false,
        genre: false,
        year: false,
        state: false
    });

    const handleClickFilter = (filter) => {
        setSearchBoxes({
            ...searchBoxes,
            [filter]: true
        });
    };

    return (
        <div className='filters-box'>
            <div className='filters-title-list'>
                <h3>Filtrer par</h3>
                <ul className='filters-list'>
                    <li onClick={() => handleClickFilter('title')}>Artiste / Album</li>
                    <li onClick={() => handleClickFilter('genre')}>Genre</li>
                    <li onClick={() => handleClickFilter('year')}>Année</li>
                    <li onClick={() => handleClickFilter('state')}>État du disque</li>
                </ul>
            </div>
            {Object.values(searchBoxes).includes(true) &&
                <p>Rechercher</p>
            }
        </div>
    );
}

export default Filters;
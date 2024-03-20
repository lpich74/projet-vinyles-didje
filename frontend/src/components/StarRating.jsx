import '../styles/StarRating.css';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating ({ selectedRecord, initialGrade, onChange, readOnly }) {
    const [grade, setGrade] = useState(initialGrade);

    const handleStarClick = (value) => {
        if (!readOnly) {
            setGrade(value);
            onChange(value);
        }
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={star <= (selectedRecord ? selectedRecord.grade : initialGrade) ? "star star-selected" : "star star-unselected"}
                    onClick={() => handleStarClick(star)}
                />
            ))}
        </div>
    );
}

export default StarRating;
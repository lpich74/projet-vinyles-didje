import { TbArrowBackUp, TbArrowBackUpDouble, TbArrowForwardUp, TbArrowForwardUpDouble } from "react-icons/tb";
import '../styles/PageCounter.css'

function PageCounter({records, latestRecords, recordsToDisplay, start, setStart}) {
    const handleClickPreviousRecords = () => {
        setStart(start - recordsToDisplay < 0 ? 0 : start - recordsToDisplay);
    };

    const handleClickMostRecentRecords = () => {
        setStart(0);
    };
    
    const handleClickNextRecords = () => {
        setStart(start + recordsToDisplay);
    };

    const handleClickOldestRecords = () => {
        setStart(records.length - recordsToDisplay < 0 ? 0 : records.length - recordsToDisplay);
    };

    return (
        <div className='count'>
            {start > 0 &&
                <>
                    <TbArrowBackUpDouble className='arrows' onClick={handleClickMostRecentRecords} />
                    <TbArrowBackUp className='arrows' onClick={handleClickPreviousRecords} />
                </>
            }
            {records.length ? `${start + 1}-${start + latestRecords.length}` : 0} / {records.length}
            {start + recordsToDisplay < records.length &&
                <>
                    <TbArrowForwardUp className='arrows' onClick={handleClickNextRecords} />
                    <TbArrowForwardUpDouble className='arrows' onClick={handleClickOldestRecords} />
                </>
            }
        </div>
    )
}

export default PageCounter;
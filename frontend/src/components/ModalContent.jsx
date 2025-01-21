import Modal from "./Modal";
import StarRating from "./StarRating";
import '../styles/ModalContent.css'


function ModalContent ({selectedRecord, setSelectedRecord, record}) {
    const handleClose = () => {
        setSelectedRecord(null);
    };

    return (
        <Modal isOpen={true} handleClose={handleClose} id={record._id}>
            <header className="modal-header">
                <h2>{selectedRecord.album}</h2>
                <img src={record.coverUrl} alt={record.album} style={{width: 90, height: 90}} />
            </header>
            <div className='modal-content-box'>
                <div style={{fontSize: '1.3em', fontWeight: 500}}>{selectedRecord.artist}</div>
                <div>{selectedRecord.date}</div>
                <div>{selectedRecord.genre}</div>
                <StarRating selectedRecord={selectedRecord} readOnly={true} />
                <div style={{display: 'flex'}}>État : {selectedRecord.state}</div>
                <div style={{display: 'flex'}}>
                    Label et ref. : {selectedRecord.seriesNumber || 'N/A'}
                </div>
                <div style={{fontStyle: 'italic'}}>{selectedRecord.comments}</div>
            </div>
        </Modal>
    )
}

export default ModalContent;
import Modal from "./Modal";
import StarRating from "./StarRating";
import '../styles/ModalContent.css'

function ModalContent ({selectedRecord, setSelectedRecord, record}) {
    const handleClose = () => {
        setSelectedRecord(null);
    };

    return (
        <Modal isOpen={true} handleClose={handleClose}>
        <header className="modal-header">
            <h2>{selectedRecord.album}</h2>
            <img src={record.coverUrl} alt={record.album} style={{width: 80, height: 80}} />
        </header>
        <div className='modal-content-box'>
            <div style={{fontSize: '1.3em'}}>{selectedRecord.artist}</div>
            <div>{selectedRecord.date}</div>
            <div>{selectedRecord.genre}</div>
            <StarRating selectedRecord={selectedRecord} readOnly={true} />
            <div>{selectedRecord.state}</div>
            <div>{selectedRecord.comments}</div>
        </div>
    </Modal>
    )
}

export default ModalContent;
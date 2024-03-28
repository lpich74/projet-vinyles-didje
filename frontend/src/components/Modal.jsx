import { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import '../styles/Modal.css'
import { handleModify } from "../functions/Functions";

function Modal({ children, isOpen, handleClose, id }) {
    const dialogRef = useRef(null);

    const close = () => {
        dialogRef.current?.close();
        handleClose(); // Appelle handleClose à la fermeture de dialog
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    }, [isOpen]);

    const handleModifyClick = () => {
        handleModify(id); // Call handleModify with recordId as parameter
        close();
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={close}
            className="dialog-modal"
        >
            <RxCross1 
                className="rxcross1"
                onClick={close}
            />
            {children}
            <div className="buttons-modal">
                <button
                    className="button-modal modify"
                    type="button"
                    onClick={handleModifyClick}
                    title="modify modal"
                    aria-label="modify modal"
                >
                    Modifier
                </button>
                <button
                    className="button-modal close"
                    type="button"
                    onClick={close}
                    title="close modal"
                    aria-label="close modal"
                >
                    Fermer
                </button>
            </div>
        </dialog>
    );
}

export default Modal;

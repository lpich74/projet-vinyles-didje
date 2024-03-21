import { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import '../styles/Modal.css'

function Modal({ children, isOpen, handleClose }) {
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
            <button
                className="button-modal"
                type="button"
                onClick={close}
                title="close modal"
                aria-label="close modal"
            >
                Fermer
            </button>
        </dialog>
    );
}

export default Modal;

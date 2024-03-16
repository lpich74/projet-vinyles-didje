import { useEffect, useRef } from "react";

function Modal({ children, isOpen, handleClose }) {
    const dialogRef = useRef(null);

    const close = () => {
        dialogRef.current?.close();
        handleClose(); // Call handleClose when closing the dialog
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
            style={{minWidth: '35%'}}
        >
            {children}
            <button
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

import { useEffect, useRef } from "react";

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
            style={{minWidth: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 'purple 3px solid', borderRadius: '25px'}}
        >
            {children}
            <button
                style={{width: 100, marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
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

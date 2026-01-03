import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import clsx from 'clsx';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const Modal = ({ open, onClose, title, children, className }: ModalProps) => {

    const modalRoot = document.getElementById('modal-root')!;
     
    if (!open) {
        return null;
    }

    const modalContent = (
        <div className={styles.backdrop} onClick={onClose} aria-modal="true" role="dialog">
            <div className={clsx(styles.panel, className)} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <label onClick={onClose} aria-label="Close" className={styles.close}>
                        x
                    </label>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    );

    // create a DOM node for the portal
    return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;

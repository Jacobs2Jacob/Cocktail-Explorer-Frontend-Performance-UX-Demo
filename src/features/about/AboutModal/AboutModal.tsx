import Modal from '@/shared/components/Layout/Modal/Modal';
import styles from './AboutModal.module.css';
import { AboutContent } from '@/features/about/AboutModal/AboutContent';

interface AboutModalProps {
    open: boolean;
    onClose: () => void;
}

export const AboutModal = ({ onClose, open }: AboutModalProps) => {
    return <Modal
        open={open}
        onClose={onClose}
        className={styles.aboutModal}>
        <AboutContent />
    </Modal>
}
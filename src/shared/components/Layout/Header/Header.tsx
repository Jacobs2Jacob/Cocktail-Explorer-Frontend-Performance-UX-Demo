import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { HeaderDesktop } from './Desktop/HeaderDesktop';
import { HeaderMobile } from './Mobile/HeaderMobile';
import Modal from '../Modal/Modal';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { useDeviceDetection } from '@/shared/hooks/useDeviceDetection';

export type NavKey =
    | 'home'
    | 'newCocktail'
    | 'about';

const Header = () => {
    const navigate = useNavigate();
    const [aboutOpen, setAboutOpen] = useState(false);
    const device = useDeviceDetection(1000);

    const handleNavigate = (key: NavKey) => {
        switch (key) {
            case 'home':
                navigate('/');
                break;

            case 'newCocktail':
                navigate('/cocktail/new');
                break;

            case 'about':
                setAboutOpen(true);
                break;
        }
    };

    // TODO: change to pure CSS media styling
    const modalProps = {
        style: {
            height: device === 'desktop' ? '85vh' : '70vh',
            width: device === 'desktop' ? '50vw' : '95vw',
        }
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    {device === 'desktop' ? <HeaderDesktop onNavigate={handleNavigate} /> :
                                            <HeaderMobile onNavigate={handleNavigate} />}

                    <h1 className={styles.title}>COCKTAIL GALLERY</h1>
                </div>
            </nav>

            <Modal
                {...modalProps}
                open={aboutOpen}
                onClose={() => setAboutOpen(false)}
                title={'About'}>
                <AboutPage />
            </Modal>
        </>
    );
};

export default Header;
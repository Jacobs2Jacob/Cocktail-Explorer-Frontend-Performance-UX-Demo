import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { HeaderDesktop } from './Desktop/HeaderDesktop';
import { HeaderMobile } from './Mobile/HeaderMobile'; 
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import clsx from 'clsx';
import { AboutModal } from '@/features/about/AboutModal/AboutModal';

export type NavKey =
    | 'home'
    | 'newCocktail'
    | 'about';

const Header = () => {
    const navigate = useNavigate();
    const [aboutOpen, setAboutOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1400px)');

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
     
    return ( 
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    {isMobile ? <HeaderMobile onNavigate={handleNavigate} /> :
                        <HeaderDesktop onNavigate={handleNavigate} />}
                    <h2 className={clsx(styles.title, styles.shortTitle)}>COCKTAIL EXPLORER</h2>
                    <h2 className={clsx(styles.title, styles.longTitle)}>COCKTAIL EXPLORER - Frontend Performance & UX Demo</h2>
                </div>
            </nav>

            <AboutModal 
                open={aboutOpen}
                onClose={() => setAboutOpen(false)} />
        </>
    );
};

export default Header;
import { useState } from 'react';
import styles from './HeaderMobile.module.css'; 
import { NavKey } from '../Header';
import clsx from 'clsx';

interface HeaderMobileProps {
    onNavigate: (item: NavKey) => void;
}

export const HeaderMobile = ({ onNavigate } :HeaderMobileProps) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (key: NavKey) => {
        onNavigate(key);
        setMenuOpen(false);
    }

    return (
        <>
            {/* Hamburger */}
            <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu">
                ☰
            </button>
                      
            {/* dropdown */}
            <div className={clsx(styles.mobileMenu, menuOpen && styles.open)}>
                <button onClick={() => handleNavigate('home')}
                        className={styles.navButton}>
                            Home
                </button>
                <button onClick={() => handleNavigate('newCocktail')}
                        className={styles.navButton}>
                            🍸 New Cocktail
                </button>
                <button onClick={() => handleNavigate('about')}
                        className={styles.navButton}>
                            About
                </button>
            </div>
        </>
    );
}; 
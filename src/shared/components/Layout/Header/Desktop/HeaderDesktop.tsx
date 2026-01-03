import styles from './HeaderDesktop.module.css'; 
import { NavKey } from '../Header';

interface HeaderDesktopProps {
    onNavigate: (item: NavKey) => void;
}

export const HeaderDesktop = ({ onNavigate }: HeaderDesktopProps) => {
      
    return (
        <>
            <div className={styles.desktopMenu}>
                <button onClick={() => onNavigate('home')} className={styles.navButton}>
                    Home
                </button>
                <button onClick={() => onNavigate('newCocktail')} className={styles.navButton}>
                    🍸 New Cocktail
                </button>
                <button onClick={() => onNavigate('about')} className={styles.navButton}>
                    About
                </button>
            </div>          
        </>
    );
};
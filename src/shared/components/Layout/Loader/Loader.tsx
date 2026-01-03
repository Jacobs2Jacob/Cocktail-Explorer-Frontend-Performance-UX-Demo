import loaderGif from '@/assets/loader.gif';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <img src={loaderGif} alt="Loading..." width={200} />
        </div>
    );
};

export default Loader;
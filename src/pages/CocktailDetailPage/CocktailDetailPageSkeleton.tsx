import styles from './CocktailDetailPage.module.css';

const CocktailDetailPageSkeleton = () => {
    return (
        <div className={`${styles.container} ${styles.skeletonContainer}`}>
            <div className={`${styles.skeletonTitle} ${styles.skeletonShimmer}`} />
            <div className={`${styles.skeletonImage} ${styles.skeletonShimmer}`} />

            <div className={styles.card}>
                <div className={`${styles.skeletonHeading} ${styles.skeletonShimmer}`} />
                <div className={styles.skeletonList}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={`skeleton-ingredient-${index}`}
                            className={`${styles.skeletonLine} ${styles.skeletonShimmer}`}
                        />
                    ))}
                </div>

                <div className={`${styles.skeletonHeading} ${styles.skeletonShimmer}`} />
                <div className={styles.skeletonParagraph}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={`skeleton-step-${index}`}
                            className={`${styles.skeletonLine} ${styles.skeletonShimmer}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CocktailDetailPageSkeleton;


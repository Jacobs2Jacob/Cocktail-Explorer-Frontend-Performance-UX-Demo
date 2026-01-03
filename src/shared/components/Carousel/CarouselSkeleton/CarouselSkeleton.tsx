import styles from './CarouselSkeleton.module.css';
import { Direction } from '@/shared/types';
import { useContainerWidth } from '@/shared/hooks/useContainerWidth';
import clsx from 'clsx';

const MIN_CARD_WIDTH = 180;
const HORIZONTAL_ROWS = 2;

interface CarouselSkeletonProps {
    direction: Direction;
}

const CarouselSkeleton = ({ direction }: CarouselSkeletonProps) => {
    const { containerRef, width } = useContainerWidth();

    const itemsPerRow = Math.max(
        1,
        Math.floor((width || 0) / MIN_CARD_WIDTH)
    );

    const baseWidth = width || (typeof window !== 'undefined' ? window.innerWidth : 1200);

    const minColumnWidth = 220;
    const horizontalColumns = Math.max(
        3,
        Math.ceil(baseWidth / minColumnWidth)
    );

    const skeletonCount = direction === 'horizontal'
            ? HORIZONTAL_ROWS * horizontalColumns
            : itemsPerRow * 4;

    const gridStyle = direction === 'vertical'
            ? { gridTemplateColumns: `repeat(${itemsPerRow}, minmax(160px, 1fr))` }
            : undefined;

    return (
        <div
            ref={containerRef}
            className={clsx(styles.skeletonRow, direction === 'horizontal'
                    ? styles.horizontalSkeleton
                    : styles.verticalSkeleton)}
            style={gridStyle}
        >
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <div
                    key={`carousel-skeleton-${index}`}
                    className={styles.skeletonCard}>
                    <div className={styles.skeletonImage} />
                    <div className={styles.skeletonLabel} />
                </div>
            ))}
        </div>
    );
};

export default CarouselSkeleton;
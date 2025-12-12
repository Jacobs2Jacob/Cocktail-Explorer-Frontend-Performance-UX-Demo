import React, { useCallback } from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard'; 
import Loader from '../Layout/Loader/Loader';
import { Direction } from '../../types';  
import HorizontalVirtualizedScroll from '../VirtualizedScrollContainer/horizontal/HorizontalVirtualizedScroll';
import VerticalVirtualizedScroll from '../VirtualizedScrollContainer/vertical/VerticalVirtualizedScroll';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    loading?: boolean;
    direction?: Direction;
}

const Carousel = ({
    items,
    onReachEnd,
    loading,
    direction = 'horizontal'
}: CarouselProps) => {

    const renderItem = useCallback((item: CarouselItem) => {
        return <CarouselCard key={item.id} item={item} />
    }, []);

    return (
        <div className={styles.carouselWrapper}>
            {items.length > 0 && <>
                {direction === 'horizontal' ? (
                    <HorizontalVirtualizedScroll
                        items={items}
                        renderItem={renderItem}
                        onScrollEnd={onReachEnd}
                        showNavWhileLoading={loading}
                    />
                ) : (
                    <VerticalVirtualizedScroll
                        items={items}
                        renderItem={renderItem}
                        onScrollEnd={onReachEnd}
                    />
                )}
            </>}
             
            {!loading && items.length === 0 && (
                <p className={styles.loading}>No Results Found...</p>
            )}

            {loading && items.length === 0 && (
                <Loader />
            )}
        </div>
    );
};

export default React.memo(Carousel);
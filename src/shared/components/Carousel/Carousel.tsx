import React, { useCallback } from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard'; 
import { Direction } from '../../types';  
import HorizontalVirtualizedScroll from '../VirtualizedScrollContainer/horizontal/HorizontalVirtualizedScroll';
import VerticalVirtualizedScroll from '../VirtualizedScrollContainer/vertical/VerticalVirtualizedScroll';
import { EmptyState } from '../ErrorStates/EmptyState';
import CarouselSkeleton from './CarouselSkeleton';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    fetching: boolean;
    loading: boolean;
    direction?: Direction;
}

const Carousel = ({
    items,
    onReachEnd,
    fetching,
    loading,
    direction = 'horizontal'
}: CarouselProps) => {

    const renderItem = useCallback((item: CarouselItem) => {
        return <CarouselCard key={item.id} item={item} />
    }, []);
      
    return (
        <div className={styles.carouselWrapper}>

            {!fetching && !loading && items.length === 0 && (
                <EmptyState message={'No results found...'} />
            )}

            {loading && (
                <CarouselSkeleton direction={direction} />
            )}

            {items.length > 0 && <>
                {direction === 'horizontal' ? (
                    <HorizontalVirtualizedScroll
                        items={items}
                        renderItem={renderItem}
                        onScrollEnd={onReachEnd}
                        isLoading={fetching}
                    />
                ) : (
                    <VerticalVirtualizedScroll
                        items={items}
                        renderItem={renderItem}
                        onScrollEnd={onReachEnd}
                            isLoading={fetching}
                    />
                )}
            </>} 
        </div>
    );
};

export default React.memo(Carousel);
import { useCallback } from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard'; 
import { Direction } from '../../types';  
import HorizontalVirtualizedScroll from '../VirtualizedScrollContainer/horizontal/HorizontalVirtualizedScroll';
import VerticalVirtualizedScroll from '../VirtualizedScrollContainer/vertical/VerticalVirtualizedScroll';
import { EmptyState } from '../ErrorStates/EmptyState';
import CarouselSkeleton from './CarouselSkeleton';
import Loader from '../Layout/Loader/Loader';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    fetching: boolean; 
    initialLoad?: boolean;
    direction?: Direction;
}

const Carousel = ({
    items,
    onReachEnd,
    fetching,
    initialLoad,
    direction = 'horizontal'
}: CarouselProps) => {

    const renderItem = useCallback((item: CarouselItem) => {
        return <CarouselCard key={item.id} item={item} />
    }, []);

    const isEmpty = items.length === 0;
    const showLoader = fetching && isEmpty;
    const showEmpty = !fetching && isEmpty;

    return (

        <>
            {/* Item.length === 0 so it would be seen on search and not on navigation */}
            {showLoader && (
                <Loader />
            )}

            <div className={styles.carouselWrapper}>

                {showEmpty && (
                    <EmptyState message={'No results found...'} />
                )}

                {initialLoad && (
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
        </>
    );
};

export default Carousel;
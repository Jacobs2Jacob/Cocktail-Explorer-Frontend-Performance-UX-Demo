import React, { useCallback, useMemo } from 'react';
import styles from './CocktailNavigator.module.css';  
import { useCocktailAlphabeticQuery } from '@/entities/cocktails/hooks/useCocktailAlphabeticQuery';
import { useCocktailQueryByName } from '@/entities/cocktails/hooks/useCocktailQueryByName';
import { mapToCarouselItem } from '@/entities/cocktails/utils/mapToCarouselItem';
import Carousel from '@/shared/components/Carousel/Carousel';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useDeviceDetection } from '@/shared/hooks/useDeviceDetection';

interface CocktailNavigatorProps {
    searchValue: string;
}
 
const CocktailNavigator = (props: CocktailNavigatorProps) => {
    const debouncedQuery = useDebounce(props.searchValue, 250);

    const {
        items,
        isFetchingNextPage,
        fetchNextPage
    } = useCocktailAlphabeticQuery();

    const {
        data: searchResults,
        isLoading: searchLoading
    } = useCocktailQueryByName(debouncedQuery);

    const device = useDeviceDetection(1200); 
      
    // fetching next letter cocktails on scroll end
    const onReachEndHandler = useCallback(async () => {
        if (!debouncedQuery || debouncedQuery === '') {
            await fetchNextPage();
        }
    }, [debouncedQuery, fetchNextPage]);
      
    const showingItems = useMemo(() => {
        if (debouncedQuery !== '') {
            return searchResults.map(mapToCarouselItem);
        }
        else {  
            return items.map(mapToCarouselItem);
        }
    }, [
        debouncedQuery,
        items,
        searchResults
    ]);

    return (
        <div className={styles.navigatorContainer}>
            <Carousel
                direction={device === 'desktop' ? 'horizontal' : 'vertical'}
                items={showingItems}
                onReachEnd={onReachEndHandler}
                loading={searchLoading || isFetchingNextPage}
            />
        </div>
    );
};

export default React.memo(CocktailNavigator);
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const DEFAULT_ITEM_SIZE = 20;

const CocktailNavigator = (props: CocktailNavigatorProps) => {
    const debouncedQuery = useDebounce(props.searchValue, 250);
    const { items: navigatorResults, loading: navigatorLoading, hasMore } = useCocktailAlphabeticQuery(true);
    const { data: searchResults, isLoading: searchLoading } = useCocktailQueryByName(debouncedQuery);
    const device = useDeviceDetection(1200); 
    const [navigatorResultsOffset, setNavigatorResultsOffset] = useState(DEFAULT_ITEM_SIZE);

    // rendering next letter cocktails on scroll end
    const onReachEndHandler = useCallback(() => {
        if (!debouncedQuery || debouncedQuery === '') {
            setNavigatorResultsOffset(prevOffset => prevOffset + DEFAULT_ITEM_SIZE);
        }
    }, [debouncedQuery]);
      
    useEffect(() => { 

        // reset offset when search query is empty
        if (debouncedQuery && debouncedQuery !== '') {
            setNavigatorResultsOffset(DEFAULT_ITEM_SIZE);
        }

    }, [debouncedQuery]);
     
    const showingItems = useMemo(() => {
        if (debouncedQuery !== '') {
            return searchResults
                .map(mapToCarouselItem);
        }
        else { 
            return navigatorResults
                .slice(0, navigatorResultsOffset)
                .map(mapToCarouselItem);
        }
    }, [
        debouncedQuery,
        navigatorResults,
        searchResults,
        navigatorResultsOffset
    ]);

    return (
        <div className={styles.navigatorContainer}>
            <Carousel
                direction={device === 'desktop' ? 'horizontal' : 'vertical'}
                items={!hasMore ? showingItems : []}
                onReachEnd={onReachEndHandler}
                loading={searchLoading || navigatorLoading}
            />
        </div>
    );
};

export default React.memo(CocktailNavigator);
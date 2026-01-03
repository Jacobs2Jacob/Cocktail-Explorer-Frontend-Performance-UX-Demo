import { useCallback, useMemo } from 'react';
import styles from './CocktailNavigator.module.css';  
import { useCocktailAlphabeticQuery } from '@/entities/cocktails/hooks/useCocktailAlphabeticQuery';
import { useCocktailQueryByName } from '@/entities/cocktails/hooks/useCocktailQueryByName';
import { mapToCarouselItem } from '@/entities/cocktails/utils/mapToCarouselItem';
import Carousel from '@/shared/components/Carousel/Carousel';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

interface CocktailNavigatorProps {
    searchValue: string;
}
 
const CocktailNavigator = (props: CocktailNavigatorProps) => {
    const debouncedQuery = useDebounce(props.searchValue, 250);
    const isMobile = useMediaQuery('(max-width: 1200px)');

    const {
        items,
        isFetchingNextPage,
        fetchNextPage,
        isInitialLoading
    } = useCocktailAlphabeticQuery();

    const {
        data: searchResults,
        isLoading: searchLoading
    } = useCocktailQueryByName(debouncedQuery);
       
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
                direction={isMobile ? 'vertical' : 'horizontal'}
                items={showingItems}
                onReachEnd={onReachEndHandler}
                fetching={isInitialLoading || searchLoading || isFetchingNextPage}
            />
        </div>
    );
};

export default CocktailNavigator;
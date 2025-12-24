import { Cocktail } from '../types';  
import { cocktailApi } from '../services/cocktailApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { storageCocktailService } from '../services/storageCocktailService';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export const useCocktailAlphabeticQuery = () => {  

    const infiniteQuery = useInfiniteQuery<Cocktail[], Error, Cocktail[]>({
        queryKey: ['cocktails'],
        queryFn: async ({ pageParam = ALPHABET[0] }) => {
            return await cocktailApi.getCocktailsByFirstLetter(pageParam as string);
        },
        getNextPageParam: (_, allPages) => {
            const nextIndex = allPages.length;
            return nextIndex >= ALPHABET.length
                ? undefined
                : ALPHABET[nextIndex]
        },
        initialPageParam: ALPHABET[0],
        select: (apiCocktails) => {
            const nextIndex = apiCocktails.pages.length;
            const storageCocktails = storageCocktailService
                .getStorageCocktailsByFirstLetter(ALPHABET[nextIndex]);

            // auto memoized by react-query
            return [...apiCocktails.pages.flatMap(f => f), ...storageCocktails];
        },
    });
      
    return {
        fetchNextPage: infiniteQuery.fetchNextPage,
        hasNextPage: infiniteQuery.hasNextPage,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
        isError: infiniteQuery.isError,
        refetch: infiniteQuery.refetch,
        items: infiniteQuery.data ?? [],
    };
};
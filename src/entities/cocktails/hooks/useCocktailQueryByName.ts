import { cocktailApi } from '../services/cocktailApi';
import { storageCocktailService } from '../services/storageCocktailService';
import { Cocktail } from '../types';
import { useQuery } from '@tanstack/react-query';

export const useCocktailQueryByName = (query: string = '') => {
    const {
        data = [],
        isLoading,
        isError
    } = useQuery<Cocktail[], Error>({
        queryKey: ['search_cocktails', query],
        queryFn: ({ signal }) => {
            return cocktailApi.searchCocktails(query, signal);
        },
        select: (apiCocktails) => {
            const storageCocktails = storageCocktailService
                .getStorageCocktails()
                .filter(c =>
                    c.name.toLowerCase().includes(query.toLowerCase())
                );

            // auto memoized by react-query
            return [...apiCocktails, ...storageCocktails];
        },
        //placeholderData: previous => previous,
        enabled: query.trim().length > 0,
    }); 

    return {
        data,
        isLoading,
        isError,
    };
};
import { useState, useCallback, useEffect } from 'react';
import { queryClient } from '@/app/providers/ReactQueryProvider';
import { getCocktailsByFirstLetter } from '../services/cocktailService';
import { Cocktail } from '../types'; 
import { getStorageCocktailsByFirstLetter } from '../services/storageCocktailService';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export const useCocktailAlphabeticQuery = (loadAll: boolean) => {
    const [items, setItems] = useState<Cocktail[]>([]);
    const [letterIndex, setLetterIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
     
    const loadNext = useCallback(async (specificLetterIndex: number) => {

        // loading or end of the list
        if (loading || letterIndex >= ALPHABET.length) {
            setHasMore(false);
            return;
        }

        setLoading(true);
        const letter = ALPHABET[specificLetterIndex ?? letterIndex];

        const apiCocktails = await queryClient.fetchQuery({
            queryKey: ['cocktailsByFirstLetter', letter],
            queryFn: () => getCocktailsByFirstLetter(letter),
            staleTime: 1000 * 60 * 10, // 10 min relevance,
            gcTime: 1000 * 60 * 10,  // 10 min cache,
        });

        const storageCocktails = getStorageCocktailsByFirstLetter(letter) || [];
        const mergedCocktails = [...apiCocktails, ...storageCocktails];

        setItems((prev) => { 
            return [...prev, ...mergedCocktails];
        });

        // increment letter
        setLetterIndex((prev) => prev + 1);
        setLoading(false);
    }, [loading, letterIndex]);

    useEffect(() => {
        if (!loadAll) {
            return;
        }

        const loadAllData = async () => {
            let index = letterIndex;

            while (index < ALPHABET.length) {
                await loadNext(index);
                index++;
            }

            setHasMore(false);
        };

        loadAllData();
    }, [loadAll]);

    return {
        items,
        hasMore,
        loadNext,
        loading,
    };
};
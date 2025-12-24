import { useState } from 'react';   
import { Cocktail } from '../types';
import { storageCocktailService } from '../services/storageCocktailService';
import { utils } from '@/shared/utils';

export const useStorageCocktails = () => { 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
     
    // Add cocktail and update state
    const addCocktail = (cocktail: Cocktail): boolean => {

        try {
            setIsLoading(true);
            const storageCocktail = storageCocktailService.addStorageCocktail(cocktail);

            if (storageCocktail) {
                const updated = storageCocktailService.getStorageCocktails(); 

                if (updated) {
                    return true;
                }
            }
        }
        catch (error) {
            utils.handleApiError(error, setError);
        }
        finally {
            setIsLoading(false);
        }

        return false;
    }

    return {
        addCocktail,
        isLoading,
        error
    };
};
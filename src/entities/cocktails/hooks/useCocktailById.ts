import { Cocktail, DataSource } from '../types'; 
import { cocktailApi } from '../services/cocktailApi';
import { useQuery } from '@tanstack/react-query';

interface UseCocktailByIdProps {
    id: string;
    dataSource?: DataSource;
}

export const useCocktailById = ({ id }: UseCocktailByIdProps) => {
    return useQuery<Cocktail | null>({
        queryKey: ['cocktail', id],
        queryFn: () => cocktailApi.getCocktailById(id),
        enabled: Boolean(id),
    });
};
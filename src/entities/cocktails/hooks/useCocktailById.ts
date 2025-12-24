import { useState, useEffect } from 'react';
import { Cocktail, DataSource } from '../types'; 
import { cocktailApi } from '../services/cocktailApi';
import { utils } from '@/shared/utils';

interface UseCocktailByIdProps {
    id: string;
    dataSource?: DataSource;
}

export const useCocktailById = ({ id }: UseCocktailByIdProps) => {
  const [data, setData] = useState<Cocktail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        return;
    }

  const fetchCocktail = async () => {
      setIsLoading(true);
      
      try {
          let cocktail = await cocktailApi.getCocktailById(id);
          setData(cocktail);
      }
      catch (err) {
          utils.handleApiError(err, setError);
      }
      finally {
          setIsLoading(false);
      } 
  }
   
    fetchCocktail();

  }, [id]);

    return {
        data,
        isLoading,
        error
    };
};
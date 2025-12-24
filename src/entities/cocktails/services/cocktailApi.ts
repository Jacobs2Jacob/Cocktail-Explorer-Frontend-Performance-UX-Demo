import { Cocktail } from "../types";
import { mapCocktailFromApi } from "../utils/mapCocktailFromApi";
import axiosClient from "@/shared/api/axiosClient"; 

export const cocktailApi = {
    searchCocktails: async (input: string, signal: AbortSignal): Promise<Cocktail[]> => {
        const res = await axiosClient.get(`/cocktails/search.php?s=${input}`, { signal });
        return Array.isArray(res.data.drinks) ? res.data.drinks.map(mapCocktailFromApi) : [];
    },
    getCocktailsByFirstLetter: async (letter: string): Promise<Cocktail[]> => {
        const res = await axiosClient.get(`/cocktails/search.php?f=${letter}`);
        return Array.isArray(res.data.drinks) ? res.data.drinks.map(mapCocktailFromApi) : [];
    },
    getCocktailById: async (id: string): Promise<Cocktail | null> => {
        const res = await axiosClient.get(`/cocktails/lookup.php?i=${id}`);
        return res.data.drinks?.[0] ? mapCocktailFromApi(res.data.drinks[0]) : null;
    }
}
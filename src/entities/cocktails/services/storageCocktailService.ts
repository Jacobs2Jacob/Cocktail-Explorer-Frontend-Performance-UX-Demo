import { Cocktail } from "../types";
import { generateStorageCocktailId } from "../utils/generateStorageCocktailId";

const STORAGE_KEY = import.meta.env.VITE_COCKTAILS_STORAGE_KEY;

// fast caching avoid parsing
let cachedCocktails: Cocktail[] | null = null;

export const storageCocktailService = {
    getStorageCocktails: (): Cocktail[] => {

        if (cachedCocktails) {
            return cachedCocktails;
        }

        const stored = localStorage.getItem(STORAGE_KEY);
        cachedCocktails = stored ? JSON.parse(stored) : [];
        return cachedCocktails ?? [];
    },
    getStorageCocktailById: (id: string): Cocktail | null => {
        const cocktail = storageCocktailService.getStorageCocktails().find(f => f.id === id);
        return cocktail ?? null;
    },
    addStorageCocktail: (cocktail: Cocktail): Cocktail | null => {

        try {
            const cocktailToAdd = { ...cocktail, id: generateStorageCocktailId() };
            const newCocktails = [...storageCocktailService.getStorageCocktails(), cocktailToAdd];
            cachedCocktails = newCocktails;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newCocktails));

            return cocktailToAdd;
        }
        catch (e) {
            // TODO: Pass to logger
            console.error(`(addStorageCocktail) Failed adding cocktail to storage. Input: ${JSON.stringify(cocktail)}`, e);
            return null;
        }
    },
    getStorageCocktailsByFirstLetter: (letter: string): Cocktail[] => {
        return storageCocktailService.getStorageCocktails().filter(f => f.name.startsWith(letter));
    }   
}
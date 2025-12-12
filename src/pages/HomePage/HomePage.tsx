import { useState } from 'react';
import CocktailNavigator from '../../features/cocktails/CocktailNavigator/CocktailNavigator';
import SearchBar from '../../shared/components/Layout/SearchBar/SearchBar';

const HomePage = () => {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <SearchBar onSearchChange={setSearchTerm} />
            <CocktailNavigator searchValue={searchTerm} />
        </>
    );
};

export default HomePage;
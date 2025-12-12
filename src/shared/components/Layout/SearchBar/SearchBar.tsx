import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    placeholder?: string;
    onSearchChange: (term: string) => void;
}

const SearchBar = (props: SearchBarProps) => {

    const [term, setTerm] = useState('');
       
    // each keypress
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        props.onSearchChange(e.target.value);
    };
       
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={term}
                placeholder={props.placeholder ?? 'Search cocktails...'}
                onChange={handleChange}
                className={styles.input}
            />
        </div>
    );
};

export default SearchBar;
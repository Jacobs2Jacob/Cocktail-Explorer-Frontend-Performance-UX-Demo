import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import styles from './CocktailDetailPage.module.css'; 
import { Cocktail } from '@/entities/cocktails/types'; 
import { useCocktailById } from '@/entities/cocktails/hooks/useCocktailById'; 
import { EmptyState } from '../../shared/components/ErrorStates/EmptyState';
import Loader from '../../shared/components/Layout/Loader/Loader';
import { ErrorState } from '../../shared/components/ErrorStates/ErrorState';

const CocktailDetailPage = () => {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState<Cocktail>();
    const {
        data,
        error,
        isLoading
    } = useCocktailById({ id: id ?? '', dataSource: id?.startsWith('user-') ? 'storage' : 'api' });

    useEffect(() => {
        if (data) {
            setCocktail(data);
        }
    }, [data])
     
    // loading indication
    if (isLoading) {
        return <Loader />;
    }

    // empty indication
    if (!data) {
        return <EmptyState message={'Cocktail was not found..'} />;
    }

    // loading indication
    if (error) {
        return <ErrorState message={'Could not retrieve Cocktail'} />;
    }

    return (
        cocktail && <div className={styles.container}>
            <h1 className={styles.title}>{cocktail.name}</h1>

            <img
                src={cocktail.image}
                alt={cocktail.name}
                className={styles.image}
            />

            <div className={styles.card}>
                <h2 style={{ marginTop: '25px' }}>Ingredients</h2>
                <ul>
                    {cocktail.ingredients
                        // filter out undefined ingredients
                        ?.filter((item): item is { ingredient: string; measure: string } => Boolean(item && item.ingredient))
                        .map((item) => (
                            <li key={item.ingredient}>
                                {item.measure} {item.ingredient}
                            </li>
                        ))}
                </ul>

                <h2>Instructions</h2>
                <p>{cocktail.instructions}</p>
            </div>
            
        </div>
    );
};

export default CocktailDetailPage;
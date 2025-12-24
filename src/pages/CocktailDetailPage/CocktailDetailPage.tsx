import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import styles from './CocktailDetailPage.module.css'; 
import { Cocktail } from '@/entities/cocktails/types'; 
import { useCocktailById } from '@/entities/cocktails/hooks/useCocktailById';
import CocktailDetailPageSkeleton from './CocktailDetailPageSkeleton';

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

    // loader indication
    if (isLoading) {
        return <CocktailDetailPageSkeleton />;
    }

    // error indication
    if (error) {
        return <p className={styles.error}>Cocktail not found.</p>;
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
import styles from './NewCocktailPage.module.css'; 
import NewCocktailForm from '@/features/cocktails/NewCocktailForm/NewCocktailForm';
import { Cocktail } from '@/entities/cocktails/types';   
import { useNavigate } from 'react-router-dom'; 
import { ReactNode, useState } from 'react';
import Modal from '@/shared/components/Layout/Modal/Modal';
import { useStorageCocktails } from '@/entities/cocktails/hooks/useStorageCocktails';
import clsx from 'clsx';

const NewCocktailPage = () => {
    const { addCocktail } = useStorageCocktails();  
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [modalContent, setModalContent] = useState<ReactNode>(null);
     
    const handleOnSubmit = (data: Cocktail) => {
        const addedCocktail = addCocktail(data);

        if (addedCocktail) {
            setTitle('Saved');
            setModalContent(
                <div> 
                    <label>Cocktail saved successfully</label>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setOpen(false);
                                navigate('/');
                            }}
                            className={clsx('btn-blue', styles.modalBtn)}>
                            Back to Home Page
                        </button>
                    </div>
                    
                </div>
            );
        } else {
            setTitle('Failed');
            setModalContent(
                <div> 
                    <label>Failed to save Cocktail</label>
                    <div>
                        <button
                            type='button'
                            onClick={() => setOpen(false)}
                            className={clsx('btn-blue', styles.modalBtn)}>
                            Close
                        </button>
                    </div>
                </div>
            );
        }

        setOpen(true);
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Add a New Cocktail</h1>
            <NewCocktailForm onSubmit={handleOnSubmit} />
            <Modal
                className={styles.confirmationModal}
                open={open}
                onClose={() => setOpen(false)}
                title={title}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default NewCocktailPage;
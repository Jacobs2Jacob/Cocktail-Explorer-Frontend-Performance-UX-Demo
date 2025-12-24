import styles from './NewCocktailPage.module.css'; 
import NewCocktailForm from '@/features/cocktails/NewCocktailForm/NewCocktailForm';
import { Cocktail } from '@/entities/cocktails/types';   
import { useNavigate } from 'react-router-dom'; 
import { ReactNode, useState } from 'react';
import Modal from '@/shared/components/Modal/Modal';
import { useStorageCocktails } from '@/entities/cocktails/hooks/useStorageCocktails';

const NewCocktailPage = () => {
    const { addCocktail } = useStorageCocktails();  
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [modalContent, setModalContent] = useState<ReactNode>(null);
     
    const handleOnSubmit = (data: Cocktail) => {
        const addedCocktail = addCocktail(data);

        if (addedCocktail) {
            setTitle('Saved!');
            setModalContent(
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                > 
                    <button
                        type='button'
                        onClick={() => {
                            setOpen(false);
                            navigate('/');
                        }}
                        className='btn-blue'
                        style={{ marginTop: '15px' }}
                    >
                        Back to Home Page
                    </button>
                </div>
            );
        } else {
            setTitle('Failed to save Cocktail');
            setModalContent(
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                > 
                    <button
                        type='button'
                        onClick={() => setOpen(false)}
                        className='btn-blue'
                        style={{ marginTop: '15px' }}
                    >
                        Close
                    </button>
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
                open={open}
                onClose={() => setOpen(false)}
                title={title}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default NewCocktailPage;
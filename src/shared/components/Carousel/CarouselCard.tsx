import React from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

interface CarouselCardProps {
    item: CarouselItem;
}

const CarouselCard = (props: CarouselCardProps) => {

    const navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => props.item.navigationUrl && navigate(props.item.navigationUrl)}>
            <LazyImage
                src={props.item.image}
                alt={props.item.label}
                className={styles.image}
            />
            <p className={styles.label}>{props.item.label}</p>
        </div>
    );
};

export default React.memo(CarouselCard);
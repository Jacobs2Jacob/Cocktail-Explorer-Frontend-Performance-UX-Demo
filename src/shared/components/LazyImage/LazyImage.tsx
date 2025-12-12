import React, { ImgHTMLAttributes } from 'react';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement>;

const LazyImage = ({ src, alt, ...rest }: LazyImageProps) => {
    const [error, setError] = React.useState(false);


    if (!src || src === '') {
        return null;
    }

    return (
         <img
            src={error ? '/fallback.jpg' : src}
            alt={alt}
            onError={() => setError(true)}
            loading="lazy"
            {...rest}
        />
    );
};

export default LazyImage;
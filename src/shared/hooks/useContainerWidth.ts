import { useLayoutEffect, useState, useRef } from 'react';

export const useContainerWidth = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        
        if (!containerRef.current) {
            return;
        }

        const refObject = containerRef.current;

        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });

        observer.observe(refObject);

        // unmount
        return () => {
            if (refObject) {
                observer.unobserve(refObject);
            }
        };
    }, []);

    return { containerRef, width };
}
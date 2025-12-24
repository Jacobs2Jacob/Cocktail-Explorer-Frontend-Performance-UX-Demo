import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual'; 

interface UseVirtualizedControllerProps {
    count: number;
    estimateSize: number;
    horizontal: boolean;
    onScrollEnd: () => void; 
    onScrollStateChange?: (canScrollBack: boolean, canScrollForward: boolean) => void;
    scrollByOffsetSize: (el: HTMLDivElement) => number;
    overscan?: number;
}

type ScrollDirection = 'backward' | 'forward';

export const useVirtualizedController = ({
    count,
    estimateSize,
    horizontal,
    onScrollEnd,
    onScrollStateChange = () => {},
    scrollByOffsetSize,
    overscan = 1,
}: UseVirtualizedControllerProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasReachedEnd = useRef(0);

    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => estimateSize,
        horizontal,
        overscan,
    });

    const lastTriggeredLengthRef = useRef(0);

    const triggerOnReachEnd = useCallback(() => {
        const virtualItems = virtualizer.getVirtualItems();
        if (!virtualItems.length) return;

        const last = virtualItems[virtualItems.length - 1];

        // "close to end" based on your current loaded items
        const closeToEnd = last.index >= virtualItems.length - 1 - overscan;

        // only fire once per items.length
        if (closeToEnd && lastTriggeredLengthRef.current !== virtualItems.length) {
            lastTriggeredLengthRef.current = virtualItems.length;
            onScrollEnd();
        }
    }, [virtualizer, overscan, onScrollEnd]);

    // Update scroll state (canScrollBack, canScrollForward) for Horizontal Nav
    const updateScrollState = useCallback(() => {
         
        const el = scrollRef.current;

        if (!el) {
            return;
        }

        const scrollPos = horizontal ? el.scrollLeft : el.scrollTop;
        const maxScroll = horizontal
            ? el.scrollWidth - el.clientWidth
            : el.scrollHeight - el.clientHeight;

        const canScrollBack = scrollPos > 1;
        const canScrollForward = scrollPos < maxScroll - 1;

        onScrollStateChange(canScrollBack, canScrollForward); 
    }, [horizontal, onScrollStateChange]);

    // Manual Scrolling
    const scrollByOffset = useCallback((direction: ScrollDirection) => {

            const el = scrollRef.current;

            if (!el) {
                return;
            }

            const offset = direction === 'backward' ? -scrollByOffsetSize(el) : scrollByOffsetSize(el);
            const target = horizontal ? el.scrollLeft + offset : el.scrollTop + offset;

            el.scrollTo({
                [horizontal ? 'left' : 'top']: target,
                behavior: 'smooth',
            });
        }, [horizontal, scrollByOffsetSize]
    );
     
    const handleScroll = useCallback(() => {
        triggerOnReachEnd();
        updateScrollState();
    }, [triggerOnReachEnd, updateScrollState]);

    return {
        scrollRef,
        virtualizer, 
        scrollByOffset,
        handleScroll,
    };
}


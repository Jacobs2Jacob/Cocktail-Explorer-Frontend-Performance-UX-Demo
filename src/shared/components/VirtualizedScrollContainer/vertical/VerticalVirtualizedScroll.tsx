import { useMemo } from 'react';
import styles from './VerticalVirtualizedScroll.module.css'; 
import { useContainerWidth } from '../../../hooks/useContainerWidth';
import { VirtualizedScrollProps } from '../types';
import { useVirtualizedController } from '../useVirtualizedController';

const DEFAULT_ITEM_HEIGHT = 250;
const MIN_ITEM_WIDTH = 180;

const VerticalVirtualizedScroll = <T,>({
    items,
    renderItem,
    onScrollEnd,
    onScrollStateChange,
    isLoading,
    estimateSize = DEFAULT_ITEM_HEIGHT,
}: VirtualizedScrollProps<T>) => {

    const { containerRef, width: containerWidth } = useContainerWidth();  
    const itemsPerRow = Math.max(1, Math.floor(containerWidth / MIN_ITEM_WIDTH));

    // Group items into rows  based on virtualization one dimentional requirements
    const rows = useMemo(() => {
        const grouped: T[][] = [];

        for (let i = 0; i < items.length; i += itemsPerRow) {
            grouped.push(items.slice(i, i + itemsPerRow));
        }

        return grouped;
    }, [items, itemsPerRow]);

    const {
        scrollRef,
        virtualizer,
        handleScroll,
    } = useVirtualizedController({
        isLoading,
        count: rows.length,
        estimateSize,
        horizontal: false,
        onScrollEnd,
        onScrollStateChange,
        scrollByOffsetSize: (el) => el.offsetHeight,
    });

    // center flex items by calculating left padding depends on container width change  
    const getLeftPadding = () => {  
        const rowWidth = itemsPerRow * MIN_ITEM_WIDTH;
        return Math.max(0, (containerWidth - rowWidth) / 2);
    }

    return (
        <div ref={containerRef} className={styles.wrapper}>
            <div
                ref={scrollRef}
                className={styles.verticalContent}
                onScroll={handleScroll}
            >
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const paddingLeft = getLeftPadding();

                        return <div data-index={virtualRow.index}
                             key={virtualRow.key}
                             className={styles.itemContainer}
                             style={{ 
                                top: virtualRow.start,  
                                height: virtualRow.size,
                                paddingLeft
                             }}>
                            {rows[virtualRow.index].map((item, idx) =>
                                renderItem(item, virtualRow.index * itemsPerRow + idx)
                            )}
                        </div> 
                    })}
                </div>
            </div>
        </div>
    );
}; 

export default VerticalVirtualizedScroll;
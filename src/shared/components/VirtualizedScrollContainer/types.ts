

export interface VirtualizedScrollProps {
    items: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    onScrollEnd: () => void;
    onScrollStateChange?: (canScrollBack: boolean, canScrollForward: boolean) => void;
    estimateSize?: number;
}


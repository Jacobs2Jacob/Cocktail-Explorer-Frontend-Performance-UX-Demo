
interface EmptyStateProps {
    message: string;
}

export const EmptyState = (props: EmptyStateProps) => {
    return (
        <div style={{ padding: '1rem', margin: 'auto' }}>
            <p>{props.message}</p>
        </div>
    );
};

interface EmptyStateProps {
    message: string;
}

export const EmptyState = (props: EmptyStateProps) => {
    return (
        <div style={{ padding: '1rem' }}>
            <p>{props.message}</p>
        </div>
    );
};
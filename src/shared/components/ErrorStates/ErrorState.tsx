
interface ErrorStateProps {
    message: string;
    title?: string;
}

export const ErrorState = ({
    message,
    title = 'Something went wrong',
}: ErrorStateProps) => {
    return (
        <div style={{ padding: '1rem' }}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
};
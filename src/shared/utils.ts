import { SortDirection } from "@/shared/types";

export const utils = {
    validateAndReadImage: (
        file: File,
        options: {
            maxSize?: number;
            allowedTypes?: string[];
            onSuccess: (base64: string) => void;
            onError?: (message: string) => void;
        }
    ) => {
        const {
            maxSize = 3145728,
            allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
            onSuccess,
            onError
        } = options;

        // type check
        if (!allowedTypes.includes(file.type)) {
            if (onError) {
                onError('Unsupported file type. Please upload a JPG, PNG, or WEBP image.');
            }

            return;
        }

        // size check
        if (file.size > maxSize) {
            if (onError) {
                onError('File size exceeds limit. Please upload an image smaller than 3MB.');
            }

            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            onSuccess(reader.result as string);
        };

        reader.readAsDataURL(file);
    },
    sortByKey: <T>(
        data: T[],
        sortKey: keyof T,
        direction: SortDirection
    ) => {
        return [...data].sort((a, b) => {
            const aVal = String(a[sortKey]).toLowerCase();
            const bVal = String(b[sortKey]).toLowerCase();

            return direction === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });
    },
    handleApiError: (
        err: unknown,
        onError: (message: string) => void
    ) => {

        if (err instanceof DOMException && err.name === 'AbortError') {
            return;
        }

        if (err instanceof Error) {
            onError(err.message);
        } else {
            onError('Unknown error');
        }
    }
}
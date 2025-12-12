import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import HomePage from '@/pages/HomePage/HomePage';
import Loader from '@/shared/components/Layout/Loader/Loader';
import ErrorBoundary from '@/app/providers/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '@/app/providers/ErrorBoundary/ErrorFallback';

const CocktailDetailPage = lazy(() => import('@/pages/CocktailDetailPage/CocktailDetailPage'));
const NewCocktailPage = lazy(() => import('@/pages/NewCocktailPage/NewCocktailPage'));

const AppRoutes = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="cocktail/:id" element={<CocktailDetailPage />} />
                    <Route path="cocktail/new" element={<NewCocktailPage />} />
                </Route>
            </Routes>
        </Suspense>
    </ErrorBoundary>
);

export default AppRoutes;
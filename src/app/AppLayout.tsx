import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/Layout/Header/Header';
import { Footer } from '../shared/components/Layout/Footer/Footer';

const AppLayout = () => {
     
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default AppLayout;
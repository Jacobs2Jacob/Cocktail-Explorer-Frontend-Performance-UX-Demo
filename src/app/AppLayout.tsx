import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/Layout/Header/Header';
import { Footer } from '../shared/components/Layout/Footer/Footer';

const AppLayout = () => {
     
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'space-between'
        }}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AppLayout;
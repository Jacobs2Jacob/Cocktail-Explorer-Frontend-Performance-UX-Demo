import { Outlet } from 'react-router-dom'; 
import Header from '../shared/components/Layout/Header/Header';
 
const AppLayout = () => {
     
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default AppLayout;
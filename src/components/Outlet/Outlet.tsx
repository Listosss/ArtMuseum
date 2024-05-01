import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function AppOutlet() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

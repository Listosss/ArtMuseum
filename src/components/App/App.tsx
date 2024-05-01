import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppOutlet from '@components/Outlet/Outlet';
import FavoritesPage from '@pages/FavoritePage/FavoritePage';
import ArtDetailsPage from '@pages/ArtDetailsPage/ArtDetailsPage';
import MainPage from '@pages/MainPage/MainPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AppOutlet />}>
                <Route index element={<MainPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/art/:id" element={<ArtDetailsPage />} />
            </Route>
        </Routes>
    );
}

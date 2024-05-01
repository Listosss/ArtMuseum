import FavoriteCard from '@components/FavoriteCard/FavoriteCard';
import './FavoritePage.css';
import { useState, useEffect } from 'react';
import Artwork from 'constants/Artwork';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        let loadedFavorites: Artwork[] = [];
        for (let key in localStorage) {
            if (
                !localStorage.hasOwnProperty(key) ||
                key === 'search-value' ||
                key === 'search-page' ||
                key === 'gallery-page' ||
                key === 'sortType'
            )
                continue;
            const art = JSON.parse(localStorage.getItem(key)!);
            loadedFavorites = [...loadedFavorites, art];
        }
        setFavorites(loadedFavorites);
        setLoading(false);
    }, []);

    return (
        <>
            <div className="favPageSection">
                <h1 className="favpTitle">Here Are Your</h1>
                <h1 className="favpOrangeTitle">Favorites</h1>
            </div>
            {loading && <h1 className="favLoading">Loading...</h1>}
            {favorites.length === 0 && !loading && (
                <div className="nothingFavText">
                    <h1>~</h1>
                    <h1>nothing here yet...</h1>
                </div>
            )}
            {favorites.length > 0 && !loading && (
                <>
                    <div className="favPageSection">
                        <h1 className="orangeSecTitle">Saved by you</h1>
                        <h1 className="graySecTitle">Your favorites list</h1>
                    </div>
                    <div className="flexCenter">
                        <div className="favoritesWrapper">
                            {favorites.map((elem) => {
                                return (
                                    <FavoriteCard
                                        key={elem.id + 'fav'}
                                        data={{ ...elem }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

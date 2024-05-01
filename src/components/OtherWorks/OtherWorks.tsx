import './OtherWorks.css';
import FavoriteCard from '@components/FavoriteCard/FavoriteCard';
import { useEffect, useState } from 'react';
import Artwork from 'constants/Artwork';
import ArtworksResponse from 'constants/ArtworkResponse';

export default function OtherWorks() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.artic.edu/api/v1/artworks?page=116&limit=9`,
            );
            const data: ArtworksResponse = await response.json();
            setArtworks(data.data);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
        setLoading(false);
    };

    return (
        <div className="otherWrapper">
            {loading && <h1 className="artsLoader">Loading...</h1>}
            <div className="flexCenter">
                <div className="otherWorksWrapper">
                    {artworks.map((elem) => {
                        return (
                            <FavoriteCard
                                key={elem.id + 'other'}
                                data={{ ...elem }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

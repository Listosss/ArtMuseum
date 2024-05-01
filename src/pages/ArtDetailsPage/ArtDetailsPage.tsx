import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ArtDetailsPage.css';
import ArtDetais from '@components/ArtDetails/ArtDetails';
import Artwork from 'constants/Artwork';

export default function ArtDetailsPage() {
    const id = useParams().id;
    const [artData, setArtData] = useState<Artwork>();
    const [loading, setLoading] = useState<boolean>(false);

    const getDeatails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.artic.edu/api/v1/artworks/${id}`,
            );
            const data = await response.json();
            setArtData(data.data);
        } catch (error) {
            console.error('Error fetching artwork details:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getDeatails();
    }, []);

    return (
        <div className="artDetailsWrapper">
            {loading && <h1 className="artsLoader">Loading...</h1>}
            {!loading && <ArtDetais artData={{ ...artData }} />}
        </div>
    );
}

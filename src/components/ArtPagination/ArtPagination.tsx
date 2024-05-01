import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './ArtPagination.css';
import Artwork from 'constants/Artwork';
import ArtCard from '../ArtCard/ArtCard';
import ArtworksResponse from 'constants/ArtworkResponse';

export default function ArtPagination({
    sortBy,
    setSort,
}: {
    sortBy: string;
    setSort: Dispatch<SetStateAction<string>>;
}) {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(
        localStorage.getItem('gallery-page')
            ? Number(localStorage.getItem('gallery-page'))
            : 1,
    );
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        fetchArtworks();
        localStorage.setItem('gallery-page', JSON.stringify(currentPage));
    }, [currentPage]);

    const fetchArtworks = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.artic.edu/api/v1/artworks?fields=id,title,thumbnail,artist_title,artwork_type_title,date_start,date_end,place_of_origin,dimensions,credit_line,department_title&page=${currentPage}&limit=3`,
            );
            const data: ArtworksResponse = await response.json();
            setArtworks(data.data);
            setTotalPages(data.pagination.total_pages);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
        setSort('none');
        setLoading(false);
    };

    useEffect(() => {
        if (sortBy === 'date ↓') {
            const sortedByDate = artworks?.sort(
                (a: Artwork, b: Artwork) =>
                    Number(b.date_start) - Number(a.date_start),
            ); // Сортировка по дате, убывание
            sortedByDate && setArtworks([...sortedByDate]);
        } else if (sortBy === 'date ↑') {
            const sortedByDate = artworks?.sort(
                (a: Artwork, b: Artwork) =>
                    Number(a.date_start) - Number(b.date_start),
            ); // Сортировка по дате, возрастание
            sortedByDate && setArtworks([...sortedByDate]);
        } else if (sortBy === 'alphabet ↓') {
            const sortedByAlphabet = artworks?.sort((a: Artwork, b: Artwork) =>
                (a.title ? a.title : '').localeCompare(b.title ? b.title : ''),
            ); // Сортировка по алфавиту, убывание
            sortedByAlphabet && setArtworks([...sortedByAlphabet]);
        } else if (sortBy === 'alphabet ↑') {
            const sortedByAlphabet = artworks
                ?.sort((a: Artwork, b: Artwork) =>
                    (a.title ? a.title : '').localeCompare(
                        b.title ? b.title : '',
                    ),
                )
                .reverse(); // Сортировка по алфавиту, возрастание
            sortedByAlphabet && setArtworks([...sortedByAlphabet]);
        }
    }, [sortBy]);

    const nextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };
    const renderPageButtons = (): JSX.Element[] => {
        const pageButtons: JSX.Element[] = [];
        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(startPage + 3, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className="pagButton"
                    onClick={() => goToPage(i)}
                    disabled={i === currentPage}
                >
                    {i}
                </button>,
            );
        }
        return pageButtons;
    };

    return (
        <div className="artGallerySection">
            {loading && <h1 className="artsLoader">Loading...</h1>}
            {artworks && !loading && (
                <>
                    <div className="artGalleryDiv">
                        {artworks.map((artwork) => {
                            return (
                                <ArtCard
                                    key={artwork.id}
                                    data={{ ...artwork }}
                                />
                            );
                        })}
                    </div>
                    <div className="paginationButtons">
                        <div className="pagArrowButton">
                            <button
                                onClick={() => {
                                    prevPage();
                                }}
                                disabled={currentPage === 1}
                                className="prevPagButton"
                            ></button>
                        </div>
                        {renderPageButtons()}
                        <div className="pagArrowButton">
                            <button
                                onClick={() => {
                                    nextPage();
                                }}
                                disabled={currentPage === totalPages}
                                className="nextPagButton"
                            ></button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

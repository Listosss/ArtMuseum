import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './SearchPagination.css';
import ArtCard from '@components/ArtCard/ArtCard';
import Artwork from 'constants/Artwork';
import ArtworksResponse from 'constants/ArtworkResponse';

export default function SearchPagination({
    sortBy,
    searchValue,
    setSort,
}: {
    sortBy: string;
    searchValue: string;
    setSort: Dispatch<SetStateAction<string>>;
}) {
    const [searchArts, setSearchArts] = useState<Artwork[] | null>([]);
    const [currentPage, setCurrentPage] = useState<number>(
        localStorage.getItem('search-page')
            ? Number(localStorage.getItem('search-page'))
            : 1,
    );
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    async function getData() {
        setLoading(true);
        try {
            if (!searchValue) {
                setSearchArts(null);
                return;
            }
            localStorage.setItem('search-value', JSON.stringify(searchValue));
            const response = await fetch(
                `https://api.artic.edu/api/v1/artworks/search?q=${searchValue}&page=${currentPage}&limit=3`,
            );
            const artworks: ArtworksResponse = await response.json();
            let results: Artwork[] = [];
            await Promise.all(
                artworks.data.map(async (e) => {
                    const artResponse = await fetch(
                        `https://api.artic.edu/api/v1/artworks/${e.id}`,
                    );
                    let art = await artResponse.json();
                    return art;
                }),
            ).then((values) => {
                values.forEach((e) => {
                    results = [...results, e.data];
                });
            });
            setSearchArts([...results]);
            setTotalPages(artworks.pagination.total_pages);
            setSort('none');
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (sortBy === 'date ↓') {
            const sortedByDate = searchArts?.sort(
                (a: Artwork, b: Artwork) =>
                    Number(b.date_start) - Number(a.date_start),
            ); // Сортировка по дате, убывание
            sortedByDate && setSearchArts([...sortedByDate]);
        } else if (sortBy === 'date ↑') {
            const sortedByDate = searchArts?.sort(
                (a: Artwork, b: Artwork) =>
                    Number(a.date_start) - Number(b.date_start),
            ); // Сортировка по дате, возрастание
            sortedByDate && setSearchArts([...sortedByDate]);
        } else if (sortBy === 'alphabet ↓') {
            const sortedByAlphabet = searchArts?.sort(
                (a: Artwork, b: Artwork) =>
                    (a.title ? a.title : '').localeCompare(
                        b.title ? b.title : '',
                    ),
            ); // Сортировка по алфавиту, убывание
            sortedByAlphabet && setSearchArts([...sortedByAlphabet]);
        } else if (sortBy === 'alphabet ↑') {
            const sortedByAlphabet = searchArts
                ?.sort((a: Artwork, b: Artwork) =>
                    (a.title ? a.title : '').localeCompare(
                        b.title ? b.title : '',
                    ),
                )
                .reverse(); // Сортировка по алфавиту, возрастание
            sortedByAlphabet && setSearchArts([...sortedByAlphabet]);
        }
    }, [sortBy]);

    useEffect(() => {
        getData();
        localStorage.setItem('search-page', currentPage.toString());
    }, [currentPage]);

    useEffect(() => {
        getData();
        setCurrentPage(1);
    }, [searchValue]);

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
        <>
            <div className="artGallerySection">
                {loading && <h1 className="artsLoader">Loading...</h1>}
                {totalPages === 0 && (
                    <h1 className="notFoundText">Not found</h1>
                )}
                {searchArts && !loading && (
                    <>
                        <div className="artGalleryDiv">
                            {searchArts.map((artwork) => {
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
        </>
    );
}

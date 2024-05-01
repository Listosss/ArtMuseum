import { useState, useEffect } from 'react';
import ArtPagination from '@components/ArtPagination/ArtPagination';
import './MainPage.css';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import SearchPagination from '@components/SearchPagination/SearchPagination';
import OtherWorks from '@components/OtherWorks/OtherWorks';
import ErrorBoundary from '@components/ErrorBoundarie/ErrorBoundarie';

const validationSchema = yup.object().shape({
    searchValue: yup.string(),
});

export default function MainPage() {
    const [searchValue, setSearchValue] = useState<string>(
        localStorage.getItem('search-value')
            ? JSON.parse(localStorage.getItem('search-value')!)
            : '',
    );
    const [sortBy, setSortBy] = useState<string>('none');
    let timeoutId: NodeJS.Timeout;

    const debouncedSubmit = (values: { searchValue: string }) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            localStorage.removeItem('search-value');
            localStorage.removeItem('search-page');
            localStorage.removeItem('gallery-page');
            localStorage.removeItem('sortType');
            setSortBy('none');
            setSearchValue(values.searchValue);
        }, 500);
    };

    useEffect(() => {
        if (sortBy !== 'none')
            localStorage.setItem('sortType', JSON.stringify(sortBy));
        setSortBy(
            localStorage.getItem('sortType')
                ? JSON.parse(localStorage.getItem('sortType')!)
                : 'none',
        );
    }, [sortBy]);

    return (
        <>
            <div className="mainPageSection">
                <h1 className="findArtText orangeAfter">Let's Find Some </h1>
                <h1 className="findArtText">Here!</h1>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ searchValue: searchValue }}
                    onSubmit={(values) => {
                        debouncedSubmit(values);
                    }}
                >
                    {() => (
                        <Form className="mainForm">
                            <div className="searchDiv">
                                <Field
                                    placeholder="Search art, artist, work..."
                                    type="text"
                                    name="searchValue"
                                    className="form-control"
                                />
                                <button type="submit" className="searchIcon">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.5 25C20.299 25 25 20.299 25 14.5C25 8.70101 20.299 4 14.5 4C8.70101 4 4 8.70101 4 14.5C4 20.299 8.70101 25 14.5 25Z"
                                            stroke="#393939"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M28 28L22 22"
                                            stroke="#393939"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="customSelect">
                    <p>Sort by:</p>
                    <select
                        id="sortSelect"
                        className="selectFilter"
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                    >
                        <option value="none" disabled>
                            -
                        </option>
                        <option value="date ↓">Date ↓</option>
                        <option value="date ↑">Date ↑</option>
                        <option value="alphabet ↓">Alphabet ↓</option>
                        <option value="alphabet ↑">Alphabet ↑</option>
                    </select>
                </div>
            </div>

            <div className="mainPageSection">
                <p className="orangeSecTitle">Topics for you</p>
                <h1 className="graySecTitle">Our special gallery</h1>
                {!searchValue && (
                    <ErrorBoundary>
                        <ArtPagination sortBy={sortBy} setSort={setSortBy} />
                    </ErrorBoundary>
                )}
                {searchValue && (
                    <ErrorBoundary>
                        <SearchPagination
                            searchValue={searchValue}
                            sortBy={sortBy}
                            setSort={setSortBy}
                        />
                    </ErrorBoundary>
                )}
            </div>
            <div className="mainPageSection">
                <p className="orangeSecTitle">Here some more</p>
                <h1 className="graySecTitle">Other works for you</h1>
                <OtherWorks />
            </div>
        </>
    );
}

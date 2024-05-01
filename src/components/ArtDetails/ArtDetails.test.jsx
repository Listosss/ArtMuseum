import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArtDetails from './ArtDetails';

describe('ArtDetails component', () => {
    it('displays artwork details and toggle favorite button correctly', () => {
        const artData = {
            id: 1,
            title: 'Artwork Title',
            artist_title: 'Artist Name',
            date_start: '1900',
            date_end: '2000',
            thumbnail: {
                lqip: 'thumbnail-url',
                alt_text: 'Artwork Thumbnail',
            },
            place_of_origin: 'Artist Nationality',
            dimensions: 'Dimensions Sheet',
            credit_line: 'Credit Line',
            department_title: 'Repository',
        };

        render(<ArtDetails artData={artData} />);

        // правильно ли отображаются детали картины
        expect(screen.getByText('Artwork Title')).toBeInTheDocument();
        expect(screen.getByText('Artist Name')).toBeInTheDocument();
        expect(screen.getByText('1900-2000')).toBeInTheDocument();
        expect(screen.getByAltText('Artwork Thumbnail')).toBeInTheDocument();
        expect(screen.getByText('Artist Nationality')).toBeInTheDocument();
        expect(screen.getByText('Dimensions Sheet')).toBeInTheDocument();
        expect(screen.getByText('Credit Line')).toBeInTheDocument();
        expect(screen.getByText('Repository')).toBeInTheDocument();

        // отображается ли кнопка сохранения в избранное и пустая ли она
        const favoriteButton = screen.getByTestId('saveArtToFav');
        expect(favoriteButton).toBeInTheDocument();
        const fillIcon = screen.getByTestId('fillIcon');
        expect(fillIcon).toBeInTheDocument();
        expect(fillIcon).toHaveAttribute('fill', 'none');
    });

    it('toggles favorite button color and localStorage on click', () => {
        const artData = {
            id: 1,
            title: 'Artwork Title',
            artist_title: 'Artist Name',
            date_start: '1900',
            date_end: '2000',
            thumbnail: {
                lqip: 'thumbnail-url',
                alt_text: 'Artwork Thumbnail',
            },
            place_of_origin: 'Artist Nationality',
            dimensions: 'Dimensions Sheet',
            credit_line: 'Credit Line',
            department_title: 'Repository',
        };

        render(<ArtDetails artData={artData} />);

        const favoriteButton = screen.getByTestId('saveArtToFav');
        fireEvent.click(favoriteButton);

        //изменится ли цвет кнопки после нажатия
        const fillIcon = screen.getByTestId('fillIcon');
        expect(fillIcon).toBeInTheDocument();
        expect(fillIcon).toHaveAttribute('fill', '#F17900');

        // сохранены ли данные изображения в localStorage.
        expect(localStorage.getItem('1')).toBeTruthy();

        fireEvent.click(favoriteButton);

        // изменится ли цвет кнопки обратно на 'none' после второго щелчка.
        expect(fillIcon).toHaveAttribute('fill', 'none');

        // удалены ли данные изображения в localStorage.
        expect(localStorage.getItem('1')).toBeFalsy();
    });
});

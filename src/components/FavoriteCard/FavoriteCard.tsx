import './FavoriteCard.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Artwork from 'constants/Artwork';

export default function FavoriteCard({ data }: { data: Artwork }) {
    const [fillBookmark, setFill] = useState<string>(
        localStorage.getItem(data.id ? data.id.toString() : '')
            ? '#F17900'
            : 'none',
    );

    const changeFavorites = () => {
        if (fillBookmark === 'none') {
            setFill('#F17900');
            localStorage.setItem(
                data.id ? data.id.toString() : '',
                JSON.stringify({ ...data }),
            );
        } else {
            setFill('none');
            localStorage.removeItem(data.id ? data.id.toString() : '');
        }
    };
    return (
        <div className="favCardWrapper">
            <div className="favCardImg">
                <img
                    src={data.thumbnail ? data.thumbnail.lqip : ''}
                    alt={data.thumbnail ? data.thumbnail.alt_text : ''}
                />
            </div>
            <div className="favCardInfo">
                <NavLink className="artLink" to={`/art/${data.id}`}>
                    <h1>{data.title}</h1>
                </NavLink>
                <p>{data.artist_title}</p>
                <div>
                    <p className="artCardType">{data.artwork_type_title}</p>
                </div>
            </div>
            <div
                className="favIcon"
                onClick={() => {
                    changeFavorites();
                }}
            >
                <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill={fillBookmark}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.5444 21.5444L12.5444 17.5444L5.54445 21.5444V5.54443C5.54445 5.014 5.75516 4.50529 6.13024 4.13022C6.50531 3.75515 7.01402 3.54443 7.54445 3.54443H17.5444C18.0749 3.54443 18.5836 3.75515 18.9587 4.13022C19.3337 4.50529 19.5444 5.014 19.5444 5.54443V21.5444Z"
                        stroke="#F17900"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}

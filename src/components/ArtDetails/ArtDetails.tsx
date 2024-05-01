import { useState } from 'react';
import './ArtDetails.css';
import Artwork from 'constants/Artwork';
export default function ArtDetais({ artData }: { artData: Artwork }) {
    const [fillBookmark, setFill] = useState<string>(
        localStorage.getItem(artData.id ? artData.id.toString() : '')
            ? '#F17900'
            : 'none',
    );
    const changeFavorites = () => {
        if (fillBookmark === 'none') {
            setFill('#F17900');
            localStorage.setItem(
                artData.id ? artData.id.toString() : '',
                JSON.stringify({ ...artData }),
            );
        } else {
            setFill('none');
            localStorage.removeItem(artData.id ? artData.id.toString() : '');
        }
    };
    return (
        <div className="artDeatailsSection">
            <div className="artDetImg">
                <div
                    className="saveArtToFav"
                    data-testid="saveArtToFav"
                    onClick={() => {
                        changeFavorites();
                    }}
                >
                    <svg
                        data-testid="fillIcon"
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
                <img
                    src={artData.thumbnail ? artData.thumbnail.lqip : ''}
                    alt={artData.thumbnail ? artData.thumbnail.alt_text : ''}
                />
            </div>
            <div className="artDetInfo">
                <div>
                    <h1 className="artDetTitle">{artData.title}</h1>
                    <p className="artArtist">{artData.artist_title}</p>
                    <p className="artYears">
                        {artData.date_start}-{artData.date_end}
                    </p>
                </div>
                <div>
                    <h1 className="artOverview">Overview</h1>
                    <div className="overviewColumn">
                        <div className="overviewField">
                            <h1>Artist nationality:</h1>
                            <p>{artData.place_of_origin}</p>
                        </div>
                        <div className="overviewField">
                            <h1>Dimensions Sheet:</h1>
                            <p>{artData.dimensions}</p>
                        </div>
                        <div className="overviewField">
                            <h1>Credit Line:</h1>
                            <p>{artData.credit_line}</p>
                        </div>
                        <div className="overviewField">
                            <h1>Repository:</h1>
                            <p>{artData.department_title}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

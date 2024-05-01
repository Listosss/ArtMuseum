import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './header.css';

export default function Header() {
    const [activeMenu, setActiveMenu] = useState(false);
    const location = useLocation();
    const style = {
        display: location.pathname === '/' ? 'none' : 'block',
    };
    return (
        <div className="headerDiv">
            <div>
                <div className="headerLogo"></div>
                <div className="header_menu menu">
                    <div
                        className={`menu_icon  ${activeMenu ? '_active' : ''}`}
                        onClick={() => setActiveMenu(!activeMenu)}
                    >
                        <span></span>
                    </div>
                    <div className={`headerNav ${activeMenu ? '_active' : ''}`}>
                        <NavLink
                            className="headerLink"
                            id="headerHome"
                            style={style}
                            to={'/'}
                            onClick={() => setActiveMenu(false)}
                        >
                            <div>
                                <div className="navElem">
                                    <svg
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={style}
                                    >
                                        <path
                                            d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0304 20.7893 21.5391 20.4142 21.9142C20.0391 22.2893 19.5304 22.5 19 22.5H5C4.46957 22.5 3.96086 22.2893 3.58579 21.9142C3.21071 21.5391 3 21.0304 3 20.5V9.5Z"
                                            stroke="#E0A449"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 22.5V12.5H15V22.5"
                                            stroke="#E0A449"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <p>Home</p>
                            </div>
                        </NavLink>
                        <NavLink
                            className="headerLink"
                            id="headerFav"
                            to={'/favorites'}
                            onClick={() => setActiveMenu(false)}
                        >
                            <div>
                                <div className="navElem">
                                    <svg
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.5 21.5L12.375 17.5L5.25 21.5V5.5C5.25 4.96957 5.46448 4.46086 5.84625 4.08579C6.22802 3.71071 6.74581 3.5 7.28571 3.5H17.4643C18.0042 3.5 18.522 3.71071 18.9038 4.08579C19.2855 4.46086 19.5 4.96957 19.5 5.5V21.5Z"
                                            stroke="#E0A449"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <p>Your favorites</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

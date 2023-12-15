import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Header.css';
import '../../index.css';


const Header = () => {

    let navigate = useNavigate();


    const menuClick = () => {
        const nav = document.querySelector('.header-area .nav');
        if (nav) {
            nav.style.display = (nav.style.display === 'none' || nav.style.display === '') ? 'block' : 'none';
        }
    };

    return (
        <>
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* logo start */}
                                <a href="/" className="logo">
                                    <img src="/logo.svg" alt="쏜살" />
                                </a>
                                {/* logo end */}
                                
                                {/* menu start */}
                                <ul className="nav">
                                    <li><Link to="/for-team">Game</Link></li>
                                    <li><Link to="#features">Rank</Link></li>
                                    <li><Link to="/teams">Teams</Link></li>
                                    <li><Link to="/user/mypage">MyPage</Link></li>
                                    <li><Link to="/user/login">Login</Link></li>

                                </ul>
                                <a className='menu-trigger' onClick={menuClick}>
                                    <span>Menu</span>
                                </a>
                                {/* menu end */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>

    )
}

export default Header;

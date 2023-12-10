import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import '../../index.css';


const Header = () => {

    let navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const handleMenuClick = () => {
        setIsActive(!isActive);
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
                                    <li><a href="#gameDetail">Game</a></li>
                                    <li><a href="#features">Rank</a></li>
                                    <li><a href="#work-process">Teams</a></li>
                                    <li><a href="#testimonials">MyPage</a></li>
                                    <li><a href="#testimonials">Login</a></li>

                                </ul>
                                <a className='menu-trigger'>
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

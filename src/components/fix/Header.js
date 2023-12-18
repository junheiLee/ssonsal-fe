import { useState } from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import './index.css';


const Header = () => {

    let [login, setLogin] = useState(true);
    let [hasTeam, setHasTeam] = useState(false);

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
                                <Link to="/" className="logo">
                                    <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} alt="쏜살" />
                                </Link>
                                {/* logo end */}
                                
                                {/* menu start */}
                                <ul className="nav">
                                    <li><Link to="/games/option/all">Game</Link></li>
                                    <li><Link to="/ranks">Rank</Link></li>
                                    <li><Link to="/teams">Teams</Link></li>
                                    <li><Link to="/user/mypage">MyPage</Link></li>
                                    <li><Link to="/user/login">Login</Link></li>

                                </ul>
                                <p className='menu-trigger' onClick={menuClick}>
                                    <span>Menu</span>
                                </p>
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

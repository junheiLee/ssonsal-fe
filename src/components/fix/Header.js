import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doLogOut, getCookie } from '../../services/UserService.js';
import { logOut } from "../../store/LoginUser.js";

import './Header.css';
import './index.css';


const Header = () => {

    const loginUser = useSelector((state) => state.loginUser);
    let [login, setLogin] = useState(false);
    
    useEffect(() => {

    }, [loginUser.id])

    const menuClick = () => {
        const nav = document.querySelector('.header-area .nav');
        if (nav) {
            nav.style.display = (nav.style.display === 'none' || nav.style.display === '') ? 'block' : 'none';
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [token, setToken] = useState(getCookie("token"));

    const handleLogout = async () => {
        doLogOut(token);
        dispatch(logOut());
        navigate("/user/sign-in");

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

                                    {
                                        login
                                            ?
                                            <>
                                                <li><Link to="/user/profile">MyPage</Link></li>
                                                <li onClick={() => { setLogin(false); handleLogout(); }}><Link to="">LogOut</Link></li>
                                            </>
                                            :
                                            <>
                                                <li onClick={() => { setLogin(true);}} ><Link to="/user/sign-in">Login </Link></li>
                                                <li><Link to="/user/sign-up">SignUp</Link></li>
                                            </>

                                    }

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

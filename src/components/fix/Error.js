
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Error.css';
import './index.css';

const Error = () => {


    return (
        <div className="error">
            <div className='center-container'>
            <Link to="/">
            <div className='errorDesign'>
                <img className='img-fluid' src={process.env.PUBLIC_URL + '/assets/error.jpg'} alt='에러페이지' />
                <span className='errorMessage'>페이지를 찾을 수 없습니다.<br />누르면 홈으로 이동합니다.</span>
            </div>
            </Link>
            </div>
        </div>
    );
};

export default Error;
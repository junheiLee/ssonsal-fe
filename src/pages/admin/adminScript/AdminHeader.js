import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ position: 'relative', left: '280px', width: 'calc(100% - 280px)' }}>
      <Link to="/admin">
        <img
          className='img-fluid' 
          src={process.env.PUBLIC_URL + '/assets/header.jpg'}
          alt="Camp Nou"
          style={{ width: '100%', height: 'auto', maxHeight: '170px' }}
        />
      </Link>
    </header>
  );
};

export default Header;
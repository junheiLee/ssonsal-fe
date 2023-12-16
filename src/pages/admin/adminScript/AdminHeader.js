import React from 'react';
import StyleSheet from './StyleSheet';

const Header = () => {
  return (
    <header id="header" className="header">
      <StyleSheet />
      <div className="top-left">
        <div className="navbar-header">
          <a className="navbar-brand" href="/admin.html"><img src="/images/logo.svg" alt="Logo" /></a>
          <a className="navbar-brand hidden" href="/admin.html"><img src="/images/logo2.svg" alt="Logo" /></a>
          <a id="menuToggle" className="menutoggle"><i className="fa fa-bars"></i></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
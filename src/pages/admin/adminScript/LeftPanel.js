import React from 'react';
import { Link } from 'react-router-dom';

const LeftPanel = () => {
  return (
    <aside id="left-panel" className="left-panel">
      <nav className="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="/admin"><i className="menu-icon fa fa-laptop"></i>Admin</a>
            </li>
            <li className="menu-item-has-children dropdown">
            <Link to="/admin/AdminUser">
                 <i className="menu-icon fa fa-table"></i>유저 관리
            </Link>
             
            </li>
            <li className="menu-item-has-children dropdown">
            <Link to="/admin/AdminGame">
                 <i className="menu-icon fa fa-table"></i>게임 관리
            </Link>
         
            </li>

            <li className="menu-item-has-children dropdown">
             <Link to = "/admin/Test">
                <i className="menu-icon fa fa-table"></i>리뷰 관리
             </Link>
             
            </li>
            <li className="menu-item-has-children dropdown">
              <Link to="/admin/AdminStats">
                 <i className="menu-icon fa fa-table"></i>통계 확인
            </Link>         
            </li>

            <li className="active">
              <a href="/admin"><i className="menu-icon fa fa-laptop"></i>Home</a>
            </li>
            <li className="menu-item-has-children dropdown">
              <Link to="/">
                 <i className="menu-icon fa fa-table"></i>메인 페이지 이동
            </Link>         
            </li>

            <li className="menu-item-has-children dropdown">
              <Link to="/">
                 <i className="menu-icon fa fa-table"></i>로그 아웃
            </Link>         
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default LeftPanel;
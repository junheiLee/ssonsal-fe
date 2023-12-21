import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../../services/UserService";
import { logOut } from "../../../store/LoginUser";
import { useDispatch } from "react-redux";


const LeftPanel = () => {

  let isNewToken = false;
  let token = getCookie("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setIsNewToken = (zebal) => {
    isNewToken = zebal;
  };
  const setToken = (newToken) => {
    token = newToken;
  };


  const handleLogout = async () => {
    try {
      // 로그아웃 요청
      setIsNewToken(false);
      console.log(
        "로그아웃 성공 access 재발급 안함 isNewwToken={}, token={}",
        isNewToken,
        token
      );
      const logoutResponse = await axios.post("/api/user/logout", null, {
        headers: {
          ssonToken: token,
        },
      });

      dispatch(logOut());
      // 쿠키 삭제
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log("accessToken 통과");
      // 홈 페이지로 리다이렉트
      navigate("/user/sign-in");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsNewToken(true);
        try {
          // 토큰이 만료되었으면 새로운 토큰을 요청
          const refreshResponse = await axios.post(
            "/api/user/refresh-token",
            null,
            {
              headers: {
                ssonToken: token,
              },
            }
          );

          // 새로 발급받은 토큰을 상태에 업데이트
          const newToken = refreshResponse.data.data;
          setToken(newToken);
          console.log(
            "재발급 한 상태 isNewToken=, newToken=",
            isNewToken,
            token
          );
          if (isNewToken) {
            await handleLogout();
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error logging out:", error);
      }
    }
  };



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
             <Link to = "/admin/report">
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
              <Link to="/user/logout">
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
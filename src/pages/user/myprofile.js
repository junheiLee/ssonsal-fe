import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../services/UserService";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/user/mypage.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/LoginUser";
import Email from "../admin/EmailSubscriptionButton.js";
import EmailCancle from "../admin/EmailUnsubscribeButton.js";


const UserComponent = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user/profile/" + userId, {
        headers: {
          ssonToken: token,
        },
      });
      console.log(response);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
      // navigate('/*', { replace: true });
    } finally {
      setLoading(false);
    }
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

  const handleTeamRequest = async () => {
    try {
      if (userData && userData.data && userData.data.teamId) {
        const response = await axios.get(`/teams/${userData.data.teamId}`, {
          headers: {
            ssonToken: token,
          },
        });

        console.log("Team Data:", response.data);
      } else {
        console.error("User data or team ID not available");
      }
    } catch (error) {
      // 토큰이 만료되었을 때 서버에서 반환한 에러를 처리
      if (error.response && error.response.status === 400) {
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
          setToken(refreshResponse.data.data);

          // 로그아웃 요청 다시 보내기
          await handleLogout();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error fetching team data:", error);
      }
    }
  };

  if (loading) {
    return <div style={{ height: "920px" }}></div>;
  }

  return (
    <div style={{ marginBottom: "100px" }}>
      <Container className="mt-5">
        <Row className="user-intro">
          <Col xs={6} lg={3} className="user-profile">
            <img
              className="img-fluid"
              src={
                "https://clclt-s3-1.s3.ap-northeast-2.amazonaws.com/defaultLogo.PNG"
              }
              alt="유저프로필"
            />
            <span className="userTeamName">{userData.teamName}</span>
          </Col>
          <Col>
            <p className="user-name">
              {userData.nickname}{" "}
              <span style={{ marginLeft: "10px", fontSize: "14px" }}>
                {userData.name}
              </span>
            </p>
            <p className="user-comment">{userData.intro}</p>
          </Col>

          <Col lg={2} className="userbtn" style={{ height: "50px" }}>
            <Row className="userbbtnn" style={{ height: "50px" }}>

              {userId == userData.id && (
                <Col lg={12} xs={6}>
                  <button onClick={handleLogout}>로그아웃</button>
                </Col>
              )}
              {userData.teamId !== 0 && (
                <Col lg={12} xs={6}>
                  <Link to={`/teams/${userData.teamId}`}>팀페이지 가기</Link>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 userss">
        <h1>기타 정보</h1>
        <Row className="mb-5">
          <div style={{ display: 'flex', flexDirection: 'row' }}>

            <Col xs={6} lg={4} className="userinfo_detail" style={{ marginRight: '10px' }}>
              <p style={{ fontSize: "25px" }}>{userData.email}</p>
              <p>이메일</p>
            </Col>
            <Col xs={6} lg={4}>
              <div>
                {userData.role === 0 && <Email />}
                {(userData.role === 2 || userData.role === 1) && <EmailCancle />}
              </div>
            </Col>

          </div>
          <Col xs={6} lg={4} className="userinfo_detail">
            <p>{userData.gender}</p>
            <p>성별</p>
          </Col>
          <Col xs={6} lg={4} className="userinfo_detail">
            <p>{userData.age}</p>
            <p>나이</p>
          </Col>
          <Col xs={6} lg={4} className="userinfo_detail">
            <p style={{ fontSize: "25px" }}>{userData.phone}</p>
            <p>전화번호</p>
          </Col>
          <Col xs={6} lg={4} className="userinfo_detail">
            <p>
              {userData.skillScore === -1 ? "기록없음" : userData.skillScore}
            </p>
            <p>실력점수</p>
          </Col>
          <Col xs={6} lg={4} className="userinfo_detail">
            <p>
              {userData.mannerScore === -1 ? "기록없음" : userData.mannerScore}
            </p>
            <p>매너점수</p>
          </Col>
          <Col xs={4} lg={4} className="userinfo_detail">
            <p>{userData.preferredTime}</p>
            <p>선호시간</p>
          </Col>
          <Col xs={4} lg={4} className="userinfo_detail">
            <p>{userData.preferredArea}</p>
            <p>선호지역</p>
          </Col>
          <Col xs={4} lg={4} className="userinfo_detail">
            <p>{userData.position}</p>
            <p>포지션</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserComponent;

import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/team/index.css';
import '../../styles/team/Detail.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Detail = () => {

  let loginUser = useSelector((state) =>{return state.loginUser});

  const navigate = useNavigate();
  let { id } = useParams();
  const [detail, setDetail] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const response = await axios.get('/api/teams/' + id);
      setUserLevel(response.data.data.userLevel);
      setDetail(response.data.data.detail);
      setMembers(response.data.data.members);
    } catch (error) {
      console.log(error);
      navigate('/*', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  const applyTeam = async (teamId) => {

    if (!window.confirm('해당 팀에 가입 신청을 하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.post(`/api/members/${teamId}/application`);
      alert(response.data.data.teamName + " 팀에 신청 되었습니다.");
      getDetail();
    } catch (error) {
      errorResponse(error);
    }
  };

  const cancelTeamApply = async (teamId) => {

    if (!window.confirm('해당 팀에 가입 신청을 취소하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/members/${teamId}/application`);
      alert("신청이 취소되었습니다.");
      getDetail();
    } catch (error) {
      errorResponse(error);
    }
  };

  const leaveTeam = async (teamId) => {

    if (!window.confirm('해당 팀을 탈퇴하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/members/${teamId}/team`);
      alert(response.data.data.teamName + " 팀을 탈퇴하였습니다.");
      getDetail();
    } catch (error) {
      errorResponse(error);
    }
  };

  const errorResponse = (error) => {

    if (error.response.data.httpStatus === 401) {
      alert(error.response.data.message);
      navigate('/user/login', { replace: true });
    } else if (error.response.data.httpStatus === 403 || error.response.data.httpStatus === 409
      || error.response.data.httpStatus === 404 || error.response.data.httpStatus === 400) {
      alert(error.response.data.message);
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate('/*', { replace: true });
    }
  };

  if (loading) {
    return <div style={{ height: '920px' }}></div>;
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="teamintro">
          <Col xs={6} lg={3} className="teamlogo">
            <img className="img-fluid" src={detail.logoUrl} alt="팀로고" />
          </Col>
          <Col xs={6} lg={7}>
            <p className="teamname">{detail.name} <span style={{ marginLeft: '10px', fontSize: '14px' }}>{detail.leaderName}</span></p>
            <p className="teamcomment">{detail.intro}</p>
          </Col>
          <Col lg={2} className="teambtn" style={{ height: '50px' }}>
            <Row className="teambbtnn" style={{ height: '50px' }}>
              {userLevel === '팀장' && (<Col lg={12} className="col-4 col-lg-12">
                <Link to={`/teams/${detail.id}/managers`} disabled={userLevel !== '팀장'}>
                  팀 관리 하기
                </Link>
              </Col>
              )}
              <Col lg={12} className="col-4 col-lg-12">
                <Link to="#">출전 경기 보기</Link>
              </Col>
              <Col lg={12} className="col-4 col-lg-12">
                <Link to="#">팀 리뷰 보기</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 teamss">
        <h1>기타 정보</h1>
        <Row className="mb-5">
          <Col xs={6} lg={4} className="teaminfo_detail">
            <p>{detail.ranking === -1 ? '기록없음' : detail.ranking}</p>
            <p>랭킹</p>
          </Col>
          <Col xs={6} lg={4} className="teaminfo_detail">
            <p>{detail.skillScore === -1 ? '기록없음' : detail.skillScore}</p>
            <p>실력점수</p>
          </Col>
          <Col xs={6} lg={4} className="teaminfo_detail">
            <p>{detail.mannerScore === -1 ? '기록없음' : detail.mannerScore}</p>
            <p>매너점수</p>
          </Col>
          <Col xs={6} lg={4} className="teaminfo_detail">
            <p>{detail.memberCount}</p>
            <p>팀원수</p>
          </Col>
          <Col xs={6} lg={4} className="teaminfo_detail">
            <p>{detail.preferredArea}</p>
            <p>선호지역</p>
          </Col>
          <Col xs={6} lg={4} className="teaminfo_detail">
            <p>{detail.preferredTime}</p>
            <p>선호시간</p>
          </Col>
          <Col xs={4} lg={4} className="teaminfo_detail">
            <p>{detail.winCount}</p>
            <p>승</p>
          </Col>
          <Col xs={4} lg={4} className="teaminfo_detail">
            <p>{detail.drawCount}</p>
            <p>무</p>
          </Col>
          <Col xs={4} lg={4} className="teaminfo_detail">
            <p>{detail.loseCount}</p>
            <p>패</p>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 listexplan">
        <p></p><span className='listlistmember'>팀원 목록</span>
        {userLevel === '유저' && (
          <Button onClick={() => applyTeam(id)} className="joinbtn">
            팀 신청 하기
          </Button>
        )}

        {userLevel === '신청자' && (
          <Button onClick={() => cancelTeamApply(id)} className="joinbtn">
            가입 신청 취소
          </Button>
        )}

        {userLevel === '팀원' && (
          <Button onClick={() => leaveTeam(id)} className="joinbtn">
            팀 탈퇴 하기
          </Button>
        )}

        {userLevel === '다른팀 신청자' && (
          <span className="joinbtn" style={{ height: '100%', display: 'inline-block' }}>
            신청중인 팀 있음
          </span>
        )}

        {userLevel === '게스트' && (
          <Link to="/login" className="joinbtn">
            팀 신청 하기
          </Link>
        )}
      </Container>

      <div style={{ clear: 'both' }}></div>

      <Container className="mt-3 mb-5">
        <Row className="memberlist">
          <Col lg={6}>
            <div className="detailmembers"><p></p>
              <div id="mlisthead"><span style={{ width: '40%' }}>닉네임</span><span>나이</span><span>성별</span><span>공격수</span>
              </div>
            </div>
            <div className="leaderbtn"></div>
          </Col>
          <Row id='mlists'>
            {members.map((member, i) => (
              <Col lg={6} key={i}>
                <div className="detailmembers">
                  <p>{i + 1}</p>
                  <Link to={`/users/${member.id}`}>
                    <span style={{ width: '40%' }}>{member.nickname}</span>
                    <span>{member.age}</span>
                    <span>{member.gender}</span>
                    <span>{member.position}</span>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Row>
      </Container>


    </>
  );
};

export default Detail;
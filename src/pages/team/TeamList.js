import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/List.css';
import './css/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const List = () => {

  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam();
  }, []);

  const getTeam = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data.data.teams);
      setUserLevel(response.data.data.userLevel);
    } catch (error) {
      console.log(error);
      navigate('/*', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/teams/search?keyword=${keyword}`);
      setTeams(response.data.data.teams);
      setUserLevel(response.data.data.userLevel);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const recruitTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/teams/recruit');
      setTeams(response.data.data.teams);
      setUserLevel(response.data.data.userLevel);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return <div style={{ height: '920px' }}></div>;
  }

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col xs={12} lg={6}>
              <form action="#" method="get" className="mt-5 input-group" onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
                <InputGroup>
                  <FormControl type="search" placeholder="팀명을 입력하세요" aria-label="Search"
                    name="keyword" className="form-control rounded Sbar" aria-describedby="search-addon"
                    value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                  <Button type="button" className="btn searchbtn" id='btngreen' onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} className="fs-4" />
                  </Button>
                </InputGroup>
              </form>
            </Col>
            <Col xs={12} lg={6}></Col>
          </Row>
        </Container>

        <Container className="mt-2">
          <p className="gobtn" onClick={getTeam}>모든 팀 보기</p>
          <p className="gobtn" onClick={recruitTeam}>팀원 모집 중</p>
          {userLevel === '신청자' && <span className="applyexists">가입 신청중</span>}
          {userLevel === '유저' && <Link to="/teams/form" className="createTeam">팀 생성하기</Link>}
          {userLevel === '게스트' && <Link to="/login" className="createTeam">팀 생성하기</Link>}
        </Container>

        <Container className=" mt-5">
          <div className="listsheader">
            <p><img src={process.env.PUBLIC_URL + './ball.png'} alt='축구공' /></p>
            <p>
              <span>팀명</span>
              <span>팀 연령대</span>
              <span>실력점수</span>
              <span>선호지역</span>
              <span style={{ width: '12%' }}>랭킹</span>
            </p>
          </div>
        </Container>

        {teams.length === 0 && (
          <Container className='noTeamMessage'>
            <h4>팀 정보가 없습니다.</h4>
          </Container>
        )}


        <Container className="mt-5">

          <ul className="teamlist">
            {teams.map((team) => (
              <li className="lists" key={team.id}>
                <p></p>
                <p style={{ width: '25px' }}></p>
                <Link to={`/teams/${team.id}`}>
                  <span>{team.name}</span>
                  <span>{team.ageAverage}</span>
                  <span>{team.skillScore === -1 ? '기록없음' : team.skillScore}</span>
                  <span>{team.preferredArea}</span>
                  <span style={{ width: '12%' }}>{team.ranking === -1 ? 'X' : team.ranking}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
        <div style={{ clear: 'both' }}></div>
      </div>
    </>
  );
};

export default List;
import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/rank/Rank.css';
import '../../styles/team/index.css';

const Rank = () => {

  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRank();
  }, []);

  const getRank = async () => {
    try {
      const response = await axios.get('/api/ranks');
        setTeams(response.data.data);
    } catch (error) {
      console.log(error);
      navigate('/*', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div style={{ height: '920px' }}></div>;
  }

  return (
    <>
      <div>


        <Container className=" mt-5">
          <div className="listsheader-rank">
            <p><img src={process.env.PUBLIC_URL + '/assets/crown.png'} alt='왕관' /></p>
            <p>
              <span style={{width:'40%'}}>팀명</span>
              <span style={{width:'20%'}}>총 경기 수</span>
              <span>승</span>
              <span>무</span>
              <span>패</span>
              <span>승점</span>
            </p>
          </div>
        </Container>

        {teams.length === 0 && (
          <Container className='noTeamMessage'>
            <h4>랭킹 정보가 없습니다.</h4>
          </Container>
        )}


        <Container className="mt-5">

          <ul className="teamlist-rank">
            {teams.map((team,i) => (
              <li className="lists-rank" key={team.id}>
                <p className='teamRank'>{i+1}</p>
                <p style={{ width: '25px' }}></p>
                <Link to={`/teams/${team.id}`}>
                  <span className={`teamName ${team.name.length < 5 ? 'shortTeamName' : team.name.length < 10 ? 'mediumTeamName' : 'longTeamName'}`} style={{width:'40%',height:'100%'}}><img className='teamLogo' src={team.logoUrl} />{team.name}</span>
                  <span style={{width:'20%'}}>{team.totalGameCount}</span>
                  <span>{team.winCount}</span>
                  <span>{team.drawCount}</span>
                  <span>{team.loseCount}</span>
                  <span>{team.point}</span>
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

export default Rank;
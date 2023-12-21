import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/rank/Rank.css';
import '../../styles/team/index.css';
import { getCookie } from '../../services/UserService';

const Rank = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
const [selectedMonth, setSelectedMonth] = useState('');
  

useEffect(() => {
  fetchData();
}, [selectedMonth]);


  const fetchData = async () => {
    try {

      if (selectedMonth) {

        console.log("하이::"+selectedMonth);
        const response = await axios.post('/api/ranks/changeMonth',
        selectedMonth,
          {
            headers: {
              'Content-Type': 'application/json',
              ssonToken: getCookie('token'),
            },
          }
        );
        console.log("하이a");
        setTeams(response.data.data);
        console.log(response.data.data);
      } else {

        const response = await axios.get('/api/ranks/list', {
          headers: {
            'Content-Type': 'application/json',
            ssonToken: getCookie('token'),
          },
        });
        setTeams(response.data.data);
      }
    } catch (error) {
      console.log(error);
      navigate('/*', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    console.log("하이 달력은"+month);
  };

  if (loading) {
    return <div style={{ height: '920px' }}></div>;
  }

  return (
    <div style={{ marginBottom: '100px' }}>
      <Container className=" mt-5">
        <div>
          <div>
          <label style={{ fontSize: '20px', marginBottom: '5px' }}>달 선택</label>
          <select
  style={{ fontSize: '15px', height: '42px', width: '100%', textAlign: 'center' }}
  onChange={handleMonthChange}
  value={selectedMonth}  
>
              <option value="">현재 달</option>
              <option value="1">1월</option>
              <option value="2">2월</option>
              <option value="3">3월</option>
              <option value="4">4월</option>
              <option value="5">5월</option>
              <option value="6">6월</option>
              <option value="7">7월</option>
              <option value="8">8월</option>
              <option value="9">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </select>
          </div>
        </div>
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

  );
};

export default Rank;
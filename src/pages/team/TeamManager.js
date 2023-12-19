import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/team/index.css';
import '../../styles/team/Manage.css';
import { getCookie } from '../../services/UserService';

import { useParams } from 'react-router-dom';

const Manager = () => {

  const navigate = useNavigate();

  let { id } = useParams();
  const [members, setMembers] = useState([]);
  const [applies, setApplies] = useState([]);
  const [rejects, setRejects] = useState([]);
  const [leader, setLeader] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManage();
  }, []);

  const getManage = async () => {
    try {
      const response = await axios.get('/api/teams/' + id + "/managers", {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      setLeader(response.data.data.teamLeader);
      setApplies(response.data.data.applies);
      setRejects(response.data.data.rejects);
      setMembers(response.data.data.members);
    } catch (error) {
      // navigate('/*', { replace: true });
    } finally {
      setLoading(false);

    }
  }

  const delegateLeader = async (teamId, memberId) => {

    if (!window.confirm('해당 멤버에게 팀장을 위임하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.patch(`/api/members/${teamId}/manager/${memberId}`, null, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      alert(response.data.data.userName + " 님에게 팀장을 위임하였습니다.");
      navigate('/teams/' + id, { replace: true });
    } catch (error) {
      errorResponse(error);
    }
  };

  const banUser = async (teamId, memberId) => {

    if (!window.confirm('해당 멤버를 추방하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.post(`/api/members/${teamId}/manager/${memberId}`, null, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      alert(response.data.data.userName + " 님을 추방하였습니다.");
      getManage();
    } catch (error) {
      errorResponse(error);
    }
  };

  const acceptUser = async (teamId, applyId) => {

    if (!window.confirm('해당 유저의 가입 신청을 승인하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.post(`/api/members/${teamId}/application/${applyId}`, null, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      alert(response.data.data.userName + " 님을 가입 승인하였습니다.");
      getManage();
    } catch (error) {
      errorResponse(error);
    }
  };

  const rejectUser = async (teamId, applyId) => {

    if (!window.confirm('해당 유저의 가입 신청을 거절하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/members/${teamId}/application/${applyId}`, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      alert(response.data.data.userName + " 님이 가입 거절되었습니다.");
      getManage();
    } catch (error) {
      errorResponse(error);
    }
  };

  const cancelReject = async (teamId, rejectId) => {

    if (!window.confirm('해당 유저의 밴을 취소하시겠습니까?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/members/${teamId}/manager/${rejectId}`, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      alert(response.data.data.userName + " 님의 밴이 해제되었습니다.");
      getManage();
    } catch (error) {
      errorResponse(error);
    }
  };

  const errorResponse = (error) => {

    if (error.response.data.httpStatus === 403 || error.response.data.httpStatus === 409
      || error.response.data.httpStatus === 404 || error.response.data.httpStatus === 400) {
      alert(error.response.data.message);
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      console.log(error);
      // navigate('/*', { replace: true });
    }
  };

  if (loading) {
    return <div style={{ height: '920px' }}></div>;
  }

  return (
    <div style={{marginBottom:'100px'}}>
      <Container className="mt-5 listexplanManager">
        <p></p>
        <span>팀원 목록</span>
        <Link to={`/teams/${id}/edit`} className="editBtn">
          정보 수정 하기
        </Link>
      </Container>
      <div style={{ clear: 'both' }}></div>

      <Container className="mt-3 mb-5">
        <Row className="memberlist">
          <Col lg={6}>
            <div className="members">
              <p></p>
              <div className="mlisthead">
                <span style={{ width: '40%' }}>닉네임</span>
                <span>나이</span>
                <span>성별</span>
                <span>포지션</span>
              </div>
            </div>
            <div className="leaderbtn"></div>
          </Col>

          {members.map((member, index) => (
            <Col lg={6} key={member.id}>
              <div className="members">
                <p>{index + 1}</p>
                <Link to={`/user/${member.id}`}>
                  <span style={{ width: '40%' }}>{member.nickname}</span>
                  <span>{member.age}</span>
                  <span>{member.gender}</span>
                  <span>{member.position}</span>
                </Link>
              </div>
              <div className="leaderbtn">
                {member.nickname !== leader && (
                  <>
                    <Button onClick={() => delegateLeader(id, member.id)}>위임</Button>
                    <Button onClick={() => banUser(id, member.id)}>추방</Button>
                  </>
                )}

              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 팀 신청 목록 */}
      <Container className="mt-5 listexplanManager">
        <p></p>
        <span>팀 신청 목록</span>
      </Container>

      <div style={{ clear: 'both' }}></div>

      <Container className="mt-3">
        <Row className="memberlist">
          <Col lg={6}>
            <div className="members">
              <p></p>
              <div className="mlisthead">
                <span style={{ width: '40%' }}>닉네임</span>
                <span>나이</span>
                <span>성별</span>
                <span>포지션</span>
              </div>
            </div>
            <div className="leaderbtn"></div>
          </Col>

          {applies.map((apply, index) => (
            <Col lg={6} key={apply.id}>
              <div className="members">
                <p>{index + 1}</p>
                <Link to={`/user/${apply.id}`}>
                  <span style={{ width: '40%' }}>{apply.nickname}</span>
                  <span>{apply.age}</span>
                  <span>{apply.gender}</span>
                  <span>{apply.position}</span>
                </Link>
              </div>
              <div className="leaderbtn">
                <Button onClick={() => acceptUser(id, apply.id)}>승인</Button>
                <Button onClick={() => rejectUser(id, apply.id)}>거절</Button>
              </div>

            </Col>
          ))}

        </Row>
      </Container>

      {/* 팀 밴/거절 목록 */}
      <Container className="mt-5 listexplanManager">
        <p></p>
        <span>팀 밴/거절 목록</span>
      </Container>

      <div style={{ clear: 'both' }}></div>

      <Container className="mt-3">
        <Row className="memberlist">
          <Col lg={6}>
            <div className="members">
              <p></p>
              <div className="mlisthead">
                <span style={{ width: '40%' }}>닉네임</span>
                <span>나이</span>
                <span>성별</span>
                <span>포지션</span>
              </div>
            </div>
            <div className="leaderbtn"></div>
          </Col>

          {rejects.map((reject, index) => (
            <Col lg={6} key={reject.id}>
              <div className="members">
                <p>{index + 1}</p>
                <Link to={`/user/${reject.id}`}>
                  <span style={{ width: '40%' }}>{reject.nickname}</span>
                  <span>{reject.age}</span>
                  <span>{reject.gender}</span>
                  <span>{reject.position}</span>
                </Link>
              </div>
              <div className="leaderbtn">
                <Button onClick={() => cancelReject(id, reject.id)}>밴 해제하기</Button>
              </div>

            </Col>
          ))}

        </Row>
      </Container>
    </div>
  );
};

export default Manager;
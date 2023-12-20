import { ListGroup, Accordion, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { acceptAwayTeam, rejectTeam } from '../../services/game/MatchTeamService';


function MatchApplicationListElement({ matchApplication, gameId, homeId }) {
  const navigate = useNavigate();
  const currentUserTeamId = useSelector(state => state.loginUser.teamId);

  const value = { matchApplicationId: matchApplication.id }

  const fetchAcceptTeam = async (e) => {
    e.preventDefault();

    try {
      await acceptAwayTeam(value);
      navigate(`/games/all/${gameId}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const fetchRejectTeam = async (e) => {
    e.preventDefault();

    try {
      const rejectedId = await rejectTeam(gameId, matchApplication.id);
      alert("거절 되었습니다.");
      navigate(`/games/all/${gameId}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  }


  return (
    <>
      <ListGroup.Item as="li">
        <Accordion className="accordion" defaultActiveKey={[]}>
          <div className="ms-2 me-auto" onClick={() => { navigate(`/teams/${matchApplication.teamId}`) }}>
            <div className="fw-bold" style={{ fontSize: "17px", textAlign: "left" }}>
              {matchApplication.name + "   "}
              <span style={{ fontSize: "12px" }} >{"유니폼: " + matchApplication.uniform}</span>
              {
                currentUserTeamId == homeId
                &&
                <div style={{ textAlign: "right" }}>
                  <Badge bg="secondary" style={{ marginRight: "4px" }}
                    onClick={(e) => fetchAcceptTeam(e)}
                  >
                    승인
                  </Badge>

                  <Badge bg="secondary"
                    onClick={(e) => fetchRejectTeam(e)}
                  >
                    거절
                  </Badge>

                </div>
              }
            </div>
          </div>
          {
            matchApplication.subCount == 0
              ? null
              :
              <div>
                <Accordion.Item style={{ marginTop: "2px" }} eventKey="0">

                  <Accordion.Header > <span style={{ fontSize: "12px" }}>{
                    "용병 목록 (" + "/" + (matchApplication.subCount) + ")"}
                  </span></Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>

                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">

                  <Accordion.Header  ><span style={{ fontSize: "12px" }}>{
                    "용병 신청 목록 (" + (matchApplication.subCount) + ")"}
                  </span></Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>

                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
          }
        </Accordion>

      </ListGroup.Item>

    </>
  );
}

export default MatchApplicationListElement
  ;
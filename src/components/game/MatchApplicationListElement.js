import { ListGroup, Accordion, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptAwayTeam, rejectTeam } from '../../services/game/MatchTeamService';
import { getSubs, getSubApplicants, closeSubRecruitment } from '../../services/game/SubService';



function MatchApplicationListElement({ matchApplication, homeId }) {
  const navigate = useNavigate();
  const currentUserTeamId = useSelector(state => state.loginUser.teamId);
  let { gameId } = useParams();


  const value = { matchApplicationId: matchApplication.id }

  const fetchAcceptTeam = async (e) => {
    e.preventDefault();

    try {
      await acceptAwayTeam(value);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const fetchRejectTeam = async (e) => {
    e.preventDefault();

    try {
      const rejectedId = await rejectTeam(gameId, matchApplication.id);
      alert("거절 되었습니다.");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const fetchClose = async (e) => {

    try {
      await closeSubRecruitment(matchApplication.id);
      alert("마감");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  }


  const fetchSubs = async () => {
    try {
      setSubs(await getSubs(matchApplication.id));
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSubApplicants = async () => {
    try {
      setSubApplicants(await getSubApplicants(matchApplication.id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSubs();
    fetchSubApplicants();
    return () => {

    }
  }, [])

  let [subs, setSubs] = useState([]);
  let [subApplicants, setSubApplicants] = useState([]);


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
                    {/* //status={"approval"} */}
                  </span></Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      {/* //matchApplication.teamId */}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">

                  <Accordion.Header  ><span style={{ fontSize: "12px" }}>{
                    "용병 신청 목록 (" + (matchApplication.subCount) + ")"}
                    {currentUserTeamId == matchApplication.teamId
                      ?
                      <Badge style={{ textAlign: "right" }}
                        onClick={(e) => { fetchClose(e) }}>마감</Badge>
                      :
                      currentUserTeamId != homeId && <Badge style={{ textAlign: "right" }}>신청</Badge>
                    }
                    {/* permmision={teamInfo.teamId == "로그인 팀 유저"} */}
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
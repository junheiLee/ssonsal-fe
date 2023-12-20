import { useEffect, useState } from 'react';
import { Form, Button, Collapse, Accordion, ListGroup } from 'react-bootstrap';
import MatchTeamInfoForm from './MatchTeamInfoForm';
import { applyToGameAsAway, readMatchApplications } from '../../services/game/MatchTeamService';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MatchApplicationListElement from './MatchApplicationListElement';


function FindAway({ gameId, homeId }) {
  const [open, setOpen] = useState(false);
  const { option } = useParams();
  const currentUserTeamId = useSelector(state => state.loginUser.teamId);
  const navigate = useNavigate();

  const featchApplication = async () => {
    try {
      setCurrentApplications(await readMatchApplications(gameId));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    featchApplication();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();

    const target = document.querySelector("#application");
    target.addEventListener("submit", onSubmit);

    const matchApplication = handleFormData();

    try {
      await applyToGameAsAway(gameId, matchApplication);
      navigate(0);
    } catch (error) {
      console.error("findAway 오류: ", error)
    }
    console.log("onSubmit 함수=", `/games/${option}/${gameId}`)
    navigate(`/games/${option}/${gameId}`);

  }

  let [currentApplications, setCurrentApplications] = useState([]);

  const handleFormData = () => {
    const matchApplicationForm = new FormData(document.getElementById('application'));

    var matchApplication = {};
    matchApplicationForm.forEach((value, key) => {
      matchApplication[key] = value;
    });

    return matchApplication;

  }

  return (
    <div style={{ marginTop: "20px" }}>
      {
        currentUserTeamId != homeId
        &&
        <Button
          onClick={() => setOpen(!open)} variant="success" aria-controls="applicationForm" aria-expanded={open}
        >
          신청 양식
        </Button>
      }

      <Collapse in={open}>
        <div id="applicationForm">
          <Form as="form" id="application">
            <MatchTeamInfoForm />
            <div style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="button"
                onClick={(e) => { onSubmit(e) }}>제출</Button>{' '}
            </div>
          </Form>
        </div>
      </Collapse>
      <div style={{ marginTop: "30px" }}>
        <Accordion className="accordion" defaultActiveKey={['0']}>
          <Accordion.Item eventKey="0">
            <Accordion.Header >신청 팀 목록</Accordion.Header>

            <Accordion.Body>
              <ListGroup as="ol">
                {
                  currentApplications.length !== 0
                    ?
                    currentApplications.map(application => (
                      <MatchApplicationListElement matchApplication={application} key={application.teamId} gameId={gameId} homeId={homeId} />
                    ))
                    : null
                }
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div >
  );
}

export default FindAway;
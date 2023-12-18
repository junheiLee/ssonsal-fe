import { useState } from 'react';
import { Form, Button, Collapse, Accordion, ListGroup } from 'react-bootstrap';
import MatchTeamInfoForm from './MatchTeamInfoForm';

function FindAway() {
  const [open, setOpen] = useState(false);
  const teamId = 1;
  return (
    <>
      {
        teamId != 0
        &&
        <Button
          onClick={() => setOpen(!open)}
          variant="success"
          aria-controls="applicationForm"
          aria-expanded={open}
        >
          신청 양식
        </Button>
      }

      <Collapse in={open}>
        <div id="applicationForm">
          <Form>
            <MatchTeamInfoForm />
            <div style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">제출</Button>{' '}
            </div>
          </Form>
        </div>
      </Collapse>
      <div style={{ marginTop: "30px" }}>
        <Accordion className="accordion" defaultActiveKey={['0']}>
          <Accordion.Item eventKey="0">
            <Accordion.Header >신청 팀 목록</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {/* {
                subs.length !== 0
                  ?
                  subs.map(sub => (
                    <SubListElement status={"approval"} sub={sub} key={subs.userId} />
                  ))
                  : null
              } */}

              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default FindAway;
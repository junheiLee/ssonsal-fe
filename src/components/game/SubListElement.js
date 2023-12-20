import { ListGroup, Container, Row, Col, Button } from 'react-bootstrap';
import { rejectSub, acceptSub } from '../../services/game/SubService';
import { useNavigate } from 'react-router';


function SubListElement({ status, permmision, sub, matchTeamId  }) {

    const value = { subApplicantId: sub.applicantId }
    const navigate = useNavigate();

    const fetchRejectSub = async (e) => {

        try {
            await rejectSub(matchTeamId, sub.applicantId);
            alert("거절");
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const fetchAcceptSub = async (e) => {

        try {
            await acceptSub(matchTeamId, value);
            alert("승인");
            window.location.reload();

        } catch (error) {
            alert(error.response.data.message);
        }
    }


    return (

        <ListGroup.Item >
            <Container>
                <Row>
                    <Col style={{ textAlign: "left" }}
                        onClick={() => navigate(`/user/profile/${sub.userId}`)}>
                            
                        <span>{sub.nickName}</span>

                    </Col>
                    {
                        status == "waiting" && permmision
                        &&
                        <Col md="auto">
                            <Button size="sm" variant="success"
                                onClick={(e) => { fetchAcceptSub(e) }}  >
                                승인
                            </Button>{' '}
                            <Button size="sm" variant="success"
                                onClick={(e) => { fetchRejectSub(e) }}>
                                거절</Button>{' '}
                        </Col>
                    }
                </Row>
            </Container>

        </ListGroup.Item>

    );
}

export default SubListElement;
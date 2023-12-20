import { ListGroup, Container, Row, Col, Button } from 'react-bootstrap';

function SubListElement({ status, permmision, sub }) {
    console.log(permmision);
    return (

        <ListGroup.Item >
            <Container>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <span>{sub.nickName}</span>
                    </Col>
                    {
                        status == "waiting" && permmision
                        &&
                        <Col md="auto">
                            <Button size="sm" variant="success"
                           onClick={() => {}}  >
                                승인</Button>{' '}
                            <Button size="sm" variant="success" onClick={() => {}}>거절</Button>{' '}
                        </Col>
                    }
                </Row>
            </Container>

        </ListGroup.Item>

    );
}

export default SubListElement;
import { useState } from 'react';
import { ListGroup, Badge, Container, Row, Col, Button } from 'react-bootstrap';

function SubListElement({ status, permmision, sub }) {

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
                            //onClick={ () => } - sub.applicantId 이걸로 승인
                            >
                                승인</Button>{' '}
                            <Button size="sm" variant="success">거절</Button>{' '}
                        </Col>
                    }
                </Row>
            </Container>

        </ListGroup.Item>

    );
}

export default SubListElement;
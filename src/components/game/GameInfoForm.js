import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// validate 해야댐,,
const GameInfoForm = () => {

    var now_utc = Date.now();
    var timeOff = new Date().getTimezoneOffset() * 60000; 
    var today = new Date(now_utc - timeOff).toISOString().substring(0, 16);
    
    return (
        <div >
            <Row style={{ textAlign: "left" }} className="mb-5">
                <Form.Group as={Col} style={{ width: "70%", minWidth: "260px" }}>
                    <Form.Label>경기 날짜 및 시각</Form.Label>
                    <Form.Control as='input' name="datetime" min={today} max="2025-01-01" type="datetime-local" required />
                </Form.Group>
                <Form.Group as={Col} style={{ width: "30%" }}>
                    <Form.Label >시간</Form.Label>
                    <Form.Select name="gameTime" style={{ width: "100px" }}>

                        <option></option>
                        <option>1</option>
                        <option>2</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row style={{ textAlign: "left" }} className="mb-5">
                <Form.Group as={Col} style={{ width: "30%", minWidth: "150px" }}>
                    <Form.Label>지역</Form.Label>
                    <Form.Control as='input' name="region" type="text" placeholder="경기 고양시" required />

                </Form.Group>
                <Form.Group as={Col} style={{ width: "50%", minWidth: "150px" }}>
                    <Form.Label>구장명</Form.Label>
                    <Form.Control as='input' name="stadium" type="text" placeholder="구장을 예약하지 않았습니다." defaultValue={"구장을 예약하지 않았습니다."} />
                </Form.Group>

                <Col style={{ width: "20%" }}>
                </Col>
            </Row>
            <Row style={{ textAlign: "left" }} className="mb-5">
                <Form.Group as={Col} style={{ width: "25%", minWidth: "100px" }}>
                    <Form.Label>비용</Form.Label>
                    <Form.Control as='input' name="account" type="number" min="0" max="999999" placeholder="10000" required />
                </Form.Group>
                <Form.Group as={Col} style={{ width: "25%", minWidth: "100px" }}>
                    <Form.Label>인원제</Form.Label>
                    <Form.Control as='input' name="vsFormat" type='number' min="1" max="20" placeholder="11" required />
                </Form.Group>
                <Form.Group as={Col} style={{ width: "25%", minWidth: "100px" }}>
                    <Form.Label>룰</Form.Label>
                    <Form.Select name="rule">
                        <option>풋살</option>
                        <option>축구</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} style={{ width: "25%", minWidth: "100px" }}>
                    <Form.Label>성별</Form.Label>
                    <Form.Select name="gender">
                        <option>혼성</option>
                        <option>남자</option>
                        <option>여자</option>
                    </Form.Select>
                </Form.Group>

            </Row>
            <Row>
                <div key="default-checkbox" className="mb-3">
                    <Form.Check style={{ color: "black", textAlign: "left", fontWeight: "bolder", fontSize: "20px" }}
                        type="checkbox"
                        id="findAway"
                        label="상대 팀을 구합니다."
                    />
                </div>
            </Row>
            <hr></hr>
        </div >

    );

}

export default GameInfoForm;
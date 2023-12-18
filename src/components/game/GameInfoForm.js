import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// validate 해야댐,,
const GameInfoForm = () => {

    return (
        <div >
            <Row style={{ textAlign: "left" }} className="mb-5">
                <Form.Group as={Col} style={{ width: "30%", minWidth: "150px" }}>
                    <Form.Label>경기 날짜</Form.Label>
                    <Form.Control
                        as='input'
                        name="date"
                        required
                        type="date"
                        placeholder="YYYY-MM-DD"
                    />
                </Form.Group>
                <Form.Group as={Col} style={{ width: "30%", minWidth: "150px" }}>
                    <Form.Label>시각</Form.Label>
                    <Form.Control
                        as='input'
                        name="time"
                        required
                        type="time"
                        placeholder="hh:mm:ss"
                    />
                </Form.Group>
                <Form.Group as={Col} style={{ width: "40%" }}>
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
                <Form.Group as={Col} style={{ width: "30%", minWidth: "150px" }}>
                    <Form.Label>구장명</Form.Label>
                    <Form.Control as='input' name="stadium" type="text" placeholder="구장을 예약하지 않았습니다." defaultValue={"구장을 예약하지 않았습니다."} />
                </Form.Group>

                <Col style={{ width: "40%"}}>
                </Col>
            </Row>
            <Row style={{ textAlign: "left" }} className="mb-5">
                <Form.Group as={Col} style={{ width: "25%", minWidth: "100px" }}>
                    <Form.Label>비용</Form.Label>
                    <Form.Control as='input' name="account" type="number" placeholder="10000" required />
                </Form.Group>
                <Form.Group as={Col} style={{ width: "25%", minWidth: "100px" }}>
                    <Form.Label>인원제(6vs6면 6기입)</Form.Label>
                    <Form.Control as='input' name="vsFormat" type="number" placeholder="11" required />
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

        </div >

    );

}

export default GameInfoForm;
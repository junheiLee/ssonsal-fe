import { Container, Row, Col, Image, Badge, Accordion, ListGroup, Button } from "react-bootstrap";
import "../../styles/game/component/MatchTeamInfo.css";
import "../../styles/game/component/GameListElement.css";

import SubListElement from "./SubListElement";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getMatchTeamInfo } from "../../services/game/MatchTeamService";
import { getSubs, getSubApplicants, getSubApply, closeSubRecruitment } from "../../services/game/SubService";

const MatchTeamInfo = ({ matchTeamId, matchStatus }) => {

    const currentUserTeamId = useSelector(state => state.loginUser.teamId);

    let [teamInfo, setTeamInfo] = useState({
        teamId: -1,
        gameId: -1,
        logoUrl: "",
        name: "",
        skillScore: "-",
        uniform: "없음",
        subCount: 0,
        havingSubCount: 0
    });

    const fetchMatchTeamInfo = async () => {
        try {
            setTeamInfo(await getMatchTeamInfo(matchTeamId));
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSubs = async () => {
        try {
            setSubs(await getSubs(matchTeamId));
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSubApplicants = async () => {
        try {
            setSubApplicants(await getSubApplicants(matchTeamId));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMatchTeamInfo();
        fetchSubs();
        fetchSubApplicants();
        console.log("currentUserTeamId, teamInfo.teamId", currentUserTeamId, teamInfo.teamId);

        return () => {

        }
    }, [matchStatus, teamInfo.subCount])

    let [subs, setSubs] = useState([]);
    let [subApplicants, setSubApplicants] = useState([]);

    let [activeKey, setActiveKey] = useState([]);

    const subApply = async (event) => {
        event.stopPropagation();
        try {
            setSubApplicants(await getSubApply(matchTeamId));

        } catch (error) {
            console.log(error);
        }
    }


    const fetchClose = async (e) => {

        try {
            await closeSubRecruitment(matchTeamId);
            alert("마감");
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    }



    return (
        <div style={{ marginTop: "20px", minWidth: "300px" }}>
            {teamInfo.teamId != -1 &&
                <div className="team-info">
                    <Container>
                        <Row>
                            <Col>
                                <Image src={teamInfo.logoUrl} roundedCircle fluid />
                            </Col>
                            <Col>
                                <div style={{ marginTop: "20%", marginLeft: "10%", textAlign: "left" }}>
                                    <h4>{teamInfo.name}</h4>
                                    <div style={{ marginTop: "20%" }}>
                                        <Badge style={{ margin: "1px" }} bg="secondary">점수</Badge>
                                        <span>
                                            {teamInfo.skillScore == -1
                                                ? "  -"
                                                : teamInfo.skillScore}
                                        </span>
                                    </div>
                                    <div>
                                        <Badge style={{ margin: "1px" }} bg="secondary">유니폼</Badge>
                                        <span>{teamInfo.uniform}</span>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div style={{ marginTop: "20px" }}>
                        <Accordion className="accordion" defaultActiveKey={activeKey} alwaysOpen>
                            {
                                teamInfo.havingSubCount == 0
                                    ? null
                                    : <>
                                        <Accordion.Item eventKey="0">

                                            <Accordion.Header >{"용병 목록 (" + teamInfo.havingSubCount + ")"}</Accordion.Header>
                                            {
                                                subs.length !== 0
                                                    ?
                                                    <>
                                                        <Accordion.Body>
                                                            <ListGroup>
                                                                {
                                                                    subs.map((sub, i) => (
                                                                        <SubListElement status={"approval"} sub={sub} key={i} />
                                                                    ))
                                                                }
                                                            </ListGroup>
                                                        </Accordion.Body>
                                                    </>
                                                    : null
                                            }
                                        </Accordion.Item>
                                    </>
                            }
                            {
                                teamInfo.subCount == 0 
                                    ? null
                                    : <>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                                {"용병 신청 목록 (" + subApplicants.length + "/" + teamInfo.subCount + ")"}
                                                {currentUserTeamId == teamInfo.teamId
                                                    ?
                                                    <Badge className="subApplyBtn" style={{ textAlign: "right" }}
                                                        onClick={(e) => { fetchClose(e) }}>마감</Badge>
                                                    :
                                                    <Badge className="subApplyBtn"
                                                        onClick={(e) => { subApply(e) }}>신청</Badge>
                                                }
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup>
                                                    {
                                                        subApplicants.length != 0
                                                            ?
                                                            subApplicants.map((sub, i) => (
                                                                <SubListElement status={"waiting"} permmision={teamInfo.teamId == currentUserTeamId} sub={sub} matchTeamId={matchTeamId} key={i} />

                                                            ))
                                                            : null
                                                    }
                                                </ListGroup>
                                            </Accordion.Body>


                                        </Accordion.Item>
                                    </>
                            }
                        </Accordion>
                    </div>
                </div>
            }
            <div className="match-info">

            </div>
        </div >
    );

}

export default MatchTeamInfo;
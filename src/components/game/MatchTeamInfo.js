import { Container, Row, Col, Image, Badge, Accordion, ListGroup } from "react-bootstrap";
import "../../styles/game/component/MatchTeamInfo.css";
import "../../styles/game/component/GameListElement.css";

import SubListElement from "./SubListElement";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMatchTeamInfo } from "../../services/game/MatchTeamService";
import { getSubs, getSubApplicants } from "../../services/game/SubService";

const MatchTeamInfo = ({ matchTeamId, matchStatus }) => {

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
        return () => {

        }
    }, [matchStatus, teamInfo.subCount])

    let [subs, setSubs] = useState([]);
    let [subApplicants, setSubApplicants] = useState([]);

    let [activeKey, setActiveKey] = useState([]);
    // if(teamInfo.havingSubCount > 0) {
    //     let copy = [...activeKey];
    //     copy.push('0');
    //     setActiveKey(copy);
    // }
    // if(subApplicants.length > 0) {
    //     let copy = [...activeKey];
    //     copy.push('1');
    //     setActiveKey(copy);
    // }

    return (
        <div style={{ marginTop: "20px", minWidth: "300px" }}>
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
                        <Accordion.Item eventKey="0">
                            <Accordion.Header >{"용병 목록 (" + teamInfo.havingSubCount + ")"}</Accordion.Header>
                            {
                                subs.length !== 0
                                    ?
                                    <>
                                        <Accordion.Body>
                                            <ListGroup>
                                                {
                                                    // subs.length !== 0
                                                    // ?
                                                    subs.map(sub => (
                                                        <SubListElement status={"approval"} sub={sub} key={subs.userId} />
                                                    ))
                                                    // : null
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </>
                                    : null
                            }
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>{"용병 신청 목록 (" + subApplicants.length + "/" + teamInfo.subCount + ")"} </Accordion.Header>
                            {
                                subs.length !== 0
                                    ?
                                    <>
                                        <Accordion.Body>
                                            <ListGroup>
                                                {
                                                    subApplicants.length != 0
                                                        ?
                                                        subApplicants.map(sub => (
                                                            <SubListElement status={"waiting"} permmision={teamInfo.teamId == "로그인 팀 유저"} sub={sub} key={sub.userId} />
                                                        ))
                                                        : null
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </>
                                    : null
                            }
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            <div className="match-info">

            </div>
        </div >
    );

}

export default MatchTeamInfo;
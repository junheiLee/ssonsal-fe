import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import GameInfoDetail from "../../components/game/GameInfoDetail";
import MatchTeamInfo from "../../components/game/MatchTeamInfo";
import ResultForm from "../../components/game/ResultForm";
import FindAway from "../../components/game/FindAway";
import { CloseButton, Container, Col, Row, Badge } from 'react-bootstrap';
import { getGame } from '../../services/game/GameService';




const GameDetail = (id) => {
    let { gameId } = useParams();

    let [gameInfo, setGameInfo] = useState({
        homeApplicationId: null,
        awayApplicationId: null,
        matchStatus: -1,

    });


    useEffect(() => {
        fetchGame();
    }, []);

    const fetchGame = async () => {
        try {
            setGameInfo(await getGame(  ));
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();
    const { option } = useParams();



    return (
        <div style={{ width: "100%", maxWidth: "900px", display: "block", margin: "auto", marginTop: "10px" }}>
            <div style={{ textAlign: "right", marginRight: "10px" }}>
                <CloseButton
                    onClick={() => {
                        option == "teams" || option == "users"
                            ? navigate(-1) //나중에 생각하자
                            : navigate(`/games/option/${option}`)
                    }}
                />
            </div>
            {gameInfo.matchStatus != -1
                ?
                <GameInfoDetail gameInfo={gameInfo} />
                :
                <h1> 해당 게임 정보가 없습니다.</h1>
            }

            {gameInfo.matchStatus != -1 &&
                < Container >
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col><h3>HOME</h3></Col>
                        <Col xs={1}></Col>
                        <Col><h3>AWAY</h3></Col>
                    </Row>
                </Container>
            }

            { // 양 팀이 확정 됐을 때, 결과 기입 창
                gameInfo.matchStatus == 1 && gameInfo.awayId != null
                    ?
                    <>
                        <Container>
                            <Row>
                                <Col><ResultForm gameId={gameId} target={"home"} /></Col>
                                <Col xs={1}></Col>
                                <Col><ResultForm gameId={gameId} target={"away"} /></Col>
                            </Row>
                        </Container>
                    </>
                    : null
            }
            { // 종료 후 결과 창
                gameInfo.matchStatus == 2
                    ?
                    <>
                        <Container>
                            <Row>
                                <Col>
                                    <h5>
                                        <Badge bg="success">{gameInfo.homeResult}</Badge>
                                    </h5>
                                </Col>
                                <Col xs={1}></Col>
                                <Col><h5>
                                    <Badge bg="success">{gameInfo.awayResult}</Badge>
                                </h5></Col>
                            </Row>
                        </Container>
                    </>
                    : null
            }

            {
                gameInfo.homeApplicationId !== null && (
                    <Container>
                        <Row>
                            <Col>
                                <MatchTeamInfo matchTeamId={gameInfo.homeApplicationId} matchStatus={gameInfo.matchStatus} />
                            </Col>
                            <Col xs={1} md="auto"> {gameInfo.findAway && <h1>VS</h1>} </Col> {/*난중에 사진넣거나 해도 조흘듯*/}
                            <Col>
                                {gameInfo.matchStatus == 0 && <FindAway gameId={gameId}/>}
                                {gameInfo.matchStatus == 1 && gameInfo.awayApplicationId == null && null}
                                {gameInfo.awayApplicationId != null && <MatchTeamInfo matchTeamId={gameInfo.awayApplicationId} matchStatus={gameInfo.matchStatus} />}
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </div >
    )

}

export default GameDetail;
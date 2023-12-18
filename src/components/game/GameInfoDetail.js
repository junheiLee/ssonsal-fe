import { Badge, Card } from 'react-bootstrap';

function GameInfoDetail({ gameInfo }) {



    return (
        <div style={{ width: "100%", maxWidth: "900px", minWidth: "460px", display: "block", margin: "auto", marginTop: "10px" }}>
            { gameInfo != null &&
                <Card className="text-center">
                    <Card.Header >
                        <Badge style={{ fontWeight: "lighter", margin: "1px" }} bg="success">
                            {gameInfo.vsFormat + " vs " + gameInfo.vsFormat} </Badge>
                        <Badge style={{ fontWeight: "lighter", margin: "1px" }} bg="success">
                            {gameInfo.gender} </Badge>
                        <Badge style={{ fontWeight: "lighter", margin: "1px" }} bg="success">
                            {gameInfo.rule} </Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{gameInfo.region + " " + gameInfo.stadium}</Card.Title>
                        <Card.Text> {gameInfo.schedule + "부터 " + gameInfo.gameTime + "시간"} </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <span style={{ fontWeight: "bolder" }}>{gameInfo.account + "원"}</span>(구장 예약증을 꼭 확인하세요!)
                    </Card.Footer>
                </Card>
            }
        </div>
    );
}

export default GameInfoDetail;
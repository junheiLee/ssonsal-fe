import { Badge, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/game/component/GameListElement.css";

const GameListElement = ({ game }) => {

    let {option} = useParams();
    let navigate = useNavigate();

    return (
        <>
            <ListGroup.Item
                onClick={() => { navigate(`/games/${option}/${game.id}`) }}
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div style={{ textAlign: "left" }}>
                    <div className="game-title-top">{game.schedule + " " + game.account + "원"}</div>
                    <div className="game-title-center">{game.region + " " + game.stadium}</div>
                    <div>
                        <Stack direction="horizontal" gap={1}>
                            <Badge bg="secondary"> {game.gender} </Badge>
                            <Badge bg="secondary"> {game.vsFormat + " vs " + game.vsFormat} </Badge>
                        </Stack>
                    </div>

                </div>
                <Badge bg="success" pill>
                    {game.rule}
                </Badge>
            </ListGroup.Item>

        </>
    );
}

export default GameListElement;
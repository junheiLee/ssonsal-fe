import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, ListGroup } from 'react-bootstrap';
import GameListElement from "../../components/game/GameListElement";
import "../../styles/game/GameList.css"
import { getGames } from '../../services/game/GameService';

const GameList = () => {

    let { option } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetchGames();

        return () => {
            setGames([]);
        }
    }, [option])

    let [games, setGames] = useState([]);
    let [forSub, setForSub] = useState(option == "for-sub");
    let [forTeam, setForTeam] = useState(option == "for-team");
    let [all, setAll] = useState(option == "all");

    const fetchGames = async () => {
        try {
            if (option == "all") {
                setGames(await getGames(""));
            } else if (forSub || forTeam) {
                setGames(await getGames(option));
            } else {
                setGames(await getGames(option+`/${searchParams.get("id")}`))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();
    let [hasTeam, setHasTeam] = useState(true); //team id 값 넣어 두기


    return (
        <div className="game-list">
            <div style={{ width: "100%", maxWidth: "900px", display: "block", margin: "auto" }}>
                <div className="left-button-box" style={{ width: "60%", display: "inline-block", marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                    <Button
                        variant={forTeam ? "secondary" : "outline-secondary"}
                        style={{ minWidth: "150px" }}
                        onClick={() => { navigate("/games/option/for-team"); setForTeam(true); setForSub(false); }}>
                        팀이랑 할거에요
                    </Button>{' '}
                    <Button
                        variant={forSub ? "secondary" : "outline-secondary"}
                        style={{ minWidth: "150px" }}
                        onClick={() => { navigate("/games/option/for-sub"); setForSub(true); setForTeam(false); }}>
                        혼자 할거에요
                    </Button>{' '}
                </div>
                <div className="right-button-box" style={{ width: "40%", display: "inline-block", marginTop: "10px", marginBottom: "20px", textAlign: "right" }}>
                    {hasTeam
                        && <Button variant="success"
                            onClick={() => { navigate("/games/new") }}> New</Button>}
                </div>
            </div>
            <ListGroup style={{ width: "100%", maxWidth: "900px", display: "block", margin: "auto" }} as="ol">
                {
                    games.length !== 0
                        ?
                        games.map(game => (
                            <GameListElement game={game} key={game.id} id={searchParams.get("id")} />
                        ))
                        : <h4>아무 고토 업서요</h4>
                }
            </ListGroup>
        </div >
    )

}

export default GameList;
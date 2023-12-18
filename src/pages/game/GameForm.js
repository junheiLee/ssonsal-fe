import GameInfoForm from '../../components/game/GameInfoForm';
import MatchTeamForm from '../../components/game/MatchTeamInfoForm';
import { Button, Form, FormGroup, CloseButton } from 'react-bootstrap';
import { useState } from 'react';
import { createGame } from '../../services/game/GameService';
import { useNavigate } from 'react-router-dom';


const GameForm = () => {

    const navigate = useNavigate();
    let option = 'for-team';

    let setOption = (setOption) => {
        option = setOption;
    }

    window.onload = function () {
        const target = document.querySelector("#gameForm");
        target.addEventListener("submit", onSubmit);
    }



    const onSubmit = async (e) => {
        e.preventDefault();

        const game = handleFormData();
        handleOption();

        try {
            const gameId = await createGame(game);
            navigate(`/games/` + option + `/` + gameId);
        } catch (error) {
            console.error("GameForm 오류: ", error);
        }

    }

    const handleFormData = () => {

        const gameForm = new FormData(document.getElementById('gameForm'));
        gameForm.append("findAway", document.getElementById('findAway').checked);

        var game = {};
        gameForm.forEach((value, key) => {
            game[key] = value;
        });
        return game;
    }

    const handleOption = async () => {
        document.getElementById('findAway').checked
            ? setOption('for-team')
            : setOption('for-sub')
    }

    return (
        <div style={{ width: "40%", maxWidth: "800px", display: "block", margin: "auto", marginTop: "50px" }}>
            <div style={{ textAlign: "right", marginRight: "10px" }}>
                <CloseButton
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            </div>
            <Form id="gameForm" as="form">
                <FormGroup>
                    <GameInfoForm />
                </FormGroup>
                <Form.Group style={{ marginTop: "40px" }}>
                    <MatchTeamForm />
                </Form.Group>

                <Button style={{ marginTop: "30px" }} size="lg" variant="success" type="submit">등록</Button>{' '}
            </Form>
        </div>
    )
}

export default GameForm;
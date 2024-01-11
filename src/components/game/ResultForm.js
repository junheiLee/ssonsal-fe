import { useState } from 'react';
import { Form, Button, Collapse, Container, Row, Col } from 'react-bootstrap';
import "../../styles/game/component/ResultForm.css";
import { useNavigate, useParams } from 'react-router-dom';
import { enterResult } from "../../services/game/GameService";


const ResultForm = ({ gameId, target }) => {

    let { option } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        target: target,
        result: ""
    });

    const handleChange = e => {
        let copy = { ...values };
        copy.result = e.target.value;
        setValues(copy);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await enterResult(gameId, values);
            
            if(response.code == "SUCCESS"){
                alert(response.message);
                window.location.reload();
            } else if(response.code == "WAIT_FOR_ANOTHER_TEAM") {
                alert(response.message);
                return;
            } else {
                alert(response.message);
                return;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form>
                <div className="InputResult">
                    <div style={{ display: "inline-block", padding: "1px" }} >
                        <Form.Select style={{ display: "inline-block" }}
                            aria-label="result"
                            onChange={(e) => { handleChange(e) }}>
                            <option></option>
                            <option value="승">승</option>
                            <option value="무">무</option>
                            <option value="패">패</option>
                        </Form.Select>

                    </div>
                    <div style={{ display: "inline-block", padding: "1px" }} >
                        <Button
                            onClick={(e) => { handleSubmit(e) }}
                            style={{ display: "inline-block", padding: "3px" }}
                            variant="outline-success"
                            type="submit"
                        >
                            입력</Button>{' '}
                    </div>
                </div>
            </Form>
        </>
    );

}

export default ResultForm;
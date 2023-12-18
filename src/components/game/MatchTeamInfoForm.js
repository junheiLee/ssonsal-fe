import { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';

const MatchTeamInfoForm = () => {


    let subCount = 0;
    const setSubCount = async (e) => {
        subCount = e.target.value;
    }
    let [needSub, setNeedSub] = useState(false);

    useEffect(() => {

    }, [needSub])

    return (
        <>
            <hr></hr>

            <Row style={{ textAlign: "left", marginTop: "50px" }}>

                <Form.Group style={{ width: "150px" }} className="mb-5">
                    <Form.Label>구하는 용병 수</Form.Label>
                    <Form.Control as='input' name="subCount" type="number" placeholder="0" inline="true"
                        onChange={(e) => { setSubCount(e); setNeedSub(subCount > 0); }}
                    />
                </Form.Group>
                <Form.Group style={{ width: "200px" }} className="mb-3" >
                    <Form.Label>유니폼</Form.Label>
                    <Form.Control as='input' name="uniform" type="text" placeholder="색상" defaultValue="없음" />
                </Form.Group>

            </Row>
            <Form.Check style={{ color: "black", textAlign: "left", fontWeight: "bolder", fontSize: "20px" }}
                type="checkbox"
                label="용병을 구합니다."
                disabled={!needSub}
                checked={needSub}
            />
        </>
    );
}

export default MatchTeamInfoForm;
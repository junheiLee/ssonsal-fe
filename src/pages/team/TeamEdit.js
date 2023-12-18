import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/team/index.css';
import '../../styles/team/Create.css';
import { useParams } from 'react-router-dom';


const TeamEdit = () => {

    const navigate = useNavigate();
    let { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        logoUrl: "",
        intro: "",
        recruit: 0,
    });

    useEffect(() => {
        getForm();
    }, []);

    const getForm = async () => {
        try {
            const response = await axios.get('/api/teams/' + id + '/edit');
            setForm(response.data.data.form);
        } catch (error) {
            console.log(error);
            navigate('/*', { replace: true });
        }
    }


    const setThumbnail = (event) => {
        const logoInput = document.getElementById("input-file");

        if (logoInput.files.length === 0) {
            return;
        }

        const fileName = logoInput.files[0].name;

        if (!isValidFileType(fileName)) {
            alert("허용되지 않는 파일 확장자입니다.");
            logoInput.value = "";
            document.querySelector("div#image_container").innerHTML = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement("img");
            img.setAttribute("src", e.target.result);
            img.setAttribute("class", "img-fluid");
            document.querySelector("div#image_container").innerHTML = "";
            document.querySelector("div#image_container").appendChild(img);
        };

        reader.readAsDataURL(logoInput.files[0]);
    };

    const isValidFileType = (fileName) => {
        const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
        return allowedExtensions.test(fileName);
    };

    const editTeam = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.set('recruit', form.recruit);

        try {
            const response = await axios.patch('/api/teams/'+id, formData);
            alert('팀 정보 수정 성공!')
            console.log(response);
            navigate('/teams/' + response.data.data.teamId, { replace: true });
        } catch (error) {

            if (error.response.data.httpStatus === 401) {
                alert(error.response.data.message);
                navigate('/user/login', { replace: true });
            } else if (error.response.status === 400) {
                alert(error.response.data.message);
            } else if (error.response.data.httpStatus === 400 || error.response.data.httpStatus === 409) {
                alert(error.response.data.message);
            } else if (error.response.data.httpStatus === 403) {
                alert(error.response.data.message);
                navigate('/teams', { replace: true });
            }
            else {
                alert('알 수 없는 오류가 발생했습니다.');
                console.log(error);
                navigate('/', { replace: true });
            }
        }
    };


    return (
        <Container className="mt-5">
            <h1 className='formexplan'>프로필</h1>

            <Container className="text-center mt-5">
                <Form onSubmit={editTeam} encType="multipart/form-data">
                    <Form.Group controlId="formId">
                    </Form.Group>
                    <Row className="mb-4">
                        <Col lg={4} mb={5}>
                            <div id="image_container">
                                <img
                                    id="thumbnail"
                                    src={form.logoUrl || ''}
                                    alt="로고 미리보기"
                                    className="img-fluid"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </div>
                            <label className="btn btn-primary mt-2" id='logobtn'>
                                로고 등록
                                <Form.Control
                                    type="file"
                                    id="input-file"
                                    name="logo"
                                    style={{ display: 'none' }}
                                    onChange={(event) => setThumbnail(event)}
                                />
                            </label>
                        </Col>

                        <Col lg={8} className="teampro">
                            <Form.Group controlId="formName">
                                <Form.Label>팀명</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name || ''}
                                    placeholder="ex. 잘하는팀"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formIntro" className="mt-5">
                                <Form.Label>한 줄 소개</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="intro"
                                    value={form.intro || ''}
                                    placeholder="해당 소개글은 팀원 모집, 혹은 경기 매칭 시 보이는 글이니 참고해서 작성 부탁드립니다."
                                    onChange={(e) => setForm({ ...form, intro: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <h1 className='formexplan'>선호 정보</h1>
                    <Container className="locadate mb-4">
                        <Form.Group controlId="formPreferredTime">
                            <h2>선호 시간</h2>
                            <Form.Select id="time" name="preferredTime">
                                <option>상관 없음</option>
                                <option>주중/오전</option>
                                <option>주중/오후</option>
                                <option>주말/오전</option>
                                <option>주말/오후</option>
                            </Form.Select>

                            <h2>선호 지역</h2>
                            <Form.Select id="area" name="preferredArea">
                                <option>지역 모름</option>
                            </Form.Select>
                        </Form.Group>

                        <h1 className='formexplan'>팀원 모집</h1>
                        <Form.Group controlId="formRecruit" className="form-check mb-5 mt-4 ms-3">
                            <Form.Check
                                type="checkbox"
                                name="recruit"
                                id="recruit"
                                checked={form.recruit === 1}
                                label="팀원을 모집합니다."

                                onChange={() => setForm(prevForm => ({ ...prevForm, recruit: prevForm.recruit === 1 ? 0 : 1 }))}
                            />
                        </Form.Group>
                    </Container>

                    <Button className="btn btn-primary mt-5" id='submitbtn' type="submit">
                        수정하기
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default TeamEdit;
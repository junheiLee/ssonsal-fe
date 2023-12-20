import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../styles/team/index.css";
import "../../styles/team/Create.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../services/UserService";
import { setTeamId } from "../../store/LoginUser";
import { useDispatch } from 'react-redux';

const TeamForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const createTeam = async (event) => {
    event.preventDefault();

    const recruitValue = document.getElementById("recruit").checked ? 1 : 0;

    const formData = new FormData(document.getElementById("teamForm"));
    formData.set("skillScore", -1);
    formData.set("mannerScore", -1);
    formData.set("recruit", recruitValue);

    try {
      const response = await axios.post("/api/teams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ssonToken: getCookie("token"),
        },
      });
      alert(response.data.data.teamName + "팀 생성 완료!");
      dispatch(setTeamId(response.data.data));
      navigate("/teams/" + response.data.data.teamId, { replace: true });

    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
        console.log(error);
      } else if (
        error.response.data.httpStatus === 400 ||
        error.response.data.httpStatus === 409
      ) {
        alert(error.response.data.message);
        console.log(error);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
        navigate("/*", { replace: true });
      }
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="formexplan">프로필</h1>

      <Container className="text-center mt-5">
        <Form
          action="/teams"
          id="teamForm"
          method="POST"
          encType="multipart/form-data"
        >
          <Row className="mb-4">
            <Col lg={4} className="mb-5">
              <div id="image_container"></div>
              <Form.Label
                className="input-file-button mt-2" id="logobtn" 
                htmlFor="input-file"
              >
                로고 등록
              </Form.Label>
              <input
                type="file"
                id="input-file"
                name="logo"
                style={{ display: "none" }}
                onChange={(event) => setThumbnail(event)}
              />
            </Col>

            <Col lg={8} className="teampro">
              <p className="mb-2">팀명</p>
              <Form.Control
                type="text"
                name="name"
                id="name"
                placeholder="ex. 잘하는팀"
              />
              <p className="mt-5">한 줄 소개</p>
              <Form.Control
                as="textarea"
                name="intro"
                placeholder="해당 소개글은 팀원 모집, 혹은 경기 매칭 시 보이는 글이니 참고해서 작성 부탁드립니다."
              />
            </Col>
          </Row>

          <h1 className="formexplan">선호 정보</h1>
          <Container className="locadate mb-4">
            <h2>선호 시간</h2>
            <Form.Select id="time" name="preferredTime">
              <option>상관없음</option>
              <option>주중/오전</option>
              <option>주중/오후</option>
              <option>주말/오전</option>
              <option>주말/오후</option>
            </Form.Select>

            <h2>선호 지역</h2>
            <Form.Select id="area" name="preferredArea">
              <option>상관없음</option>
              <option>서울</option>
              <option>경기</option>
              <option>지방</option>
            </Form.Select>

            <h1 className="formexplan">팀원 모집</h1>
            <Form.Check
              type="checkbox"
              className="mb-5 mt-4 ms-3"
              label="팀원을 모집합니다."
              id="recruit"
            />
          </Container>

          <Button
            className="mt-5"
            id="submitbtn"
            onClick={(event) => createTeam(event)}
          >
            팀 생성 하기
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default TeamForm;

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import '../../styles/review/reportform.css';
import '../../styles/team/index.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getCookie } from '../../services/UserService';

const ReportForm = () => {


    let { reviewId } = useParams();
    const navigate = useNavigate();

    const confirmReport = async (event) => {
        event.preventDefault();

        const isConfirmed = window.confirm("정말로 신고하시겠습니까?");

        if (isConfirmed) {
            try {
                const response = await axios.post('/api/reports', {
                    reviewId: reviewId,
                    reason: document.getElementById('reason').value,
                },{
                    headers: {
                        "Content-Type": "application/json",
                        ssonToken: getCookie("token")
                      },
                });
                alert("신고 성공!");
                console.log(response);
                navigate('/', { replace: true });
            } catch (error) {
                console.log(error);
                navigate('/*', { replace: true });
            }
        }
    }

    return (
        <>
            <Container className="mt-5">
                <h1 style={{ fontSize: '30px' }}>리뷰 신고 하기</h1>
                <Form onSubmit={(event) => confirmReport(event)}>
                    <textarea name="reason" id="reason" placeholder="신고 사유를 적어주세요."></textarea>
                    <Button id="report-review" type='submit'>신고 접수</Button>
                </Form>

            </Container>

        </>

    );
};

export default ReportForm;

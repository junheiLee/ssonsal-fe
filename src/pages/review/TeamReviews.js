import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../../styles/review/review.css';
import '../../styles/team/index.css';
import { getCookie } from '../../services/UserService';

function TeamReviews() {
  const { teamId } = useParams();
  const [reviews,setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await axios.get('/api/reviews/team/' + teamId, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      console.log(response);
      setReviews(response.data.data);
    } catch (error) {
      console.log(error);
      // navigate('/*', { replace: true });
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return <div style={{ height: '1080px' }}></div>;
  }

  return (
    <div style={{marginBottom:'100px'}}>

<Container className="mt-5">
          <div className="listsheader-review">
            <p><img src={process.env.PUBLIC_URL + '/assets/ball.png'} alt='축구공' /></p>
            <p>
              <span>작성자</span>
              <span style={{width:'50%'}}>한줄평</span>
              <span>실력점수</span>
              <span>매너점수</span>
              <span style={{width:'11%'}}></span>
            </p>
          </div>
        </Container>

        {reviews.length === 0 && (
          <Container className='noReviewMessage'>
            <h4>리뷰 정보가 없습니다.</h4>
          </Container>
        )}


        <Container className="mt-5">
          <ul className="teamlist-review">
            {reviews.map((review,i) => (
              <li className="lists-review" key={review.userId}>
                <p style={{ width: '25px' }}></p>
                <p style={{ width: '15px' }}></p>
                <Link to={`/user/${review.userId}`}>
                  <span>{review.nickname}</span>
                  <span style={{width:'55%'}} className={`comments ${review.comment.length < 5 ? 'shortComment' : review.comment.length < 10 ? 'mediumComment' : 'longComment'}`}>{review.comment}</span>
                  <span>{review.skillScore}</span>
                  <span>{review.mannerScore}</span>
                </Link>
                <Link to={`/reviews/${review.reviewId}/report`} id='reportBtn'>신고</Link>
              </li>
            ))}
          </ul>
        </Container>
        <div style={{ clear: 'both' }}></div>



    </div>
  );
}

export default TeamReviews;

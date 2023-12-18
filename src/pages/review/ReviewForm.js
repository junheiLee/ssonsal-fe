import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../../styles/team/index.css';
import '../../styles/review/reviewform.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ModalContainer,
  ModalBackdrop,
  ModalBtn,
  ExitBtn,
  ModalView,
} from '../../styles/review/reviewform';

const ReviewForm = (targetId, gameId, reviewCode) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const confirmReview = async (event) => {
    event.preventDefault();

    const comment = event.target.elements.comment.value;
    const skillScore = event.target.elements.skillScore.value;
    const mannerScore = event.target.elements.mannerScore.value;

    const isConfirmed = window.confirm("리뷰를 작성하시겠습니까?");

    if (isConfirmed) {
      try {
        const response = await axios.post('/api/reviews', {
          targetId : targetId,
          gameId: gameId,
          reviewCode : reviewCode,
          comment: comment,
          skillScore: skillScore,
          mannerScore: mannerScore,
        });
        alert("작성 성공!");
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
      <ModalContainer>
      {isOpen ? (
          <ModalBackdrop onClick={closeModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <ExitBtn onClick={closeModalHandler}>X</ExitBtn>
              <div className='desc'>
                <Form id='reviewForm' onSubmit={(event) => confirmReview(event)}>
                  <h4>한줄평</h4>
                  <input type='text' name='comment' maxLength={20} />
                  <label>스킬 점수</label>
                  <input type="number" name='skillScore' min="1" max="100" required />
                  <label>매너 점수</label>
                  <input type="number" name='mannerScore' min="1" max="100" required />
                  <input type="submit" value='작성완료' />
                </Form>
              </div>
            </ModalView>
          </ModalBackdrop>
          ) : null}
      </ModalContainer>
    </>
  );
};


export default ReviewForm;
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = () => {
  const navigate = useNavigate();

  const [reviewCode, setReviewCode] = useState('');
  const [writerId, setWriterId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [gameId, setGameId] = useState('');
  const [skillScore, setSkillScore] = useState('5');
  const [mannerScore, setMannerScore] = useState('5');
  const [comment, setComment] = useState('');

  // 점수 제한
  const handleSkillScoreChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 100);
    setSkillScore(value.toString());
  };

  const handleMannerScoreChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 100);
    setMannerScore(value.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      reviewCode,
      writerId,
      targetId,
      gameId,
      skillScore,
      mannerScore,
      comment,
    };

    try {
      const response = await axios.post('/reviews/', reviewData);

      console.log('응답 데이터:', response.data);
      console.log('리뷰가 성공적으로 제출되었습니다.');

      // 페이지 이동 시
      navigate('/');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (

    <div className="review-form-container">

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          리뷰 작성
        </div>
        <div className="horizontal-inputs">

          <div>
            <label>
              리뷰 코드:
              <input type="text" value={reviewCode} onChange={(e) => setReviewCode(e.target.value)} />
            </label>
            <label>
              작성자 ID:
              <input type="text" value={writerId} onChange={(e) => setWriterId(e.target.value)} />
            </label>
            <label>
              대상 ID:
              <input type="text" value={targetId} onChange={(e) => setTargetId(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              게임 ID:
              <input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} />
            </label>
            <label>
              기술 점수:
              <input type="number" value={skillScore} onChange={handleSkillScoreChange} min="0" max="5" />
            </label>
            <label>
              태도 점수:
              <input type="number" value={mannerScore} onChange={handleMannerScoreChange} min="0" max="5" />
            </label>
          </div>
        </div>
        <label>
          코멘트:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default ReviewForm;

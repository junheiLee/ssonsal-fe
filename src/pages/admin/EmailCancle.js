import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/EmailSubscriptionButton.css';

const EmailUnsubscribeButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete('/api/admin/unsubscribe');

      setSuccess(true);
      console.log('이메일 수신 취소 성공', response.data);
    } catch (err) {
      setError('이메일 수신 취소 에러');
      console.error('이메일 수신 취소 에러', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-unsubscribe-container">
      <div className="unsubscribe-info">
        <p>이메일로 받던 이벤트 소식을 더 이상 받지 않습니다.</p>
      </div>
      <button
        className={`unsubscribe-button ${loading || success ? 'disabled' : ''}`}
        onClick={handleUnsubscribe}
        disabled={loading || success}
      >
        {loading ? '처리 중...' : success ? '수신 취소 성공' : '수신 취소'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailUnsubscribeButton;
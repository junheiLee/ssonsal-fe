import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/EmailSubscriptionButton.css';
import { getCookie } from '../../services/UserService';

const EmailUnsubscribeButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete('/api/unsubscribe',
      {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });

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
    <div className="email-subscription-container">
      <div className="subscription-info">
      <div className="additional-info">
        <p>SSonsal에서 제공하는 이벤트 이메일 소식을 더 이상 받지 않습니다.</p>
      </div>
      <button
        className={`subscribe-button ${loading || success ? 'disabled' : ''}`}
        onClick={handleUnsubscribe}
        disabled={loading || success}
      >
        {loading ? '처리 중...' : success ? '수신 취소 성공' : '이메일 수신 취소'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
};

export default EmailUnsubscribeButton;
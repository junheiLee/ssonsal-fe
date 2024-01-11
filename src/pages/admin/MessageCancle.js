import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/admin/EmailSubscriptionButton.css';
import { getCookie } from '../../services/UserService';

const SmsUnsubscribeButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete('/api/unsubscribeMessage',
      {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      }
      );

      setSuccess(true);
      console.log('SMS 수신 취소 성공', response.data);
    } catch (err) {
      setError('SMS 수신 취소 에러');
      console.error('SMS 수신 취소 에러', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-subscription-container">
      <div className="subscription-info">
      <div className="additional-info">
        <p>SSonsal에서 제공하는 메시지 수신을 더 이상 받지 않습니다</p>
      </div>
      <button
        className={`subscribe-button ${loading || success ? 'disabled' : ''}`}
        onClick={handleUnsubscribe}
        disabled={loading || success}
      >
        {loading ? '처리 중...' : success ? '수신 취소 성공' : '메시지 수신 취소'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
};

export default SmsUnsubscribeButton;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/EmailSubscriptionButton.css';
import { getCookie } from '../../services/UserService';

const EmailSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [confirming, setConfirming] = useState(false);


  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      // 이메일 인증 확인중으로 상태 업데이트
      setConfirming(true);

      const response = await axios.post('/api/memberSubscribe',null,{
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });

      setSuccess(true);
      console.log('이메일 구독 성공', response.data);
    } catch (err) {
      setError('이메일 구독 에러');
      console.error('이메일 구독 에러', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/confirm-subscription',null,{
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });

      if (response.data.data === '이메일 불일치') {
        console.log('이메일 불일치');
        alert('이메일 요청을 확인해 주세요');
        return;
      }

      const userId = response.data.data.userId

      setIsSubscribed(true);
      setSuccess(true);
      console.log('이메일 구독 확인 성공', response.data);
    } catch (err) {
      setError('이메일 구독 확인 에러');
      console.error('이메일 구독 확인 에러', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-subscription-container">
      {isSubscribed ? (
        <button className="confirmation-button" disabled>
          인증 완료
        </button>
      ) : (


          <button
            className={`subscribe-button ${loading || success ? 'disabled' : ''}`}
            onClick={handleSubscribe}
            disabled={loading || success || confirming}
          >
            {loading ? '처리 중...' : confirming ? '이메일 인증 확인중' : '이메일 인증하기'}
          </button>

      )}
      {error && <p className="error-message">{error}</p>}
      {!isSubscribed && success && (
        <button
          className={`confirmation-button ${loading ? 'disabled' : ''}`}
          onClick={handleConfirm}
          disabled={loading}
        >
          인증 완료
        </button>
      )}
    </div>
  );
};

export default EmailSubscriptionButton;
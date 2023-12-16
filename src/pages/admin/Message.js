import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 파일을 가져옴
import '../../styles/admin/EmailSubscriptionButton.css';

const MessageSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get('/api/admin/check-message-subscription');
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('메시지 구독 여부 확인 에러', error);
      }
    };

    checkSubscription();
  }, []);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/admin/subscribeMessage', {

      });

      setSuccess(true);
      console.log('메시지 구독 성공', response.data);
    } catch (err) {
      setError('메시지 구독 에러');
      console.error('메시지 구독 에러', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-subscription-container">
      {isSubscribed ? (
        <button className="btn btn-success" disabled>
          알림 받기 성공
        </button>
      ) : (
        <div className="subscription-info">
          <div className="additional-info">
            <p>메시지로 제공하는 이벤트 소식을 받을 수 있습니다.</p>
          </div>
          <button
            className={`btn btn-primary ${loading || success ? 'disabled' : ''}`}
            onClick={handleSubscribe}
            disabled={loading || success}
          >
            {loading ? '처리 중...' : success ? '알림 받기 성공' : '알림 받기'}
          </button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MessageSubscriptionButton;
import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getCookie } from '../../../../services/UserService';

const EmailPublishButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailContent, setEmailContent] = useState('');
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const quillRef = useRef();

  const openEmailForm = () => {
    setIsEmailFormOpen(true);
  };

  const closeEmailForm = () => {
    setIsEmailFormOpen(false);
  };
 
  const handlePublishEmail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/management/publishEmail',{
        headers: {
          'Content-Type': 'application/json',
          ssonToken: getCookie("token")
        },
      }, { emailText: emailContent } );

      console.log('이메일 발송 성공', response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || '이메일 발송 에러';
      setError(errorMessage);
      console.error('이메일 발송 에러', err);
    } finally {
      setLoading(false);
      closeEmailForm();
    }
  };

  return (
    <div className="email-publish-container">
      <button
        className={`email-publish-button ${loading ? 'disabled' : ''}`}
        onClick={openEmailForm}
        disabled={loading}
      >
        {loading ? '열기 중...' : '전체 이메일 발송'}
      </button>

      {isEmailFormOpen && (
        <div>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={emailContent}
            onChange={(value) => setEmailContent(value)}
          />
          <button onClick={handlePublishEmail}>전송</button>
          <button onClick={closeEmailForm}>취소</button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailPublishButton;
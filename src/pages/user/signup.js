import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 추가

import axios from 'axios';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
    nickname: '',
    position: '',
    phone: '',
    intro: '',
    preferredTime: '',
    preferredArea: '',
    role: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/sign-up', formData);
      console.log(response.data);
      navigate('/user/sign-in');
    } catch (error) {
      console.error('가입 중 오류 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <label>Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      {/* 생년월일(Date로 수정) 입력란 추가 */}
      <label>Birth:
        <input type="date" name="birth" value={formData.birth} onChange={handleChange} required />
      </label>
      <br />
      <label>Gender: 여성, 남성
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
      </label>
      <br />
      <label>Nickname:
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
      </label>
      <br />
      <label>Position:
        <input type="text" name="position" value={formData.position} onChange={handleChange} required />
      </label>
      <br />
      <label>Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <br />
      <label>Intro:
        <input type="text" name="intro" value={formData.intro} onChange={handleChange} required />
      </label>
      <br />
      <label>Preferred Time:
        <input type="text" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
      </label>
      <br />
      <label>Preferred Area:
        <input type="text" name="preferredArea" value={formData.preferredArea} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default SignUpForm;

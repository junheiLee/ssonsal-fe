import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../../../../services/UserService';

const PermissionButton = ({ users, selectedUserIds, setSelectedUserIds }) => {
  const [localSelectedUserIds, setLocalSelectedUserIds] = useState([]);

  useEffect(() => {
    // 새로고침 시에는 알림을 표시하지 않음
    if (localSelectedUserIds.length > 0) {
      grantPermission();
    }
  }, [localSelectedUserIds]);

  const grantPermission = async () => {
    const userIdsToGrantPermission =
      selectedUserIds.length > 0 ? selectedUserIds : localSelectedUserIds;

    if (userIdsToGrantPermission.length === 0) {
      return;
    }

    const newRole = window.confirm('권한을 부여하시겠습니까?');
    if (!newRole) return;

    const requestData = {
      userIds: userIdsToGrantPermission,
    };

    try {
      const response = await axios.post('/api/management/user/changeRole', requestData, {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
    
      if (response.data.error) {
        console.error('서버 응답 오류:', response.data.error);
        alert('서버 응답 오류');
      } else {
        const recognizeAdmin = response.data.data.recognizeAdmin;
    
        if (recognizeAdmin) {
          alert('권한 부여 성공!!');
          setSelectedUserIds([]);
        } else {
          alert('관리자 권한 부여 실패');
        }
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('에러!!');
    }
  };

  return (
    <div>
      {users && users.map((user) => (
        <div key={user.id}>
        </div>
      ))}
      <button
        onClick={() => setLocalSelectedUserIds(selectedUserIds)} 
        style={{
          float: 'right',
          margin: '30px 35px 35px 0',
          color: '#ffffff',
          backgroundColor: '#292b35',
          marginLeft: 'auto',
        }}
      >
        권한 부여
      </button>
    </div>
  );
};

export default PermissionButton;
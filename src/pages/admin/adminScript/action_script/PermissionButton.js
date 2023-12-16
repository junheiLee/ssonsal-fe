import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.post('/api/management/user/changeRole', requestData);

      if (response.status === 200) {
        alert('권한 부여 성공!!');
        setSelectedUserIds([]);
      } else {
        alert('서버 응답 오류');
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
          {/* 추가 필요한 사용자 정보는 여기에 렌더링 */}
        </div>
      ))}
      <button
        onClick={() => setLocalSelectedUserIds(selectedUserIds)} // 이 부분이 수정된 부분
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
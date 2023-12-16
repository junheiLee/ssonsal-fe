import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteGamesButton = ({ selectedGameIds, onChange, onGamesDeleted }) => {
  // 각 게임에 대한 선택 여부를 관리하는 상태
  const [gameSelection, setGameSelection] = useState([]);

  useEffect(() => {
    // Whenever selectedGameIds change, update the gameSelection state
    setGameSelection(selectedGameIds.reduce((acc, gameId) => {
      acc[gameId] = true;
      return acc;
    }, {}));
  }, [selectedGameIds]);

  const handleGameCheckboxChange = (gameId) => {
    setGameSelection((prevGameSelection) => ({
      ...prevGameSelection,
      [gameId]: !prevGameSelection[gameId],
    }));
  };

  const deleteGames = async () => {
    const selectedGames = Object.keys(gameSelection).filter((gameId) => gameSelection[gameId]);

    if (selectedGames.length === 0) {
      alert('선택된 게임이 없습니다');
      return;
    }

    const shouldDelete = window.confirm('삭제 하시겠습니까?');
    if (!shouldDelete) return;

    const requestData = {
      gameIds: selectedGames.map(Number),
    };

    try {
      const response = await axios.post('/api/management/game/management', requestData);

      console.log('서버 응답:', response);

      if (response && response.status === 200) {
        alert('삭제 성공');
        onGamesDeleted(); // Trigger a callback to inform the parent component about the deletion
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('에러!!');
    }
  };

  return (
    <div>
      <button
        className="delete-Games"
        style={{ float: 'right', margin: '30px 35px 35px 0', color: '#ffffff', backgroundColor: '#292b35' }}
        onClick={deleteGames}
      >
        글 삭제
      </button>
      {/* 각 게임에 대한 체크박스 렌더링 */}
      {selectedGameIds.length > 0 && (
        <div>
          {selectedGameIds.map((gameId) => (
            <input
              key={gameId}
              type="checkbox"
              checked={gameSelection[gameId] || false}
              onChange={() => handleGameCheckboxChange(gameId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteGamesButton;
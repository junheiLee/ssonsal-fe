import React, { useState, useEffect } from 'react';

const Memo = () => {
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');

  useEffect(() => {

    const storedMemos = localStorage.getItem('memos');
    if (storedMemos) {
      setMemos(JSON.parse(storedMemos));
    }
  }, []);

  const addMemo = () => {
    if (newMemo.trim() !== '') {
      const updatedMemos = [...memos, newMemo];
      setMemos(updatedMemos);
      setNewMemo('');

      localStorage.setItem('memos', JSON.stringify(updatedMemos));
    }
  };
  
    return (
        <div className="container mt-5">
          <h2>관리자 메모지</h2>
          
          <div className="col-md-6" style={{ marginTop: '30px' }}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="메모를 입력하세요"
                  value={newMemo}
                  onChange={(e) => setNewMemo(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addMemo}>
                  추가
                </button>
             
            </div>
          </div>
      
            <div className="col-md-6">
              <ul className="list-group">
                {memos.map((memo, index) => (
                  <li className="list-group-item" key={index}>
                    {memo}
                  </li>
                ))}
              </ul>
            </div>
         
        </div>
      );
    };
    
    export default Memo;
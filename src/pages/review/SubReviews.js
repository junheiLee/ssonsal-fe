import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SoccerBalls from './soccerBall';
import {
  containerStyle,
  headerCellStyle,
  tableCellStyle,
  tableStyle,
  theadStyle,
} from './styles';

function SubReviews() {
  const { userId } = useParams();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setReviewId] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reviews/sub/${userId}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleReport = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReviewId('');
    setReason('');
  };

  const handleConfirmReport = async () => {
    
    try {
      // Send a POST request to the server with the report data
      await axios.post('/reports', {
        reviewId: selectedItem.reviewId,
        reason,
      });
      // Log success or perform any other actions after successful report
      console.log('Report submitted successfully!');

      // Close the modal after handling the report
      setIsModalOpen(false);

      // Reset input fields
      setReviewId('');
      setReason('');
    } catch (error) {
      console.error('Error submitting report:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const tableRows = data.map((item) => (
    <tr key={item.id} style={{ backgroundColor: item.reportCode === 1 ? 'red' : 'white' }}>
    <td style={tableCellStyle}>{item.name}</td>
      <td style={tableCellStyle}>
        <SoccerBalls score={item.mannerScore} />
      </td>
      <td style={tableCellStyle}>
        <SoccerBalls score={item.skillScore} />
      </td>
      <td style={tableCellStyle}>{item.comment}</td>
      <td style={tableCellStyle}>{item.createdAt}</td>
      <td style={tableCellStyle}>
        <button onClick={() => handleReport(item)}>신고하기</button>
      </td>
    </tr>
  ));

  return (
    <div style={{ ...containerStyle, overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={headerCellStyle}>작성자</th>
            <th style={headerCellStyle}>매너점수</th>
            <th style={headerCellStyle}>스킬점수</th>
            <th style={headerCellStyle}>한줄평</th>
            <th style={headerCellStyle}>작성일</th>
            <th style={headerCellStyle}>신고하기</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>신고하기</p>
            <input
              type="hidden"
              value={selectedItem.reviewId}
              onChange={(e) => setReviewId(e.target.value)}
            />
            <label>
              리뷰 작성자: {selectedItem.name}
            </label>
            <label>
              리뷰 내용: {selectedItem.comment}
            </label>
            <label>
              신고 사유:
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </label>
            <button onClick={handleConfirmReport}>확인</button>
            <button onClick={handleCloseModal}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubReviews;

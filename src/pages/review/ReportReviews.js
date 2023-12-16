import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  containerStyle,
  headerCellStyle,
  tableCellStyle,
  tableStyle,
  theadStyle,
} from './styles';

function ReportReview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reports`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (reportId) => {
    try {
      // Send a DELETE request to the server
      await axios.put(`/reports/${reportId}/update?reportCode=1`);

      // Fetch the updated data after deletion
      const response = await axios.get(`/reports`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error deleting report:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      // Send a DELETE request to the server to delete the review
      await axios.put(`/reviews/${reviewId}/update?deleteCode=1`);
  
      // Fetch the updated data after deletion
      const response = await axios.get(`/reports`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error deleting review:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const getStatusText = (reportCode) => (reportCode === 0 ? '처리전' : '처리완료');

  // Sort the data so that items with reportCode 0 appear first
  const sortedData = [...data].sort((a, b) => a.reportCode - b.reportCode);

  const tableRows = sortedData.map((item) => (
    <tr key={item.id} style={{ backgroundColor: item.reportCode === 1 ? 'lightgray' : 'white' }}>
      <td style={{ ...tableCellStyle, color: item.reportCode === 1 ? 'gray' : 'black' }}>
        {item.id}
      </td>
      <td style={{ ...tableCellStyle, color: item.reportCode === 1 ? 'gray' : 'black' }}>
        {item.review}
      </td>
      <td style={{ ...tableCellStyle, color: item.reportCode === 1 ? 'gray' : 'black' }}>
        {item.reason}
      </td>
      <td style={{ ...tableCellStyle, color: item.reportCode === 1 ? 'gray' : 'black' }}>
        {item.createdAt}
      </td>
      <td style={{ ...tableCellStyle, color: item.reportCode === 1 ? 'gray' : 'black' }}>
        {item.modifiedAt}
      </td>
      <td style={{ ...tableCellStyle, color: item.reportCode === 1 ? 'gray' : 'black' }}>
        {getStatusText(item.reportCode)}
      </td>
      <td style={tableCellStyle}>
        {item.reportCode !== 1 ? (
        <button onClick={() => handleDelete(item.id)}>처리</button>
        ) : (
        <span>처리완료</span>
         )}
      </td>
      <td style={tableCellStyle}>
      {item.reviewDeleteCode !== 1 ? (
      <button onClick={() => handleReviewDelete(item.reviewId)}>삭제</button>
       ) : (
       <span>삭제완료</span>
         )}
      </td>
    </tr>
  ));

  return (
    <div style={{ ...containerStyle, overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={headerCellStyle}>신고번호</th>
            <th style={headerCellStyle}>리뷰내용</th>
            <th style={headerCellStyle}>신고사유</th>
            <th style={headerCellStyle}>작성일</th>
            <th style={headerCellStyle}>수정일</th>
            <th style={headerCellStyle}>처리여부</th>
            <th style={headerCellStyle}>처리</th>
            <th style={headerCellStyle}>리뷰삭제</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default ReportReview;

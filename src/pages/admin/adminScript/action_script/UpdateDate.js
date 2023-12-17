import React from 'react';
import axios from 'axios';

const SelectMonth = ({ setSelectedMonth, setStatsData, setMonthlyDailyStats }) => {
  const updateDate = async (e) => {
    const month = e.target.value;
  
    try {
      const formattedDate = new Date(2023, month, 1).toISOString(); 
      console.log("선택한 달:", month);
      console.log("포맷된 날짜:", formattedDate);
  
      const response = await axios.post('/api/management/stats/changeMonth', { selectedDate: formattedDate });
      console.log("서버 응답:", response);
  
      if (response.status === 200) {
        setSelectedMonth(month);
        const newStatsData = response.data.data.monthStats || {};
  const newMonthlyDailyStats = response.data.data.monthlyDailyStats || {};
  
          setStatsData(newStatsData);
         setMonthlyDailyStats(newMonthlyDailyStats);

         console.log("변경된 값 StatsData:", newStatsData);
         console.log("변경된 값 MonthlyDailyStats:", newMonthlyDailyStats);

      } else {
        console.error('달 업데이트 실패, 서버로 돌아가세요:', response);
      }
    } catch (error) {
      console.error('달 업뎅이트 에러:', error);
    }
  };

  return (
    <div>
      <label htmlFor="SelectMonth">월 선택:</label>
      <select className="form-control" id="SelectMonth" onChange={updateDate}>
        <option>현재 달</option>
        <option value="1">1월</option>
        <option value="2">2월</option>
        <option value="3">3월</option>  
        <option value="4">4월</option>
        <option value="5">5월</option>
        <option value="6">6월</option>
        <option value="7">7월</option>
        <option value="8">8월</option>
        <option value="9">9월</option>
        <option value="10">10월</option>
        <option value="11">11월</option>
        <option value="12">12월</option>
      </select>
    </div>
  );
};

export default SelectMonth;
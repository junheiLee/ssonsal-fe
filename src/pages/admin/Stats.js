import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header2 from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import Head2 from './adminScript/Head';
import StatsScript from './adminScript/fix_script/StatsScript';
import '../../styles/admin/AdminMain.css';


const Stats = () => {
  const [statsData, setStatsData] = useState({});
  const [statsDailyData, setMonthlyDailyStats] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmedGameStatsMonth, setConfirmedGameStatsMonth] = useState([]);
  const [cancelledGameStatsMonth, setCancelledGameStatsMonth] = useState([]);
  const [totalGameStatsMonth, setTotalGameStatsMonth] = useState([]);
  const [confirmedGameStatsData, setConfirmedGameStatsData] = useState([]);
  const [cancelledGameStatsData, setCancelledGameStatsData] = useState([]);

  const fetchData = async (selectedDate) => {
    try {
      const response = await axios.post('/api/admin/stats', { selectedDate });
      if (response.status === 200) {
        const { monthStats, monthlyDailyStats } = response.data.data;
  
        setStatsData(monthStats || {});
        setMonthlyDailyStats(monthlyDailyStats || {});
  
        const confirmedStatsData = monthStats ? monthStats.confirmedGameCount : 0;
        const cancelledStatsData = monthStats ? monthStats.cancelledGameCount : 0;
        const totalStatsData = confirmedStatsData + cancelledStatsData;
  
        setConfirmedGameStatsMonth(confirmedStatsData);
        setCancelledGameStatsMonth(cancelledStatsData);
        setTotalGameStatsMonth(totalStatsData);

        setConfirmedGameStatsData(Object.keys(monthlyDailyStats || {}).map(date => {
          const stats = monthlyDailyStats[date];
          return stats && stats.confirmedGameCount !== undefined ? stats.confirmedGameCount : 0;
        }));
  
        setCancelledGameStatsData(Object.keys(monthlyDailyStats || {}).map(date => {
          const stats = monthlyDailyStats[date];
          return stats && stats.cancelledGameCount !== undefined ? stats.cancelledGameCount : 0;
        }));
      } else {
        console.error('데이터를 불러오는 중 에러 발생:', response);
      }
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();
    fetchData(formattedCurrentDate);
  }, []);

  const updateDate = async (e) => {
    const month = e.target.value;
    const formattedDate = new Date(2023, month, 1).toISOString();

    setSelectedMonth(month);

    await fetchData(formattedDate);
  };
  return (
    <>
      <Head2 />
      <Header2 />
      <LeftPanel />
      <div id="right-panel" className="right-panel">
        <div className="breadcrumbs"></div>

        <div className="content">
          <div>
            <div>
              <label htmlFor="SelectMonth">월 선택:</label>
              <select className="form-control" id="SelectMonth" onChange={updateDate}>
              <option value="" disabled={selectedMonth !== ''}>현재 달</option>
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
          </div>

          <div className="animated fadeIn" style={{ paddingTop: '50px' }}>
            <div className="row" style={{ justifyContent: 'space-evenly' }}>
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="stat-widget-five">
                      <div className="stat-content">
                        <div className="text-left dib">
                          <div className="stat-heading">이번 달 매치된 총 경기</div>
                          <div className="stat-text">
                            <span className="count">
  {confirmedGameStatsMonth !== undefined
    ? confirmedGameStatsMonth
    : '데이터 없음'}
</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 이번달 취소된 총 매치 */}
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="stat-widget-five">
                      <div className="stat-icon dib flat-color-2"></div>
                      <div className="stat-content">
                        <div className="text-left dib">
                          <div className="stat-heading">이번달 취소된 총 매치</div>
                          <div className="stat-text">
                            <span className="count">
  {cancelledGameStatsMonth !== undefined
    ? cancelledGameStatsMonth
    : '데이터 없음'}
</span>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 총 게시글 수 */}
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="stat-widget-five">
                      <div className="stat-icon dib flat-color-2"></div>
                      <div className="stat-content">
                        <div className="text-left dib">
                          <div className="stat-heading">총 게시글 수</div>
                          <div className="stat-text">
                            <span className="count">
  {totalGameStatsMonth !== undefined
    ? totalGameStatsMonth
    : '데이터 없음'}
</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 매치 통계 차트 */}
          <div style={{ width: '80%', height: '40%', margin: 'auto' }}>
            <div className="card" style={{ marginRight: '50px' }}>
              <div className="card-body">
              <h4 className="mb-7">{selectedMonth !== '' ? `${selectedMonth}월 매치 통계` : '현재 달 매치 통계'}</h4>
             
                <StatsScript
  confirmedGameStatsData={confirmedGameStatsData}
  cancelledGameStatsData={cancelledGameStatsData}
/>
              
              </div>
            </div>
          </div>

          <div className="clearfix"></div>
        </div>
        
        <AdminFooter />
      </div>
    </>
  );
};

export default Stats;
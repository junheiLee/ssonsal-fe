import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import StatsScript from './adminScript/fix_script/StatsScript';
import '../../styles/admin/AdminMain.css';
import { useNavigate } from 'react-router-dom';


const Stats = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({});
  const [statsDailyData, setMonthlyDailyStats] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmedGameStatsMonth, setConfirmedGameStatsMonth] = useState([]);
  const [cancelledGameStatsMonth, setCancelledGameStatsMonth] = useState([]);
  const [totalGameStatsMonth, setTotalGameStatsMonth] = useState([]);
  const [confirmedGameStatsData, setConfirmedGameStatsData] = useState([]);
  const [cancelledGameStatsData, setCancelledGameStatsData] = useState([]);

  const formatISODate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1
    const formattedMonth = `${month < 10 ? '0' : ''}${month}.${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    return formattedMonth;
  };
  const [isoDates, setIsoDates] = useState([]);

  const fetchData = async (selectedDate) => {
    try {
      const response = await axios.post('/api/management/stats/changeMonth', { selectedDate });
      if (response.status === 200) {
        const { monthStats, monthlyDailyStats } = response.data.data;
        console.log('Confirmed Game Stats Data:', confirmedGameStatsData);
        console.log('Cancelled Game Stats Data:', cancelledGameStatsData);

        setStatsData(monthStats || {});
        setMonthlyDailyStats(monthlyDailyStats || {});

        console.log(setMonthlyDailyStats);

        const confirmedStatsData = monthStats ? monthStats.confirmedGameCount : 0;
        const cancelledStatsData = monthStats ? monthStats.cancelledGameCount : 0;
        const totalStatsData = monthStats ? monthStats.totalGameCount : 0;

        setConfirmedGameStatsMonth(confirmedStatsData);
        setCancelledGameStatsMonth(cancelledStatsData);
        setTotalGameStatsMonth(totalStatsData);

        const dates = Object.keys(monthlyDailyStats || {});
        const isoDates = dates.map(date => formatISODate(date));

        setIsoDates(isoDates);

        setConfirmedGameStatsData(Object.keys(monthlyDailyStats || {}).map(date => {
          const stats = monthlyDailyStats[date];
          const confirmedGameCount = stats && stats.confirmedGameCount !== undefined ? stats.confirmedGameCount : 0;
          console.log(`Date: ${date}, Confirmed Game Count: ${confirmedGameCount}`);
          return confirmedGameCount;
        }));

        setCancelledGameStatsData(Object.keys(monthlyDailyStats || {}).map(date => {
          const stats = monthlyDailyStats[date];
          const cancelledGameCount = stats && stats.cancelledGameCount !== undefined ? stats.cancelledGameCount : 0;
          console.log(`Date: ${date}, Cancelled Game Count: ${cancelledGameCount}`);
          return cancelledGameCount;
        }));

      } else {
        console.error('데이터를 불러오는 중 에러 발생:', response);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorCode = error.response.data.code;

        if (status === 401 && errorCode === 'USER_NOT_AUTHENTICATION') {
          alert("로그인이 필요합니다");
          navigate('/login', { replace: true });
        } else if (status === 403 && errorCode === 'ADMIN_AUTH_FAILED') {
          alert("관리자 권한이 없습니다");
          navigate('/login', { replace: true });
        }
      }
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
      <Header />
      <LeftPanel />
      <div id="right-panel" className="right-panel">

        <div className="breadcrumbs">

          <div className="row m-0">
            <div className="col-sm-8">
              <div className="page-header float-right">
                <ol className="breadcrumb text-right">
                  <li>SSonsal</li>
                  <li className="active">통계</li>
                </ol>
              </div>
            </div>
          </div>

        </div>

        <div className="content">
          <div>
            <div>
              <label htmlFor="SelectMonth" style={{ fontSize: '20px',marginBottom: '5px' }}>달 선택</label>
              <select className="form-control" id="SelectMonth" onChange={updateDate} style={{ fontSize: '15px', height: '42px', width: '100%', textAlign: 'center' }}>
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
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="stat-widget-five">

                      <div class="stat-icon">
                        <img
                          className='img-fluid'
                          src={process.env.PUBLIC_URL + '/assets/confirmGame.png'}
                          alt="Camp Nou"
                          style={{ width: '100%', height: 'auto', maxHeight: '70px' }}
                        />

                      </div>
                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading">이달 매치 수</div>
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
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="stat-widget-five">

                      <div class="stat-icon">
                        <img
                          className='img-fluid'
                          src={process.env.PUBLIC_URL + '/assets/cancelled.png'}
                          alt="Camp Nou"
                          style={{ width: '100%', height: 'auto', maxHeight: '70px' }}
                        />

                      </div>
                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading">이달 취소된 매치 수</div>
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
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="stat-widget-five">

                      <div class="stat-icon">
                        <img
                          className='img-fluid'
                          src={process.env.PUBLIC_URL + '/assets/match.png'}
                          alt="Camp Nou"
                          style={{ width: '100%', height: 'auto', maxHeight: '70px' }}
                        />

                      </div>
                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading">이달 총 매치글 수</div>
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

            {/* 매치 통계 차트 */}
            <div style={{ width: '90%', height: '20%', margin: 'auto',paddingTop: '30px' }}>
              <div className="card" style={{ marginRight: '50px' }}>
                <div className="card-body">
                  <h4 className="mb-7">{selectedMonth !== '' ? `${selectedMonth}월 매치 통계` :  '이달 매치 통계'}</h4>

                  <StatsScript
                    key={selectedMonth} 
                    isoDates={isoDates}
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
      </div>
    </>
  );
};

export default Stats;
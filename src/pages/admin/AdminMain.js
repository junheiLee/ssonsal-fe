import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Header from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import '../../styles/admin/AdminMain.css';
import Memo from '../admin/adminScript/fix_script/Memo';
import Calendar from '../admin/adminScript/fix_script/Calendar'
import { useNavigate } from 'react-router-dom';
import { getCookie, doLogOut } from '../../services/UserService';
 import LogOut  from '../../store/LoginUser';


const AdminMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    console.log("useEffect 실행");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/main",
      {
        headers: {
          "Content-Type": "application/json",
          ssonToken: getCookie("token")
        },
      });
      const data = response.data.data;
      setStatsData(data.dailyStats);
      console.log(response.data + "aa");
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
    }
  };

  const handleLogout = () => {
    
    localStorage.removeItem('memos');
 
   doLogOut("token");
   dispatch(LogOut());
   navigate("../../user/sign-in");
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
                  <li className="active">메인</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
        <div class="content">

          <div class="animated fadeIn">


            <div class="row">
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="stat-widget-five">

                      <div class="stat-icon">

                        <img
                          className='img-fluid'
                          src={process.env.PUBLIC_URL + '/assets/allUser.png'}
                          alt="Camp Nou"
                          style={{ width: '100%', height: 'auto', maxHeight: '70px' }}
                        />
                      </div>

                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading">전체 회원 수</div>
                          <div class="stat-text">
                            {statsData && statsData.totalUserCount !== undefined && (
                              <span class="count">
                                <p>{statsData.totalUserCount}</p>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="stat-widget-five">
                      <div class="stat-icon">
                        <img
                          className='img-fluid'
                          src={process.env.PUBLIC_URL + '/assets/newUser.png'}
                          alt="Camp Nou"
                          style={{ width: '80%', height: 'auto', maxHeight: '70px' }}
                        />

                      </div>
                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading">신규 가입자</div>
                          <div class="stat-text">
                            {statsData && statsData.newUserCount !== undefined && (
                              <span class="count">
                                <p>{statsData.newUserCount}</p>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                          <div class="stat-heading">예정 매치수</div>
                          <div class="stat-text">
                            {statsData && statsData.todayGameCount !== undefined && (
                              <span class="count">
                                <p>{statsData.todayGameCount}</p>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="stat-widget-five">

                      <div class="stat-icon">
                        <img
                          className='img-fluid'
                          src={process.env.PUBLIC_URL + '/assets/post.png'}
                          alt="Camp Nou"
                          style={{ width: '100%', height: 'auto', maxHeight: '70px' }}
                        />

                      </div>
                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading">올라온 매치글 수</div>
                          <div class="stat-text">
                            {statsData && statsData.newPostCount !== undefined && (
                              <span class="count">
                                <p>{statsData.newPostCount}</p>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">

              <div className="col-lg-6">

                <Memo />
              </div>
              <div className="col-lg-6">

                <Calendar />
              </div>
            </div>
          </div>


        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default AdminMain;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header2 from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import Head2 from './adminScript/Head';
import '../../styles/admin/AdminMain.css';
import Memo from '../admin/adminScript/fix_script/Memo';
import Calendar from '../admin/adminScript/fix_script/Calendar'

const AdminMain = () => {
  const [statsData, setStatsData] = useState(null); 

  useEffect(() => {
    console.log("useEffect 실행");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/main");
      const data = response.data.data;
      setStatsData(data);
      console.log(response.data + "aa");
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };


  return (
    <>
      <Head2 />
      <Header2 />
      <LeftPanel />
      <div id="right-panel" className="right-panel">
        <div className="breadcrumbs">
          <div className="breadcrumbs-inner">
            <div className="row m-0">
              <div className="col-sm-4">
                <div className="page-header float-left">
                  <div className="page-title">
                    <h1>SSonsal</h1>
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="page-header float-right">
                  <div className="page-title">
                    <ol className="breadcrumb text-right">
                      <li>SSonsal</li>
                      <li className="active">메인</li>
                    </ol>
                  </div>
                </div>
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

                      <div class="stat-content">
                        <div class="text-left dib">
                          <div class="stat-heading" >전체 회원 수</div>
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
                      <div class="stat-icon dib flat-color-2">

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
                      <div class="stat-icon dib flat-color-3">

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
import React from 'react';
import '../../styles/game/GameDetail.css'; // React 파일 위치에 따라 상대 경로 조절
import { SubService } from '../../service/SubService';

const GameDetail = () => {
  const {
    teamSubList: hometeamSubList,
    getSubAccept: getHometeamSubAccept,
    getSubReject: getHometeamSubReject,
    getSubApply: getHometeamSubApply, // 변경된 함수명
  } = SubService(1); // 홈팀 아이디

  const {
    teamSubList: awayteamSubList,
    getSubAccept: getAwayteamSubAccept,
    getSubReject: getAwayteamSubReject,
    getSubApply: getAwayteamSubApply, // 변경된 함수명
  } = SubService(1); // 어웨이팀 아이디

  return (
    <div>

      {/* ***** Welcome Area Start ***** */}
      <div className="welcome-area container-fluid detailpage" id="welcome">

        <div className="container">
          <div className="row">
            {/* ***** Testimonials Item Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                HomeTeam
                <div className="teamInfo">
                  <div>
                    <img src="../../images/teammark.png" alt="Team Mark" />
                  </div>
                  <h2>코알라 FC</h2>
                  등급 ??? / 한줄 소개 등
                </div>
                <div className="subList">
                  <h5>
                    <span>용병 신청 리스트</span>
                    <span>
                      {hometeamSubList?.map(item => (
                        <span key={item.applicantId}>{item.applicantId}</span>
                      ))}
                    </span>
                  </h5>
                  <ul>
                    {hometeamSubList && Array.isArray(hometeamSubList) && hometeamSubList.length > 0 ? (
                      hometeamSubList.map(item => (
                        <li key={item.applicantId}>
                          <div>{item.nickName}</div>
                          <div><button onClick={() => getHometeamSubAccept(1, item.applicantId)}>승인</button></div>
                          <div><button onClick={() => getHometeamSubReject(1, item.applicantId)}>거절</button></div>
                        </li>
                      ))
                    ) : (
                      <li>No data available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* ***** Testimonials Item End ***** */}

            {/* ***** Testimonials Item Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="placeInfo">
                <b>장소</b>
                <p>2023.11.17 (16 : 30)</p>
              </div>
              <div className="vsFormat">
                <h1>VS</h1>
                <p>5 vs 5</p>
              </div>
              <div className="applybtn">
                <button onClick={() => getHometeamSubApply(1,11)}>Hometeam<br />용병으로 참여하기</button>
                <button onClick={() => getAwayteamSubApply(1)}>Awayteam<br />용병으로 참여하기</button>
              </div>
            </div>
            {/* ***** Testimonials Item End ***** */}

            {/* ***** Testimonials Item Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                AwayTeam
                <div className="teamInfo">
                  <div>
                    <img src="../../images/shark.png" alt="Team Shark" />
                  </div>
                  <h2>상어 FC</h2>
                  등급 ??? / 한줄 소개 등
                </div>
                <div className="subList">
                  <h5>
                    <span>용병 신청 리스트</span>
                    <span>1 / 3</span>
                  </h5>
                  <ul>
                    {awayteamSubList && Array.isArray(awayteamSubList) && awayteamSubList.length > 0 ? (
                      awayteamSubList.map(item => (
                        <li key={item.applicantId}>
                          <div>{item.nickName}</div>
                          <div><button onClick={() => getAwayteamSubAccept(item.applicantId)}>승인</button></div>
                          <div><button onClick={() => getAwayteamSubReject(item.applicantId)}>거절</button></div>
                        </li>
                      ))
                    ) : (
                      <li>No data available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* ***** Testimonials Item End ***** */}
          </div>
        </div>
      </div>
      {/* ***** Welcome Area End ***** */}

      {/* jQuery */}
      <script src="/js/jquery-2.1.0.min.js"></script>

      {/* Bootstrap */}
      <script src="/js/popper.js"></script>
      <script src="/js/bootstrap.min.js"></script>

      {/* Plugins */}
      <script src="/js/scrollreveal.min.js"></script>
      <script src="/js/waypoints.min.js"></script>
      <script src="/js/jquery.counterup.min.js"></script>
      <script src="/js/imgfix.min.js"></script>

      {/* Global Init */}
      <script src="/js/custom.js"></script>

    </div>
  );
};

export default GameDetail;

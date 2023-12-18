import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import { useNavigate } from 'react-router-dom';
// import 'normalize.css';
// import 'pixeden-stroke-7-icon/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import DeleteGamesButton from './adminScript/action_script/DeleteGamesButton';
import '../../styles/admin/AdminMain.css';

const Game = () => {
  const navigate = useNavigate();
  const [gameList, setGameList] = useState([]);
  const [selectedGameIds, setSelectedGameIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const gamesPerPage = 10; // 페이지당 게임 수
  const pagesVisited = pageNumber * gamesPerPage;
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/game");
      setGameList(response.data.data.gameList);
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

  const pageCount = Math.ceil(gameList.length / gamesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const getStatusText = (status) => {
    return status === 0 ? '매치 완료' : '매치 대기중';
  };

  const handleRowCheckboxChange = (gameId) => {
    setSelectedGameIds((prevSelectedGameIds) => {
      if (prevSelectedGameIds.includes(gameId)) {
        return prevSelectedGameIds.filter((id) => id !== gameId);
      } else {
        return [...prevSelectedGameIds, gameId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedGameIds((prevSelectedGameIds) => {
      if (prevSelectedGameIds.length === gameList.length) {
        // If all games are currently selected, unselect all
        return [];
      } else {
        // If not all games are selected, select all
        return gameList.map((game) => game.id);
      }
    });
  };

  const displayGames = gameList
    .slice(pagesVisited, pagesVisited + gamesPerPage)
    .map((game) => (
      <tr key={game.id}>
        <td>
          <input
            type="checkbox"
            checked={selectedGameIds.includes(game.id)}
            onChange={() => handleRowCheckboxChange(game.id)}
          />
        </td>
        <td>{new Date(game.createdAt).toLocaleDateString()}</td>
        <td>{game.writer}</td>
        <td>{game.stadium}</td>
        <td>{new Intl.DateTimeFormat('ko-KR', 
        { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })
        .format(new Date(game.schedule))}</td>
        <td>{game.vsFormat} 명</td>
        <td>{getStatusText(game.matchStatus)}</td>
      </tr>
    ));

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
                      <li className="active">게임 관리</li>
                    </ol>                
                </div>
              </div>
            </div>
          
        </div>
        <div>
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">게임 관리</strong>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>등록 일자</th>
                            <th>등록자</th>
                            <th>경기장</th>
                            <th>매치 시간</th>
                            <th>필요 인원</th>
                            <th>상태</th>
                          </tr>
                        </thead>
                        <tbody>{displayGames}</tbody>
                      </table>
                      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={pageNumber === 0 ? 'pagination__link--disabled' : 'pagination__link'}
        nextLinkClassName={pageNumber === pageCount - 1 ? 'pagination__link--disabled' : 'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
                     <DeleteGamesButton
        selectedGameIds={selectedGameIds}
        onChange={handleSelectAll}
        onGamesDeleted={fetchData}
      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default Game;
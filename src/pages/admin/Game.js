import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header2 from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import Head2 from './adminScript/Head';
// import 'normalize.css';
// import 'pixeden-stroke-7-icon/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import DeleteGamesButton from './adminScript/action_script/DeleteGamesButton';
import '../../styles/admin/AdminMain.css';

const Game = () => {
  const [gameList, setGameList] = useState([]);
  const [selectedGameIds, setSelectedGameIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const gamesPerPage = 10; // 페이지당 게임 수
  const pagesVisited = pageNumber * gamesPerPage;
  // const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    // adminCheck();
  }, [pageNumber]);

  // const adminCheck = async () => {
  //   try {
  //     // const response = await axios.get("요청경로");
  //     if(response.ok){
  //       fetchData();
  //     }
  //   } catch (error) {
  //     console.error('데이터를 불러오는 중 에러 발생:', error);
  //     // error.status 403{
  //       // navigate('/*', { replace: true });
  //     // }
  //   }
  // };


  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/game");
      setGameList(response.data.data.gameList);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };

  const pageCount = Math.ceil(gameList.length / gamesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
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
        <td>{formatDate(game.createdAt)}</td>
        <td>{game.writer}</td>
        <td>{game.stadium}</td>
        <td>{game.schedule}</td>
        <td>{game.vsFormat} 명</td>
        <td>{getStatusText(game.matchStatus)}</td>
      </tr>
    ));

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
                      <li className="active">게임 관리</li>
                    </ol>
                  </div>
                </div>
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
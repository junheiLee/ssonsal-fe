import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header2 from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import Head2 from './adminScript/Head';
import PermissionButton from './adminScript/action_script/PermissionButton';
import EmailPublishButton from './adminScript/action_script/EmailPublishButton';
import '../../styles/admin/AdminMain.css';

const User = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedUserIds]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/user");
     // if (response.data.error === 'USER_NOT_AUTHENTICATION') {
     //   console.error('관리자가 아닙니다:', response.data.error);
     //   history.push('/error'); 
     //  return;
     // }
      setUserList(response.data.data.userList);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };


  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      const newSelectedUserIds = prevSelectedUserIds.includes(userId)
        ? prevSelectedUserIds.filter((id) => id !== userId)
        : [...prevSelectedUserIds, userId];

      return newSelectedUserIds;
    });
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = userList.slice(startIndex, endIndex);


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
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <strong className="card-title">유저 관리</strong>
                    <EmailPublishButton selectedUserIds={selectedUserIds} />
                  </div>
                  <div className="card-body">
                    <table id="bootstrap-data-table" className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>                         
                          </th>
                          <th>이름</th>
                          <th>닉네임</th>
                          <th>성별</th>
                          <th>나이</th>
                          <th>가입 날짜</th>
                          <th>관리자 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageData.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(user.id)}
                                checked={selectedUserIds.includes(user.id)}
                                disabled={user.role === 1}
                              />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.nickname}</td>
                            <td>{user.gender === 0 ? '여성' : '남성'}</td>
                            <td>{user.age}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>{user.role === 1 ? '관리자' : '일반유저'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      <ReactPaginate
                        previousLabel={'이전'}
                        nextLabel={'다음'}
                        pageCount={Math.ceil(userList.length / rowsPerPage)}
                        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                        containerClassName={'pagination'}
                        previousLinkClassName={'pagination__link'}
                        nextLinkClassName={'pagination__link'}
                        disabledClassName={'pagination__link--disabled'}
                        activeClassName={'pagination__link--active'}
                      />
                    </div>
                    <PermissionButton
        users={currentPageData}
        selectedUserIds={selectedUserIds}
        setSelectedUserIds={setSelectedUserIds}
      />
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

export default User;
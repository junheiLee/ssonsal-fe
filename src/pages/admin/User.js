import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import PermissionButton from './adminScript/action_script/PermissionButton';
import EmailPublishButton from './adminScript/action_script/EmailPublishButton';
import '../../styles/admin/AdminMain.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../services/UserService';

const User = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('/api/admin/user', {
        headers: {
          'Content-Type': 'application/json',
          ssonToken: getCookie('token'),
        },
      });
      
      const { data } = response;
      setUserList(data.data.userList);
    } catch (error) {
      if (error.response) {
        const { status, data: { code: errorCode } } = error.response;

        if (status === 401 && errorCode === 'USER_NOT_AUTHENTICATION') {
          alert('로그인이 필요합니다');
          navigate('/login', { replace: true });
        } else if (status === 403 && errorCode === 'ADMIN_AUTH_FAILED') {
          alert('관리자 권한이 없습니다');
          navigate('/login', { replace: true });
        }
      }
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
      <Header />
      <LeftPanel />
      <div id="right-panel" className="right-panel">
        <div className="breadcrumbs">         
            <div className="row m-0">
              <div className="col-sm-8">
                <div className="page-header float-right">       
                    <ol className="breadcrumb text-right">
                      <li>SSonsal</li>
                      <li className="active">유저 관리</li>
                    </ol>                
                </div>
              </div>
            </div>         
        </div>
        <div>
        <div className="content">
          <div className="animated fadeIn">
            
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <strong className="card-title">유저 관리</strong>
                    <EmailPublishButton  />
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
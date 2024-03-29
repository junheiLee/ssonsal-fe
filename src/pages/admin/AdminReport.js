import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header from './adminScript/AdminHeader';
import LeftPanel from './adminScript/LeftPanel';
import AdminFooter from './adminScript/AdminFooter';
import '../../styles/admin/AdminMain.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../services/UserService';



const AdminReport = () => {
    const navigate = useNavigate();
    const [reportReviews, setReportReviews] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const reviewsPerPage = 10; // 페이지당 게임 수
    const pagesVisited = pageNumber * reviewsPerPage;
    
    useEffect(() => {
      getReportReview();
    }, [pageNumber]);

    const getReportReview = async () => {
      try {
        const response = await axios.get("/api/reports", {
          headers: {
            "Content-Type": "application/json",
            ssonToken: getCookie("token")
          },
        });
          console.log(response);
          setReportReviews(response.data.data);
      } catch (error) {
       
        if (error.response) {
          const status = error.response.status;
          const errorCode = error.response.data.code;
  
         if (status === 403 && errorCode === 'ADMIN_AUTH_FAILED') {
            alert("관리자 권한이 없습니다");
            navigate('/*', { replace: true });
          }
        }
      }
    };


    const updateReview = async (id,reviewId) => {
      try {
        const response = await axios.patch(
          `/api/reports/${id}`,reviewId,
          {
            headers: {
              "Content-Type": "application/json",
              "ssonToken": getCookie("token")
            },
          }
        );
        alert('삭제 성공!');
        getReportReview();
      } catch (error) {
       
        if (error.response) {
          const status = error.response.status;
          const errorCode = error.response.data.code;
  
         if (status === 403 && errorCode === 'ADMIN_AUTH_FAILED') {
            alert("관리자 권한이 없습니다");
            navigate('/*', { replace: true });
          }
        }
      }
    };


    const pageCount = Math.ceil(reportReviews.length / reviewsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

  
    const displayReviews = reportReviews
      .slice(pagesVisited, pagesVisited + reviewsPerPage)
      .map((review) => (
        <tr key={review.id}>
  <td style={{ width: '10%' }}>{review.id}</td>
  <td style={{ width: '10%' }}>{review.reviewId}</td>
  <td style={{ width: '20%' }}>{review.writerNickname}</td>
  <td style={{ width: '30%' }}>{review.reason}</td>
  <td style={{ width: '15%' }}>{review.createdAt}</td>
  <td style={{ width: '15%' }} onClick={() => updateReview(review.id,review.reviewId)}>삭제</td>
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
                  <li className="active">신고된 리뷰 목록</li>
                </ol>
              </div>
            </div>
          </div>

        </div>

        <div className="content">
        <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">리뷰 관리</strong>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: '8%' }}>신고 번호</th>
                            <th style={{ width: '8%' }}>리뷰 번호</th>
                            <th style={{ width: '15%' }}>작성자</th>
                            <th style={{ width: '39%' }}>신고 사유</th>
                            <th style={{ width: '15%' }}>작성일</th>
                            <th style={{ width: '15%' }}></th>
                          </tr>
                        </thead>
                        <tbody>{displayReviews}</tbody>
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


                    </div>
                  </div>
                </div>
              </div>
            </div>
   

          <AdminFooter />
        </div>
      </div>
    </>
  );
};

export default AdminReport;
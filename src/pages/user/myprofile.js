// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserComponent = () => {
//   const [userData, setUserData] = useState(null);
//   const [token, setToken] = useState(getCookie("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 토큰이 변경될 때마다 실행
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("/user/profile", {
//           headers: {
//             ssonToken: token,
//           },
//         });

//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [token]);

//   function getCookie(key) {
//     var result = null;
//     var cookie = document.cookie.split(";");
//     cookie.some(function (item) {
//       item = item.replace(" ", "");

//       var dic = item.split("=");

//       if (key === dic[0]) {
//         result = dic[1];
//         return true;
//       }
//     });

//     return result;
//   }

//   const handleLogout = async () => {
//     try {
//       // 로그아웃 요청
//       await axios.delete("/user/logout", {
//         headers: {
//           ssonToken: token,
//         },
//       });

//       // 쿠키 삭제
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//       // 홈 페이지로 리다이렉트
//       navigate("/user/sign-in");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const handleTeamRequest = async () => {
//     try {
//       if (userData && userData.data && userData.data.teamId) {
//         const response = await axios.get(`/teams/${userData.data.teamId}`, {
//           headers: {
//             ssonToken: token,
//           },
//         });

//         console.log("Team Data:", response.data);
//       } else {
//         console.error("User data or team ID not available");
//       }
//     } catch (error) {
//       console.error("Error fetching team data:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>User Data:</h2>
//       {userData ? (
//         <>
//           <pre>{JSON.stringify(userData.data, null, 2)}</pre>
//           <button onClick={handleLogout}>Logout</button>
//           <button onClick={handleTeamRequest}>Get Team Data</button>
//         </>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserComponent = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(getCookie("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/user/profile", {
          headers: {
            ssonToken: token,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(";");
    cookie.some(function (item) {
      item = item.replace(" ", "");

      var dic = item.split("=");

      if (key === dic[0]) {
        result = dic[1];
        return true;
      }
    });

    return result;
  }

  const handleLogout = async () => {
    try {
      // 로그아웃 요청
      const logoutResponse = await axios.post("/user/logout", null, {
        headers: {
          ssonToken: token,
        },
      });

      // 쿠키 삭제
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // 홈 페이지로 리다이렉트
      navigate("/user/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTeamRequest = async () => {
    try {
      if (userData && userData.data && userData.data.teamId) {
        const response = await axios.get(`/teams/${userData.data.teamId}`, {
          headers: {
            ssonToken: token,
          },
        });

        console.log("Team Data:", response.data);
      } else {
        console.error("User data or team ID not available");
      }
    } catch (error) {
      // 토큰이 만료되었을 때 서버에서 반환한 에러를 처리
      if (error.response && error.response.status === 401) {
        try {
          // 토큰이 만료되었으면 새로운 토큰을 요청
          const refreshResponse = await axios.post("/user/refresh-token", null, {
            headers: {
              ssonToken: token,
            },
          });

          // 새로 발급받은 토큰을 상태에 업데이트
          setToken(refreshResponse.data.data);

          // 로그아웃 요청 다시 보내기
          await handleLogout();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error fetching team data:", error);
      }
    }
  };

  return (
    <div>
      <h2>User Data:</h2>
      {userData ? (
        <>
          <pre>{JSON.stringify(userData.data, null, 2)}</pre>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleTeamRequest}>Get Team Data</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserComponent;

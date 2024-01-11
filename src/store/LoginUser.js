import { createSlice } from '@reduxjs/toolkit'

const loginUser = createSlice({
  name: 'loginUser',
  initialState: {
    id: 0,
    teamId: 0,
    teamName: "",
    nickname: "",
  },
  reducers: {
    logIn(loginUser, data) {
      loginUser.id = data.payload.id;
      loginUser.teamId = data.payload.teamId;
      loginUser.teamName = data.payload.teamName;
      loginUser.nickname = data.payload.nickname;
    },
    logOut(loginUser) {
      loginUser.id = 0;
      loginUser.teamId = 0;
      loginUser.teamName = "";
      loginUser.nickname = "";
    },
    deleteTeam(loginUser) {
      loginUser.teamId = 0;
      loginUser.teamName = "";
    },
    setTeamId(loginUser, data) {
      loginUser.teamId = data.payload.teamId;
      loginUser.teamName = data.payload.teamName;
    }
  }
});

export const { logIn, logOut, deleteTeam, setTeamId } = loginUser.actions;


export default loginUser;
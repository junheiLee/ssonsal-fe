import { createSlice } from '@reduxjs/toolkit'

const loginUser = createSlice({
  name: 'loginUser',
  initialState: {
    id: 0,
    teamId: 0
  },
  reducers: {
    logIn(loginUser, data) {
      loginUser.id = data.payload.id;
      loginUser.teamId = data.payload.teamId;
    },
    logOut(loginUser) {
      loginUser.id = 0;
      loginUser.teamId = 0;
    },
    deleteTeam(loginUser) {
      loginUser.teamId = 0;
    },
    setTeamId(loginUser, data) {
      loginUser.teamId = data.payload.teamId;
    }
  }
});

export const { logIn, logOut, deleteTeam, setTeamId } = loginUser.actions;


export default loginUser;
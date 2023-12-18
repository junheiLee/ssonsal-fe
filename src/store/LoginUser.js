import { createSlice } from '@reduxjs/toolkit'

const loginUser = createSlice({
  name: 'loginUser',
  initialState: {
    id: 0,
    teamId: 0
  },
  reducers: {
    login(loginUser, data) {
      loginUser.id = data.payload.id;
      loginUser.teamId = data.payload.teamId;
    },
    logOut(loginUser) {
      loginUser.id = 0;
      loginUser.teamId = 0;
    }
  }
});

export const { login, logOut } = loginUser.actions;


export default loginUser;
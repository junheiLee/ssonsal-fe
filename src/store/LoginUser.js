import { createSlice } from '@reduxjs/toolkit'

const loginUser = createSlice({
    name: 'loginUser',
    initialState: {
      id: 0,
      teamId: 0
    },
    reducers: {
      LoginUser(state,action) {
        state.id = action.payload.id;
        state.teamId = action.payload.teamId;
      },
      LogoutUser(state){
        state.id = 0;
        state.teamId = 0;
      }
    }
  });

  export const { LoginUser} = loginUser.actions;


  export default loginUser;
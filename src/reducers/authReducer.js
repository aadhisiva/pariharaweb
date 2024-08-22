// reducers/authReducer.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoggedIn: false,
  sessionEndTime: null,
  token: '',
  Mobile: '',
  Otp: '',
  RoleName: '',
  RoleAccess: {}
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      const { RoleAccess, Mobile, Otp, Token, RoleName} = action.payload;
      state.isLoggedIn = true;
      state.Mobile = Mobile;
      state.token = Token;
      state.Otp = Otp,
      state.RoleName = RoleName,
      state.RoleAccess = RoleAccess;
    },
    userLoggedOut(state) {
      state.isLoggedIn = false;
      state.Mobile = "";
      state.token = "";
      state.Otp = ""
    },
    setSessionEndTime (state, action) {
      state.sessionEndTime = action.payload;
    },
    clearSessionEndTime (state) {
      state.sessionEndTime = null;
    },
  },
});
// action: PayloadAction<never[]>
export const { userLoggedIn, userLoggedOut, setSessionEndTime, clearSessionEndTime } = authSlice.actions;
export default authSlice.reducer;

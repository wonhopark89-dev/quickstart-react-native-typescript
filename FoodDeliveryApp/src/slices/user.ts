import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 전역상태
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  // refreshToken: '',
  money: 0,
};
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
  }, // 동기 액션 주
  extraReducers: (builder) => {}, // 비동기 액션 주
});

export default user;

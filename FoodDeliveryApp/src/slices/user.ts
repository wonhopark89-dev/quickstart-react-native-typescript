import { createSlice } from '@reduxjs/toolkit';

// 전역상태
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
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
  }, // 동기 액션 주
  extraReducers: (builder) => {}, // 비동기 액션 주
});

export default user;

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
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {},
});

export default user;

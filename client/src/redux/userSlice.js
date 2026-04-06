import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, logout } = userSlice.actions;
export default userSlice.reducer;

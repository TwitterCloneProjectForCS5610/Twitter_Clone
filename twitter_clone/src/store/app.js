import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    list: [],
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    setList(state, { payload }) {
      state.list = payload;
    },
    addToList(state, { payload }) {
      state.list.unshift(payload);
    },
    updateListItem(state, { payload: { id, update } }) {
      const idx = state.list.findIndex((v) => v._id === id);
      state.list[idx] = {
        ...state.list[idx],
        ...update,
      };
    },
    removeFromList(state, { payload }) {
      const idx = state.list.findIndex((v) => v._id === payload);
      state.list.splice(idx, 1);
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;

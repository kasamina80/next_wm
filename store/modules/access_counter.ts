import { createSlice } from '@reduxjs/toolkit';

const accessCounterSlice = createSlice({
  name: 'accessCounter',
  initialState: {
    count: 0
  },
  reducers: {
    setCount(state, action) {
      state.count = action.payload
    }
  }
});

export const { setCount } = accessCounterSlice.actions;
export default accessCounterSlice.reducer;

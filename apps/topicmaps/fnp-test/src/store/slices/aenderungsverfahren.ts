import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: undefined,
};

const slice = createSlice({
  name: 'aev',
  initialState,
  reducers: {},
});

export default slice;

export const {} = slice.actions;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLorem = createAsyncThunk(
  'lorem/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.get('http://localhost/masterimg.php');
      console.log(data, 'data');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loremSlice = createSlice({
  name: 'lorem',
  initialState: {
    data: [],
    isSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLorem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLorem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
      .addCase(getLorem.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export default loremSlice.reducer;

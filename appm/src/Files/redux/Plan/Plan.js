import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getplan = createAsyncThunk(
  'plan/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.post('http://localhost/Pack_detail.php');
    
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PlanSlice = createSlice({
  name: 'plan',
  initialState: {
    data: [],
    isSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getplan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getplan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
      .addCase(getplan.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export default PlanSlice.reducer;

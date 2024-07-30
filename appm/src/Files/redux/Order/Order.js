import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk(
  'plan/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.post('http://localhost/Ordershow.php');
    
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const OrderSlice = createSlice({
  name: 'Order',
  initialState: {
    data: [],
    isSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export default OrderSlice.reducer;

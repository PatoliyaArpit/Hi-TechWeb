import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getpackdetail = createAsyncThunk(
  'plandetail/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.post('http://localhost/Pack_detail.php');
    
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getplan = createAsyncThunk(
  'plan/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.post('http://localhost/pack.php');
    
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PlanSlice = createSlice({
  name: 'plan',
  initialState: {
    packdetails: null,
    pack:null,
    isSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpackdetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getpackdetail.fulfilled, (state, action) => {
        state.loading = false;
        state.packdetails = action.payload;
        state.isSuccess = true;
      })
      .addCase(getpackdetail.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })

      .addCase(getplan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getplan.fulfilled, (state, action) => {
        state.loading = false;
        state.pack = action.payload;
        state.isSuccess = true;
      })
      .addCase(getplan.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })
  },
});

export default PlanSlice.reducer;

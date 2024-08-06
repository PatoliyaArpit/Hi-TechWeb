import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEnergizer = createAsyncThunk(
  'Energizer/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.post('http://localhost/masterimg.php');
    
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAccessories = createAsyncThunk(
    'Accessories/getdata',
    async (arg, { rejectWithValue }) => {
      try {
        const {data}  = await axios.post('http://localhost/Accessories.php');
      
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const getSlider = createAsyncThunk(
    'Slider/getdata',
    async (arg, { rejectWithValue }) => {
      try {
        const {data}  = await axios.post('http://localhost/Slider.php');
      
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const HomeDataSlice = createSlice({
  name: 'HomeData',
  initialState: {
    Energizer:null,
    Accessories:null,
    Slider:null,
    isSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnergizer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnergizer.fulfilled, (state, action) => {
        state.loading = false;
        state.Energizer = action.payload;
        state.isSuccess = true;
      })
      .addCase(getEnergizer.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })

      .addCase(getAccessories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.Accessories = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAccessories.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })

      .addCase(getSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.Slider = action.payload;
        state.isSuccess = true;
      })
      .addCase(getSlider.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export default HomeDataSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getcart = createAsyncThunk(
  'Cart/getdata',
  async (arg, { rejectWithValue }) => {
    try {
      const {data}  = await axios.post('http://localhost/cartshow.php');
    
      return data;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Increase=createAsyncThunk('Increase/postdata',
  async(Counter,{rejectWithValue})=>{
      try{
          const {data}=await axios.post("http://localhost/Increcart.php",Counter,{
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          return data.data
      }catch(error){
          return rejectWithValue(error.response.data)
      }

  }
)
export const Decrease=createAsyncThunk('Decrease/postdata',
  async(Counter,{rejectWithValue})=>{
      try{
          const {data}=await axios.post("http://localhost/Decrecart.php",Counter,{
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          return data.data
      }catch(error){
          return rejectWithValue(error.response.data)
      }

  }
)
export const Deletecart=createAsyncThunk('Deletecart/postdata',
  async(Id,{rejectWithValue})=>{
      try{
          const {data}=await axios.post("http://localhost/deletecart.php",Id,{
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          return data.data
      }catch(error){
          return rejectWithValue(error.response.data)
      }

  }
)

const CartdataSlice = createSlice({
  name: 'Cartdata',
  initialState: {
    Cart: null,
    isSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getcart.fulfilled, (state, action) => {
        state.loading = false;
        state.Cart = action.payload;
        state.isSuccess = true;
      })
      .addCase(getcart.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export default CartdataSlice.reducer;

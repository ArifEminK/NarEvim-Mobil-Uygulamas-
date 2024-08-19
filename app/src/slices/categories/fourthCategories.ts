import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface FourthCategory {
  id: string;
  first_group_id: string;
  second_group_id: string;
  third_group_id:string;
  url: string;
  title: string;
  description: string | null;
  rank: string;
  isActive: string;
  createdAt: string | null;
  img_url: string;
}

interface FourthCategoryState {
  data: FourthCategory[];
  message: string;
  status: string;
  image_path: string;
}

const initialState: FourthCategoryState = {
  data: [],
  image_path: '',
  status: '',
  message: '',
};

export const fetchFourthCategories = createAsyncThunk(
  'category/fetchFourth',
  async (third_group_id: string) => {
    const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/fourthCategories', {
      method: "POST",
      headers: {
        'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `third_group_id=${third_group_id}`,
    });
    if (!response.ok) {
      throw new Error("network response was not ok");
    }

    const data = await response.json();
    return data;
  }
);

const fourthCategoriesSlice = createSlice({
  name: 'fourthCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFourthCategories.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.image_path = action.payload.image_path;
        state.message = action.payload.message;
      })
      .addCase(fetchFourthCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message || 'Something went wrong';
      });
  },
});

export default fourthCategoriesSlice.reducer;

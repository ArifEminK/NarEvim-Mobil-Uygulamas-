import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SecondCategory {
    id: string,
    first_group_id: string,
    url: string,
    title: string,
    img_url: string,
    rank: string,
    isActive: string,
    isNext: string
}

interface SecondCategoriesState {
    data: SecondCategory[],
    message: string, 
    status: string,
    image_path: string
}

const initialState: SecondCategoriesState = {
    data: [],  
    message: "",
    status: "",
    image_path: ""
}

export const fetchSecondCategories = createAsyncThunk(
    "category/fetchSecond",
    async (firstCategoryId: string) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/secondCategories/", {
            method: "POST", 
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                'Cookie': `ci_session=3d06d9e7a7fb4a93e1640fe2079a3508d805b219`, 
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `first_category_id=${firstCategoryId}`,
        });

        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data = await response.json();
        return data;
    }
)

const secondCategorySlice = createSlice({
    name: "secondCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchSecondCategories.fulfilled, (state, action: PayloadAction<SecondCategoriesState>) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.image_path = action.payload.image_path;
      });
      builder.addCase(fetchSecondCategories.rejected, (state, action) => {
        state.message = action.error.message || "An error occurred";
      });
    }
  });
  

export default secondCategorySlice.reducer;
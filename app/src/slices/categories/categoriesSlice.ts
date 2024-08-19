import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Category {
    id: string;
    url: string;
    title: string;
    description: string;
    facebook_pixel: string;
    free_pay_limit: string,
    icon: string,
    img_url: string,
    banner_url: string,
    home_banner_url: string,
    rank: string,
    isActive: string,
    createdAt: string,
  }
interface FirstCategoriesState{
    data:Category[];
    message:string;
    status:string;
    image_path:string;
}
const initialState:FirstCategoriesState={
    data:[],
    message:"",
    status:"",
    image_path:"",
}

export const fetchCategories = createAsyncThunk(
    "category/fetchFirst",
    async(_, {getState}) => {
        const state: any=getState();
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/firstCategories", {
            method:"GET", 
            headers:{
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                'Cookie': `ci_session=3d06d9e7a7fb4a93e1640fe2079a3508d805b219`, 
            },
        });
        if(!response.ok){
            throw new Error("Networdk response was not ok");
        }

        const data: FirstCategoriesState = await response.json();
        return data;
    }
)

const firstCategorySlice = createSlice({
    name:"firstCategory",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchCategories.fulfilled, (state,action: PayloadAction<FirstCategoriesState>) =>{
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.image_path = action.payload.image_path;
        });
        builder.addCase(fetchCategories.rejected, (state, action) =>{
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default firstCategorySlice.reducer;
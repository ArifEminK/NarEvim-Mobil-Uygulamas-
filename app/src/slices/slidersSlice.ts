import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Slider {
    id: string,
    title: string,
    description: string,
    title_color: string,
    description_color : string,
    title_font: string,
    description_font: string,
    title_size: string,
    description_size: string,
    img_url : string,
    allowButton : string,
    button_url: string,
    button_caption: string,
    block_side: string,
    animation_time: string,
    rank: string,
    isActive: string,
    createdAt: string,
}

interface SlidersState{
    data:Slider[];
    message:string;
    status:string;
    image_path:string;
}

const initialState:SlidersState={
    data:[],
    message:"",
    status:"",
    image_path:"",
}

export const fetchSliders = createAsyncThunk(
    "sliders/sliders",
    async(_, {getState}) => {
        const state:any=getState();
        const response=await fetch("https://demo.pigasoft.com/eticaret/apiv1/sliders", {
            method:"GET",
            headers:{
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                "Cookie": "ci_session=44201874509aa8ceef3ad8b19795f9a370331ada"
            },
        });
        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data:SlidersState=await response.json();
        return data;
    }
)

const sliderSlice = createSlice({
    name:"slider",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchSliders.fulfilled, (state,action: PayloadAction<SlidersState>) =>{
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.image_path = action.payload.image_path;
        });
        builder.addCase(fetchSliders.rejected, (state, action) =>{
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default sliderSlice.reducer;
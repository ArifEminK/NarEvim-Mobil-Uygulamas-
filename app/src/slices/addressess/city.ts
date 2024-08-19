import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface City {
    id: string,
    title: string,
}

interface CityState{
    data:City[];
    message:string;
    status:string;
    error_code:string;
}

const initialState:CityState={
    data:[],
    message:"",
    status:"",
    error_code:"",
}

export const fetchCities = createAsyncThunk(
    "addresses/cities",
    async(_, {getState}) => {
        const state:any=getState();
        const response=await fetch("https://demo.pigasoft.com/eticaret/apiv1/city", {
            method:"GET",
            headers:{
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        });
        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data:CityState=await response.json();
        return data;
    }
)

const citiesSlice = createSlice({
    name:"cities",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchCities.fulfilled, (state,action: PayloadAction<CityState>) =>{
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error_code = action.payload.error_code;
        });
        builder.addCase(fetchCities.rejected, (state, action) =>{
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
            
        });
    },
});

export default citiesSlice.reducer;
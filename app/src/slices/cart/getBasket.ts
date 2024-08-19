import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
    rowid: string,
    id: string,
    qty: number,
    price: string,
    discount_price: string,
    isDiscount: string,
    name: string,
    title: string,
    img_url: string,
    subTotal: string,
    brand: string,
}

interface GetBasketState {
    data: Product[];
    message: string;
    status: string;
    total: string;
}

const initialState: GetBasketState = {
    data: [],
    message: "",
    status: "",
    total: "",
}

export const fetchGetBasket = createAsyncThunk(
    "cart/getBasket",
    async(_, {getState}) => {
        const state:any=getState();
        const response=await fetch("https://demo.pigasoft.com/eticaret/apiv1/getBasket", {
            method:"GET",
            headers:{
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                "Cookie": "ci_session=44201874509aa8ceef3ad8b19795f9a370331ada"
            },
        });
        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data:GetBasketState=await response.json();
        return data;
    }
)

const getBasketSlice = createSlice({
    name:"getBasket",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchGetBasket.fulfilled, (state,action: PayloadAction<GetBasketState>) =>{
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.total = action.payload.total;
        });
        builder.addCase(fetchGetBasket.rejected, (state, action) =>{
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default getBasketSlice.reducer;

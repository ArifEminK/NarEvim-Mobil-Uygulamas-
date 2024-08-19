import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderDetail {
    id: string,
    order_id: string,
    product_id: string,
    title: string,
    size: string,
    color: string,
    qty: string,
    subtotal: string,
    total: string,
    isActive: string,
    isDeleted: string,
    createdAt: string,
    birim: string,
    kdv: string,
    img_url: string,
}

interface OrderData {
    order_id: string,
    order_number: string,
    total_amount: number,
    order_date: string,
    member_address: string,
    order_state: string,
    order_detail:OrderDetail[],
}

interface OrderState {
    status:string;
    message:string;
    image_path:string;
    data:OrderData[];
} 

const initialState:OrderState={
    status:"",
    message:"",
    image_path:"",
    data:[],
}

export const fetchOrders = createAsyncThunk(
    "orders/orders",
    async (_, {getState}) => {
        const state: any = getState();
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/orders", {
            method:"GET",
            headers:{
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
        },
        })

        if(!response.ok) {
            throw new Error("networdk response was not ok");
        }
        const data: OrderState = await response.json();
        return data;
    }
)

const ordersSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchOrders.fulfilled, (state, action:PayloadAction<OrderState>)=>{
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.data = action.payload.data;
            state.image_path=action.payload.image_path;
            console.log(state.message)
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
            console.log(Error, "başarısız")
      });
    }
})

export default ordersSlice.reducer;
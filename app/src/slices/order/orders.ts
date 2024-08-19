import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderDetail {
    id: string;
    order_id: string;
    product_id: string;
    title: string;
    size: string;
    color: string;
    qty: string;
    subtotal: string;
    total: string;
    isActive: string;
    isDeleted: string;
    createdAt: string;
    birim: string;
    kdv: string;
    img_url: string;
}

interface OrderProduct {
    order_id: string;
    order_number: string;
    total_amount: number;
    order_date: string;
    member_address: string;
    order_state: string;
    order_detail: [
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
    ];
}

interface OrderState {
    status: string;
    message: string;
    data: OrderProduct[];
    image_path: string;
}

const initialState: OrderState = {
    status: "",
    message: "deneme",
    data: [],
    image_path: "",
};

export const fetchOrders = createAsyncThunk(
    "address/addressList",
    async (_, { getState }) => {
        const state: any = getState();
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/orders", {
            method: "GET",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        });
        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data: OrderState = await response.json();
        return data;
    }
)

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.image_path = action.payload.image_path;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default ordersSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    message: string;
    error_code: number;
    status: string;
    order_number:string;
}

const initialState: OrderState = {
    message: '',
    error_code: 1,
    status: '',
    order_number:""
};

export const fetchCreateOrder = createAsyncThunk(
    'cart/addBasket',
    async ({ payment_type, cargo_id, order_note }: { payment_type: string; cargo_id: string, order_note:string }) => {
        const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/createOrder', {
            method: 'POST',
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                payment_type: payment_type,
                cargo_id: cargo_id,
                order_note: order_note,
            }).toString(),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: OrderState = await response.json();
        return data;
    }
);

const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCreateOrder.fulfilled, (state, action: PayloadAction<OrderState>) => {
            state.message = action.payload.message;
            state.error_code = action.payload.error_code;
            state.order_number = action.payload.order_number;
            state.status = action.payload.status;
        });
    },
});

export default createOrderSlice.reducer;
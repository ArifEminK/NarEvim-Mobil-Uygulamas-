import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface BasketState {
    message: string;
    sessionid: string;
    status: string;
}

const initialState: BasketState = {
    message: '',
    sessionid: '',
    status: '',
};

export const fetchAddBasket = createAsyncThunk(
    'cart/addBasket',
    async ({ product_id, qty }: { product_id: string; qty: string }) => {
        const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/addBasket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                product_id: product_id,
                qty: qty,
            }).toString(),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: BasketState = await response.json();
        return data;
    }
);

const addBasketSlice = createSlice({
    name: 'addBasket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddBasket.fulfilled, (state, action: PayloadAction<BasketState>) => {
            state.message = action.payload.message;
            state.sessionid = action.payload.sessionid;
            state.status = action.payload.status;
        });
    },
});

export default addBasketSlice.reducer;
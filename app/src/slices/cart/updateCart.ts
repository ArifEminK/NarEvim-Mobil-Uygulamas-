import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UpdateCartState {
    message: string;
    status: string;
}

const initialState: UpdateCartState = {
    message: '',
    status: '',
};

export const fetchUpdateCart = createAsyncThunk(
    'cart/updateCart',
    async ({ rowID, qty }: { rowID: string, qty: string }) => {
        const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/updateCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                rowID: rowID,
                qty: qty
            }).toString(),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: UpdateCartState = await response.json();
        return data;
    }
);

const updateCartSlice = createSlice({
    name: 'updateCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUpdateCart.fulfilled, (state, action: PayloadAction<UpdateCartState>) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
        });
    },
});

export default updateCartSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface RemoveFromCartState {
    message: string;
    status: string;
}

const initialState: RemoveFromCartState = {
    message: '',
    status: '',
};

export const fetchRemoveFromCart = createAsyncThunk(
    'cart/removeCart',
    async ({ rowID }: { rowID: string }) => {
        const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                rowID: rowID,
            }).toString(),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: RemoveFromCartState = await response.json();
        return data;
    }
);

const removeFromCartSlice = createSlice({
    name: 'removeCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRemoveFromCart.fulfilled, (state, action: PayloadAction<RemoveFromCartState>) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
        });
    },
});

export default removeFromCartSlice.reducer;
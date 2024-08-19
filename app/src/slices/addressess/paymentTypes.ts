import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Payment {
    id: string,
    payment_id:string
}

interface PaymentTypesState {
    data: Payment[];
    message: string;
    error_code: string;
    status: string;
}

const initialState: PaymentTypesState = {
    data: [],
    message: "",
    error_code: "",
    status: "",
}

export const fetchPaymentTypes = createAsyncThunk(
    "payment/paymentTypes",
    async (_, { getState }) => {
        const state: any = getState();
        try {
            const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/paymentTypes", {
                method: "GET",
                headers: {
                    'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                },
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const data: PaymentTypesState = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch brands: ", error);
            throw error;
        }
    }
);

const paymentTypesSlice = createSlice({
    name: "paymentTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPaymentTypes.fulfilled, (state, action: PayloadAction<PaymentTypesState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error_code = action.payload.error_code;
        });
        builder.addCase(fetchPaymentTypes.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    }
})

export default paymentTypesSlice.reducer;
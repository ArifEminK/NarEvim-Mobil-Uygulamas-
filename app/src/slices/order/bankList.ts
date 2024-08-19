import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bank {
    id: string,
    title: string,
    description: string,
    img_url: string,
    rank: string,
    isActive: string,
    createdAt: string,
}

interface BankListState {
    status: string;
    message: string;
    data: Bank[];
    error_code: string;
}

const initialState: BankListState = {
    status: "",
    message: "",
    data: [],
    error_code: "",
};

export const fetchBankList = createAsyncThunk(
    "order/bankList",
    async (_, { getState }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/bankList", {
            method: "GET",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: BankListState = await response.json();
        return data;
    }
);

const bankListSlice = createSlice({
    name: "bankList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBankList.fulfilled, (state, action: PayloadAction<BankListState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error_code = action.payload.error_code;
        });
        builder.addCase(fetchBankList.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default bankListSlice.reducer;

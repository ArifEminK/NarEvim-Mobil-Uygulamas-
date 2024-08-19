import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Address {
    id: string,
    name: string,
    surname: string,
    email: string,
    telephone: string,
    clear_address: string,
    city_id: string,
    town_id: string,
    city: string,
    town: string,
}

interface AddressListState {
    data: Address[];
    message: string;
    status: string;
    image_path: string;
}

const initialState: AddressListState = {
    data: [],
    message: "",
    status: "",
    image_path: ""
}

export const fetchAddressList = createAsyncThunk(
    "address/addressList",
    async (_, { getState }) => {
        const state: any = getState();
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/address", {
            method: "GET",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        });
        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data: AddressListState = await response.json();
        return data;
    }
)

const addressListSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddressList.fulfilled, (state, action: PayloadAction<AddressListState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.image_path = action.payload.image_path;
        });
        builder.addCase(fetchAddressList.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default addressListSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RemoveAddressState {
    message: string,
    status: string,
    error_code: number
}

const initialState: RemoveAddressState = {
    message: "",
    status: "",
    error_code: 0
}

export const fetchRemoveAddress = createAsyncThunk(
    "address/removeAddress",
    async (address_id: string) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/removeAddress", {
            method: "POST",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',

            },
            body: `address_id=${address_id}`,
        });

        if (!response.ok) {
            throw new Error("network response was not ok");
        }

        const data = await response.json();
        return data;
    }
)

const removeAddressSlice = createSlice({
    name: "removeAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRemoveAddress.fulfilled, (state, action: PayloadAction<RemoveAddressState>) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error_code = action.payload.error_code;
        });
        builder.addCase(fetchRemoveAddress.rejected, (state, action) => {
            state.message = action.error.message || "An error occurred";
        });
    }
});

export default removeAddressSlice.reducer;
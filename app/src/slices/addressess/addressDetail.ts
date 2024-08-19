import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressDetailState {
    status: string,
    data:
    {
        id: string,
        name: string,
        surname: string,
        email: string,
        telephone: string,
        clear_address: string,
        city_id: string,
        town_id: string,
        billing_identitiy: string,
        billing_name: string,
        billing_surname: string,
        billing_email: string,
        billing_city: string,
        billing_town: string,
        city: string,
        town: string,
    }|null,

    error_code: string,
    message: string,
}

const initialState: AddressDetailState = {
    status: "",
    data:
    {
        id: "",
        name: "",
        surname: "",
        email: "",
        telephone: "",
        clear_address: "",
        city_id: "",
        town_id: "",
        billing_identitiy: "",
        billing_name: "",
        billing_surname: "",
        billing_email: "",
        billing_city: "",
        billing_town: "",
        city: "",
        town: "",
    },
    error_code: "",
    message: "",
}

export const fetchAddressDetail = createAsyncThunk(
    "address/addressDetail",
    async ({ address_id }: { address_id: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/address", {
            method: "POST",
            headers: {
                "X-API-KEY": "SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                address_id: address_id,
            }).toString()
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text();
            throw new Error(`Expected JSON, got ${contentType}: ${errorText}`);
        }

        const data: AddressDetailState = await response.json();
        return data;
    }
);
const addressDetailSlice = createSlice({
    name: "addressDetail",
    initialState,
    reducers: {
        resetProductDetail: (state) => {
            state.data = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddressDetail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAddressDetail.fulfilled, (state, action: PayloadAction<AddressDetailState>) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.message = action.payload.message;
                state.error_code = action.payload.error_code;
            })
            .addCase(fetchAddressDetail.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message || "Fetch failed";
            });
    }
});


export const { resetProductDetail } = addressDetailSlice.actions;

export default addressDetailSlice.reducer;
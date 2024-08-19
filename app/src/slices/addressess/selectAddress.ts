import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
interface Adress {
    delivery_address_type: string,
    tax_address: string,
    tax_number: string,
    identitiy: string,
    name: string,
    surname: string,
    email: string,
    telephone: string,
    city: string,
    town: string,
    clear_address: string,
    billing_address_type: string,
    billing_tax_address: string,
    billing_tax_number: string,
    billing_identitiy: string,
    billing_name: string,
    billing_surname: string,
    billing_email: string,
    billing_telephone: string,
    billing_city: string,
    billing_town: string,
    billing_clear_address: string,
}

interface SelectAddressState {
    data: Adress[],
    message: string,
    status: string,
    error_code: number
}

const initialState: SelectAddressState = {
    data: [],
    message: "",
    status: "",
    error_code: 0
}


export const fetchSelectAddress = createAsyncThunk(
    "address/selectAddress",
    async (address_id: string) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/saveMemberDelivery", {
            method: "POST", 
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `address_id'=${address_id}`,
        });
        if (!response.ok) {
            throw new Error("network response was not ok");
        }
        const data = await response.json();
        return data;
    }
)

const selectAddressSlice = createSlice({
    name: "secondCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchSelectAddress.fulfilled, (state, action: PayloadAction<SelectAddressState>) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.error_code = action.payload.error_code;
      });
      builder.addCase(fetchSelectAddress.rejected, (state, action) => {
        state.message = action.error.message || "An error occurred";
      });
    }
  });

  export default selectAddressSlice.reducer;
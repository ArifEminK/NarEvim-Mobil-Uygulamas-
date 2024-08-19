import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
    status: string,
    error_code: number,
    message: string,
    data: {
        id: string,
        member_id: string,
        identitiy: string,
        name: string,
        surname: string,
        email: string,
        build: string,
        street: string,
        city: string,
        town: string,
        telephone: string,
        clear_address: string,
        delivery_address_type: string,
        delivery_tax_address: string,
        delivery_tax_number: string,
        billing_tax_address: string,
        billing_tax_number: string,
        billing_address_type: string,
        billing_identitiy: string,
        billing_name: string,
        billing_surname: string,
        billing_email: string,
        billing_build: string,
        billing_street: string,
        billing_city: string,
        billing_town: string,
        billing_telephone: string,
        billing_clear_address: string,
        isActive: string,
        isDeleted: string,
        createdAt: string,
    } | null
}

const initialState: AddressState = {
    status: "",
    error_code: 0,
    message: "",
    data: null,
}

export const fetchCreateAddress = createAsyncThunk(
    "address/saveAddress",
    async ({ name, surname, email, telephone, city, town, clear_address, billing_name, billing_surname, billing_email, billing_telephone, billing_city, billing_town, billing_clear_address }:
        {
            name: string,
            surname: string,
            email: string,
            telephone: string,
            city: string,
            town: string,
            clear_address: string,
            billing_name: string,
            billing_surname: string,
            billing_email: string,
            billing_telephone: string,
            billing_city: string,
            billing_town: string,
            billing_clear_address: string
        }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/save_address", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                name: name,
                surname: surname,
                email: email,
                telephone: telephone,
                city: city,
                town: town,
                clear_address: clear_address,
                billing_name: billing_name,
                billing_surname: billing_surname,
                billing_email: billing_email,
                billing_telephone: billing_telephone,
                billing_city: billing_city,
                billing_town: billing_town,
                billing_clear_address: billing_clear_address,

            }).toString(),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: AddressState = await response.json();
        console.log(data)
        return data;

    }
);

const createAddressSlice = createSlice({
    name: "createAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCreateAddress.fulfilled, (state, action: PayloadAction<AddressState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error_code = action.payload.error_code;
        });
    },
});

export default createAddressSlice.reducer;
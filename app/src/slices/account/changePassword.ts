import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ChangePasswordState {
    status: string,
    message: string,
    error_code: string,
}

const initialState: ChangePasswordState = {
    status: "",
    message: "",
    error_code: "",
}

export const fetchChangPass = createAsyncThunk(
    "searchProduct/search",
    async ({ old_password, new_password }: { old_password: string, new_password: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/changePassword", {
            method: "POST",
            headers: {
                "X-API-KEY": "SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                old_password: old_password,
                new_password: new_password,

            }).toString()
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ChangePasswordState = await response.json();
        return data;
    }
);

const changePasswordSlice = createSlice({
    name: "changePassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangPass.fulfilled, (state, action: PayloadAction<ChangePasswordState>) => {
                state.status = "succeeded";
                state.message = action.payload.message;
            })
            .addCase(fetchChangPass.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message || "Fetch failed";
            });
    }
})


export default changePasswordSlice.reducer;

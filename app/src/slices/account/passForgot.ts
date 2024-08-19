import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PassForgotState {
    status: string,
    message: string,
    email: string,
    error_code: number
}

const initialState: PassForgotState = {
    status: "",
    message: "",
    email: "",
    error_code: 0
}

export const fetchForgotPass = createAsyncThunk(
    "lostPassword/fetchLostPassword",
    async ({ email }: { email: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/lostPassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',            },
            body: new URLSearchParams({
                email: email
            }).toString(),

        });
        if (!response.ok) {
            throw new Error("newtork response was not ok");
        }
        const data: PassForgotState = await response.json();
        return data;
    }
);

const forgotSlice = createSlice({
    name:"forgot",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchForgotPass.fulfilled, (state,action:PayloadAction<PassForgotState>)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error_code = action.payload.error_code;
        });
    },
});

export default forgotSlice.reducer;
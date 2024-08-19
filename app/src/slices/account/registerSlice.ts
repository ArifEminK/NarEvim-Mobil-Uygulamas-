import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
    data:{
        email:string;
        password:string;
        telephone:string;
        name:string;
    } | null
    message:string;
    status:string
}

const initialState:RegisterState={
    data: null,
    message:"",
    status:"",
}

export const fetchRegister = createAsyncThunk(
    "login/fetchregister",
    async({email, password, telephone, name}: {email:string, password:string, telephone:string, name:string})=>{
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/register", {
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body:new URLSearchParams({
                email:email,
                password:password,
                telephone:telephone,
                name:name,
            }).toString(),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: RegisterState= await response.json();
        return data;

    }
);

const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchRegister.fulfilled, (state, action: PayloadAction<RegisterState>) =>{
            state.data = action.payload.data;
            state.message=action.payload.message;
            state.status= action.payload.status;
        });
    },
});

export default registerSlice.reducer;
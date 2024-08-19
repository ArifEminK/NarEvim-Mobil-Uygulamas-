import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Info {
    id: string,
    member_code: string,
    member_type: string,
    identitiy: string,
    name: string,
    second_name: string,
    surname: string,
    telephone: string,
    email: string,
    password: string,
    tax_address: string,
    tax_number: string,
    special_cargo: string,
    token: string,
    isNews: string,
    isActive: string,
    isStandartCargo: string,
    isSpecialCargo: string,
    createdAt: string,
}

interface MemberInfoState {
    message: string,
    status: string,
    data: Info[]
}

const initialState: MemberInfoState = {
    message: "",
    status: "",
    data: []
}

export const fetchMemberInfo = createAsyncThunk(
    "log/info",
    async (_, { getState }) => {
        const state: any = getState();
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/memberInfo", {
            method: "GET",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        })

        if (!response.ok) {
            throw new Error("networdk response was not ok");
        }
        const data: MemberInfoState = await response.json();
        return data;
    }
)

const memberInfoSlice = createSlice({
    name: "memberInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMemberInfo.fulfilled, (state, action: PayloadAction<MemberInfoState>) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.data = action.payload.data;
            console.log(state.message)
        });
        builder.addCase(fetchMemberInfo.rejected, (state, action) => {
            state.message = action.error.message || 'Logout failed';
            state.status = 'error';
            console.log(Error, "başarısız")
        });
    }
})
export default memberInfoSlice.reducer;
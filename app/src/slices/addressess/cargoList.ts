import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Cargo {
    id: string,
    url: string,
    title: string,
    description: string,
    img_url: string,
    increase_desi: string,
    rank: string,
    isActive: string,
    createdAt: string,
}

interface CargoListState {
    data: Cargo[];
    message: string;
    error_code: string;
    status: string;
}

const initialState: CargoListState = {
    data: [],
    message: "",
    error_code: "",
    status: "",
}

export const fetchCargoList = createAsyncThunk(
    "payment/cargoList",
    async (_, { getState }) => {
        const state: any = getState();
        try {
            const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/cargo", {
                method: "GET",
                headers: {
                    'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                },
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const data: CargoListState = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch brands: ", error);
            throw error;
        }
    }
);

const cargoListSlice = createSlice({
    name: "cargoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCargoList.fulfilled, (state, action: PayloadAction<CargoListState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error_code = action.payload.error_code;
        });
        builder.addCase(fetchCargoList.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    }
})

export default cargoListSlice.reducer;
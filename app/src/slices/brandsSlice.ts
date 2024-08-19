import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Brand {
    id: string,
    title: string,
    img_url: string,
    rank: string,
    isActive: string,
    createdAt: string,
}

interface BrandState {
    data: Brand[];
    message: string;
    error_code: string;
    image_path: string;
    status: string;
}

const initialState: BrandState = {
    data: [],
    message: "",
    error_code: "",
    image_path: "",
    status: "",
}

export const fetchBrands = createAsyncThunk(
    "brands/brands",
    async (_, { getState }) => {
        const state: any = getState();
        try {
            const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/brands", {
                method: "GET",
                headers: {
                    'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                },
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const data: BrandState = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch brands: ", error);
            throw error;
        }
    }
);
const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.image_path = action.payload.image_path;
            state.error_code = action.payload.error_code;
        });
        builder.addCase(fetchBrands.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    }
})

export default brandSlice.reducer;
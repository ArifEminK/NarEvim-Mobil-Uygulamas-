import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FavoritteProd {
    value: string,
    id: string,
    url: string,
    code_url: string,
    isHome: string,
    isActive: string,
    price: string,
    discount_price: string,
    title: string,
    desi: string,
    isDiscount: string,
    img_url: string,
    isCover: string,
    product_id: string,
    member_id: string,
    brand_title: string,
    point: number,
    review: string,
    discountRatio: number,
}

interface FavoriteListState {
    status: string,
    message: string,
    data: FavoritteProd[],
    image_path: string,
}

const initialState: FavoriteListState = {
    data: [],
    message: "",
    status: "",
    image_path: "",
}

export const fetchFavoriteList = createAsyncThunk(
    "favoritte/favoritteList",
    async (_, { getState }) => {
        const state: any = getState();
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/favoritte", {
            method: "GET",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        });
        if (!response.ok) {
            throw new Error("Networdk response was not ok");
        }

        const data: FavoriteListState = await response.json();
        return data;
    }
)

const favoritteListSlice = createSlice({
    name: "favoritteList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFavoriteList.fulfilled, (state, action: PayloadAction<FavoriteListState>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.image_path = action.payload.image_path;
        });
        builder.addCase(fetchFavoriteList.rejected, (state, action) => {
            state.message = action.error.message || 'Fetch failed';
            state.status = 'error';
        });
    },
});

export default favoritteListSlice.reducer;
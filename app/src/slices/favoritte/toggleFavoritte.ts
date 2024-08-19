


import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleFavoritteState {
    status: string,
    message: string,
    operation_status: number,
}

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
    error_code: string,
    image_path: string,
}

const initialToggleState: ToggleFavoritteState = {
    status: "",
    message: "",
    operation_status: 0,
};

const initialFavoriteListState: FavoriteListState = {
    status: "",
    message: "",
    data: [],
    error_code: "",
    image_path: "",
};

export const fetchFavoritte = createAsyncThunk(
    "favoritte/toggleFavoritte",
    async ({ product_id }: { product_id: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/toggleFavoritte", {
            method: "POST",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                product_id: product_id,
            }).toString(),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: ToggleFavoritteState = await response.json();
        return data;
    }
);

export const fetchFavoriteList = createAsyncThunk(
    "favoritte/fetchFavoriteList",
    async () => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/favoritte", {
            method: "GET",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    }
);

const favoritteSlice = createSlice({
    name: "favoritte",
    initialState: {
        toggle: initialToggleState,
        list: initialFavoriteListState,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritte.fulfilled, (state, action: PayloadAction<ToggleFavoritteState>) => {
                state.toggle.message = action.payload.message;
                state.toggle.status = action.payload.status;
                state.toggle.operation_status = action.payload.operation_status;
            })
            .addCase(fetchFavoriteList.fulfilled, (state, action: PayloadAction<FavoriteListState>) => {
                state.list.message = action.payload.message;
                state.list.data = action.payload.data;
                state.list.status = action.payload.status;
                state.list.error_code = "";
                state.list.image_path = action.payload.image_path;
            })
            .addCase(fetchFavoriteList.rejected, (state, action) => {
                state.list.status = "failed";
            });
    },
});

export default favoritteSlice.reducer;
